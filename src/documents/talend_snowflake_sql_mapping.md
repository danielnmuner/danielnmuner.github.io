# Talend to Snowflake SQL Transformation Mapping Guide
## Knowledge Base for RAG/MCP Integration

**Version**: 1.0
**Purpose**: Complete semantic mapping of Talend component logic to equivalent Snowflake SQL constructs
**Target Audience**: Data engineers implementing Talend jobs with Snowflake targets
**Critical Note**: Snowflake serves as the ultimate execution engine - optimized SQL is the performance baseline

---

## 1. TRANSFORMATION COMPONENT MAPPING

### 1.1 tMap Component → SELECT with Expressions

**Talend tMap** is the primary transformation component that maps input fields to output fields using expressions.

#### Basic Field Mapping

**Talend Configuration** (tMap component):
```xml
<node name="tMap_1" type="tMap">
  <elementParameter name="INPUT_SCHEMA" value="source_schema"/>
  <elementParameter name="MAPPING_OPERATIONS">
    <mapping name="OUTPUT_ID" expression="row1.ID"/>
    <mapping name="OUTPUT_NAME" expression="row1.FIRST_NAME + ' ' + row1.LAST_NAME"/>
    <mapping name="CREATED_AT" expression="row1.CREATED_DATE"/>
  </elementParameter>
</node>
```

**Equivalent Snowflake SQL**:
```sql
SELECT
    ID AS OUTPUT_ID,
    CONCAT(FIRST_NAME, ' ', LAST_NAME) AS OUTPUT_NAME,
    CREATED_DATE AS CREATED_AT
FROM source_table;
```

#### Complex Expressions

**Talend tMap Expression**:
```xml
<mapping name="CATEGORY" expression="
    row1.AMOUNT > 10000 ? 'LARGE' : 
    row1.AMOUNT > 1000 ? 'MEDIUM' : 
    'SMALL'
"/>
<mapping name="DISCOUNT_PCT" expression="
    java.lang.Math.round(row1.AMOUNT * 0.15 * 100) / 100.0
"/>
<mapping name="NORMALIZED_EMAIL" expression="
    row1.EMAIL == null ? '' : row1.EMAIL.toLowerCase().trim()
"/>
<mapping name="STRING_LENGTH" expression="
    row1.DESCRIPTION == null ? 0 : row1.DESCRIPTION.length()
"/>
```

**Equivalent Snowflake SQL**:
```sql
SELECT
    CASE 
        WHEN AMOUNT > 10000 THEN 'LARGE'
        WHEN AMOUNT > 1000 THEN 'MEDIUM'
        ELSE 'SMALL'
    END AS CATEGORY,
    ROUND(AMOUNT * 0.15, 2) AS DISCOUNT_PCT,
    COALESCE(LOWER(TRIM(EMAIL)), '') AS NORMALIZED_EMAIL,
    COALESCE(LENGTH(DESCRIPTION), 0) AS STRING_LENGTH
FROM source_table;
```

#### Multiple Outputs (Conditional Routing)

**Talend tMap**:
```xml
<node name="tMap_1" type="tMap">
  <elementParameter name="OUTPUT_SCHEMAS">
    <schema name="valid_records">
      <filter expression="row1.AMOUNT > 0"/>
      <mapping name="ID" expression="row1.ID"/>
    </schema>
    <schema name="rejected_records">
      <filter expression="row1.AMOUNT <= 0"/>
      <mapping name="ID" expression="row1.ID"/>
      <mapping name="ERROR_CODE" expression="'INVALID_AMOUNT'"/>
    </schema>
  </elementParameter>
</node>
```

**Equivalent Snowflake SQL** (using CTEs for clarity):
```sql
WITH valid_records AS (
    SELECT
        ID,
        AMOUNT
    FROM source_table
    WHERE AMOUNT > 0
),
rejected_records AS (
    SELECT
        ID,
        AMOUNT,
        'INVALID_AMOUNT' AS ERROR_CODE
    FROM source_table
    WHERE AMOUNT <= 0
)
SELECT * FROM valid_records;
-- Use rejected_records for error logging
```

---

### 1.2 tAggregate / tAggregateSortedRow → GROUP BY with Aggregates

#### Basic Aggregation

**Talend tAggregate**:
```xml
<node name="tAggregate_1" type="tAggregate">
  <elementParameter name="GROUP_BY">
    <key name="DEPARTMENT_ID"/>
    <key name="YEAR"/>
  </elementParameter>
  <elementParameter name="OPERATIONS">
    <operation name="TOTAL_SALARY" function="SUM" column="SALARY"/>
    <operation name="AVG_SALARY" function="AVG" column="SALARY"/>
    <operation name="EMPLOYEE_COUNT" function="COUNT" column="EMPLOYEE_ID"/>
    <operation name="MIN_SALARY" function="MIN" column="SALARY"/>
    <operation name="MAX_SALARY" function="MAX" column="SALARY"/>
    <operation name="FIRST_HIRE_DATE" function="FIRST" column="HIRE_DATE"/>
    <operation name="EMPLOYEE_LIST" function="CONCATENATE" column="EMPLOYEE_NAME" separator=","/>
  </elementParameter>
</node>
```

**Equivalent Snowflake SQL**:
```sql
SELECT
    DEPARTMENT_ID,
    YEAR,
    SUM(SALARY) AS TOTAL_SALARY,
    AVG(SALARY) AS AVG_SALARY,
    COUNT(DISTINCT EMPLOYEE_ID) AS EMPLOYEE_COUNT,
    MIN(SALARY) AS MIN_SALARY,
    MAX(SALARY) AS MAX_SALARY,
    FIRST_VALUE(HIRE_DATE) OVER (PARTITION BY DEPARTMENT_ID, YEAR ORDER BY HIRE_DATE) AS FIRST_HIRE_DATE,
    LISTAGG(EMPLOYEE_NAME, ',') WITHIN GROUP (ORDER BY EMPLOYEE_NAME) AS EMPLOYEE_LIST
FROM source_table
GROUP BY DEPARTMENT_ID, YEAR;
```

**Talend vs Snowflake Aggregation Functions**:

| Talend Function | Snowflake Equivalent | Notes |
|-----------------|----------------------|-------|
| SUM | SUM() | Total of all values |
| AVG | AVG() | Average of all values |
| COUNT | COUNT() | Number of rows |
| MIN | MIN() | Minimum value |
| MAX | MAX() | Maximum value |
| FIRST | FIRST_VALUE() OVER() | First value in partition |
| LAST | LAST_VALUE() OVER() | Last value in partition |
| CONCATENATE | LISTAGG() | String concatenation |
| STD_DEV | STDDEV() or STDDEV_POP() | Standard deviation |

#### tAggregateSortedRow Optimization

**Talend tAggregateSortedRow** (pre-sorted input):
```xml
<node name="tAggregateSortedRow_1" type="tAggregateSortedRow">
  <elementParameter name="INPUT_ROWS_COUNT" value="5000000"/>
  <elementParameter name="GROUP_BY">
    <key name="DEPARTMENT_ID"/>
  </elementParameter>
  <elementParameter name="OPERATIONS">
    <operation name="TOTAL_AMOUNT" function="SUM" column="AMOUNT"/>
    <operation name="ROW_COUNT" function="COUNT" column="ID"/>
  </elementParameter>
</node>
```

**Snowflake Equivalent** (expects input already sorted by DEPARTMENT_ID):
```sql
-- Pre-process: ensure input is sorted
WITH sorted_source AS (
    SELECT * FROM source_table
    ORDER BY DEPARTMENT_ID
)
SELECT
    DEPARTMENT_ID,
    SUM(AMOUNT) AS TOTAL_AMOUNT,
    COUNT(ID) AS ROW_COUNT
FROM sorted_source
GROUP BY DEPARTMENT_ID;
```

---

### 1.3 tUniqRow → QUALIFY ROW_NUMBER()

**Purpose**: Remove duplicate rows, keeping the first occurrence

#### Talend tUniqRow

```xml
<node name="tUniqRow_1" type="tUniqRow">
  <elementParameter name="CASE_SENSITIVE" value="false"/>
  <elementParameter name="UNIQUE_COLUMNS">
    <column name="CUSTOMER_ID"/>
    <column name="YEAR"/>
  </elementParameter>
</node>
```

**Semantics**:
- Rows are processed in order of arrival
- First occurrence of unique key combination is output
- All subsequent duplicates are discarded
- No aggregation occurs (unlike GROUP BY)
- Case sensitivity affects string matching

**Equivalent Snowflake SQL**:
```sql
-- Method 1: Using QUALIFY (Snowflake-native, most efficient)
SELECT *
FROM source_table
QUALIFY ROW_NUMBER() OVER (PARTITION BY CUSTOMER_ID, YEAR ORDER BY 1) = 1;

-- Method 2: Using subquery (more portable)
SELECT *
FROM (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY CUSTOMER_ID, YEAR ORDER BY 1) AS RN
    FROM source_table
)
WHERE RN = 1;

-- Method 3: Using GROUP BY (alternative)
SELECT DISTINCT
    CUSTOMER_ID,
    YEAR
FROM source_table;
```

#### With Case-Insensitive Matching

**Talend Configuration**:
```xml
<elementParameter name="CASE_SENSITIVE" value="false"/>
<elementParameter name="UNIQUE_COLUMNS">
    <column name="COUNTRY"/>
    <column name="STATE"/>
</elementParameter>
```

**Snowflake SQL** (case-insensitive):
```sql
SELECT *
FROM source_table
QUALIFY ROW_NUMBER() OVER (
    PARTITION BY UPPER(COUNTRY), UPPER(STATE)
    ORDER BY 1
) = 1;
```

---

### 1.4 tSortRow → ORDER BY Clause

**Talend tSortRow** (in-memory or disk-based sorting):
```xml
<node name="tSortRow_1" type="tSortRow">
  <elementParameter name="SORT_COLUMNS">
    <column name="DEPARTMENT_ID" order="ASC" nulls_first="true"/>
    <column name="SALARY" order="DESC" nulls_last="true"/>
    <column name="HIRE_DATE" order="ASC"/>
  </elementParameter>
  <elementParameter name="USE_DISK" value="true"/>
</node>
```

**Equivalent Snowflake SQL**:
```sql
SELECT *
FROM source_table
ORDER BY
    DEPARTMENT_ID ASC NULLS FIRST,
    SALARY DESC NULLS LAST,
    HIRE_DATE ASC;
```

**Performance Recommendation**:
Push sorting to source database query:
```xml
<node name="tDBInput_1" type="tDBInput">
  <elementParameter name="SQL_QUERY" value="
    SELECT * FROM source_table
    ORDER BY DEPARTMENT_ID ASC, SALARY DESC
  "/>
</node>
```

---

## 2. DATA QUALITY AND TRANSFORMATION PATTERNS

### 2.1 SCD Type 1 (Slowly Changing Dimension - Overwrite)

**Pattern**: When dimension attributes change, update the existing record in place.

**Talend Implementation** (using tDBOutput with UPDATE mode):
```xml
<node name="tDBOutput_1" type="tDBOutput">
  <elementParameter name="CONNECTION" value="Snowflake"/>
  <elementParameter name="TABLE_NAME" value="DIM_CUSTOMER"/>
  <elementParameter name="ACTION_ON_TABLE" value="UPDATE"/>
  <elementParameter name="MATCH_ON_KEY" value="true"/>
  <elementParameter name="KEY_COLUMNS">
    <key name="CUSTOMER_ID"/>
  </elementParameter>
</node>
```

**Equivalent Snowflake SQL** (SCD1 Logic):
```sql
MERGE INTO DIM_CUSTOMER target
USING (
    SELECT CUSTOMER_ID, CUSTOMER_NAME, EMAIL, PHONE, LAST_UPDATE_DATE
    FROM staging_customer_input
) source
ON target.CUSTOMER_ID = source.CUSTOMER_ID
WHEN MATCHED THEN
    UPDATE SET
        target.CUSTOMER_NAME = source.CUSTOMER_NAME,
        target.EMAIL = source.EMAIL,
        target.PHONE = source.PHONE,
        target.LAST_UPDATE_DATE = CURRENT_TIMESTAMP()
WHEN NOT MATCHED THEN
    INSERT (CUSTOMER_ID, CUSTOMER_NAME, EMAIL, PHONE, LAST_UPDATE_DATE)
    VALUES (source.CUSTOMER_ID, source.CUSTOMER_NAME, source.EMAIL, source.PHONE, CURRENT_TIMESTAMP());
```

**Data Flow**:
```
Current DIM_CUSTOMER:    Staging Input:      Result:
ID  | NAME    | PHONE    ID  | NAME    | PHONE    ID  | NAME     | PHONE
1   | Alice   | 555-1234 1   | Alice   | 555-5678 1   | Alice    | 555-5678 (updated)
2   | Bob     | 555-5555 2   | Bob     | 555-5555 2   | Bob      | 555-5555 (unchanged)
                          3   | Carol   | 555-6666 3   | Carol    | 555-6666 (inserted)
```

### 2.2 SCD Type 2 (Slowly Changing Dimension - Historicize)

**Pattern**: When dimension attributes change, close the old record and insert a new record with change tracking.

**Talend Implementation** (using custom tMap + tDBOutput):

Step 1: Transform to add SCD2 columns
```xml
<node name="tMap_1" type="tMap">
  <elementParameter name="MAPPING_OPERATIONS">
    <mapping name="CUSTOMER_ID" expression="row1.CUSTOMER_ID"/>
    <mapping name="CUSTOMER_NAME" expression="row1.CUSTOMER_NAME"/>
    <mapping name="EMAIL" expression="row1.EMAIL"/>
    <mapping name="SCD_START_DATE" expression="TalendDate.getCurrentDate()"/>
    <mapping name="SCD_END_DATE" expression="null"/>
    <mapping name="SCD_ACTIVE" expression="1"/>
    <mapping name="SCD_VERSION" expression="1"/>
  </elementParameter>
</node>
```

**Equivalent Snowflake SQL** (SCD2 Logic):
```sql
MERGE INTO DIM_CUSTOMER target
USING (
    SELECT CUSTOMER_ID, CUSTOMER_NAME, EMAIL, PHONE
    FROM staging_customer_input
) source
ON target.CUSTOMER_ID = source.CUSTOMER_ID
WHEN MATCHED AND (
    target.CUSTOMER_NAME != source.CUSTOMER_NAME OR
    target.EMAIL != source.EMAIL OR
    target.PHONE != source.PHONE
) THEN
    UPDATE SET
        target.SCD_END_DATE = CURRENT_DATE(),
        target.SCD_ACTIVE = 0
WHEN NOT MATCHED THEN
    INSERT (CUSTOMER_ID, CUSTOMER_NAME, EMAIL, PHONE, SCD_START_DATE, SCD_END_DATE, SCD_ACTIVE, SCD_VERSION)
    VALUES (
        source.CUSTOMER_ID,
        source.CUSTOMER_NAME,
        source.EMAIL,
        source.PHONE,
        CURRENT_DATE(),
        NULL,
        1,
        1
    );

-- Insert new version for changed records
INSERT INTO DIM_CUSTOMER (CUSTOMER_ID, CUSTOMER_NAME, EMAIL, PHONE, SCD_START_DATE, SCD_END_DATE, SCD_ACTIVE, SCD_VERSION)
SELECT
    source.CUSTOMER_ID,
    source.CUSTOMER_NAME,
    source.EMAIL,
    source.PHONE,
    CURRENT_DATE(),
    NULL,
    1,
    target.SCD_VERSION + 1
FROM (
    SELECT CUSTOMER_ID, CUSTOMER_NAME, EMAIL, PHONE
    FROM staging_customer_input
) source
INNER JOIN (
    SELECT CUSTOMER_ID, CUSTOMER_NAME, EMAIL, PHONE, SCD_VERSION, SCD_ACTIVE
    FROM DIM_CUSTOMER
    WHERE SCD_ACTIVE = 1
) target ON source.CUSTOMER_ID = target.CUSTOMER_ID
WHERE source.CUSTOMER_NAME != target.CUSTOMER_NAME
   OR source.EMAIL != target.EMAIL
   OR source.PHONE != target.PHONE;
```

**Data Flow Example**:
```
Initial State:
ID | NAME   | EMAIL | SCD_START | SCD_END | SCD_ACTIVE | VERSION
1  | Alice  | a@x   | 2024-01-01| NULL   | 1          | 1

After update (EMAIL changed to a@y):
ID | NAME   | EMAIL | SCD_START | SCD_END    | SCD_ACTIVE | VERSION
1  | Alice  | a@x   | 2024-01-01| 2024-02-01 | 0          | 1
1  | Alice  | a@y   | 2024-02-01| NULL      | 1          | 2
```

### 2.3 SCD Type 3 (Keep Current + Previous)

**Pattern**: Store current and previous version in same row.

**Talend Implementation**:
```xml
<node name="tMap_1" type="tMap">
  <elementParameter name="MAPPING_OPERATIONS">
    <!-- Determine if record changed -->
    <mapping name="CURRENT_NAME" expression="row1.CUSTOMER_NAME"/>
    <mapping name="PREVIOUS_NAME" expression="
        /* Lookup previous name from target table */
        row2.CUSTOMER_NAME
    "/>
    <mapping name="CURRENT_EMAIL" expression="row1.EMAIL"/>
    <mapping name="PREVIOUS_EMAIL" expression="row2.EMAIL"/>
  </elementParameter>
</node>
```

**Equivalent Snowflake SQL** (SCD3 Logic):
```sql
MERGE INTO DIM_CUSTOMER target
USING (
    SELECT
        source.CUSTOMER_ID,
        source.CUSTOMER_NAME,
        source.EMAIL,
        COALESCE(target.CUSTOMER_NAME, '') AS PREVIOUS_NAME,
        COALESCE(target.EMAIL, '') AS PREVIOUS_EMAIL
    FROM staging_customer_input source
    LEFT JOIN DIM_CUSTOMER target
        ON source.CUSTOMER_ID = target.CUSTOMER_ID
) cte
ON target.CUSTOMER_ID = cte.CUSTOMER_ID
WHEN MATCHED AND (cte.CUSTOMER_NAME != cte.PREVIOUS_NAME OR cte.EMAIL != cte.PREVIOUS_EMAIL) THEN
    UPDATE SET
        target.PREVIOUS_NAME = target.CUSTOMER_NAME,
        target.CUSTOMER_NAME = cte.CUSTOMER_NAME,
        target.PREVIOUS_EMAIL = target.EMAIL,
        target.EMAIL = cte.EMAIL,
        target.LAST_UPDATE_DATE = CURRENT_TIMESTAMP()
WHEN NOT MATCHED THEN
    INSERT (CUSTOMER_ID, CUSTOMER_NAME, PREVIOUS_NAME, EMAIL, PREVIOUS_EMAIL, LAST_UPDATE_DATE)
    VALUES (cte.CUSTOMER_ID, cte.CUSTOMER_NAME, NULL, cte.EMAIL, NULL, CURRENT_TIMESTAMP());
```

**Data Flow Example**:
```
Initial:
ID | CURRENT_NAME | PREVIOUS_NAME | CURRENT_EMAIL | PREVIOUS_EMAIL
1  | Alice        | NULL          | alice@old.com | NULL

After update (name changed):
ID | CURRENT_NAME | PREVIOUS_NAME | CURRENT_EMAIL | PREVIOUS_EMAIL
1  | Alice New    | Alice         | alice@new.com | alice@old.com
```

---

## 3. SURROGATE KEY GENERATION

### 3.1 Database Sequence-Based Generation

**Talend Configuration** (using tDBInput for sequence):
```xml
<node name="tDBInput_1" type="tDBInput">
  <elementParameter name="SQL_QUERY" value="SELECT customer_seq.NEXTVAL AS SK FROM DUAL"/>
</node>
```

**Equivalent Snowflake SQL**:
```sql
-- Create sequence
CREATE SEQUENCE CUSTOMER_SK_SEQ START = 1 INCREMENT = 1;

-- Use in INSERT
INSERT INTO DIM_CUSTOMER (CUSTOMER_SK, CUSTOMER_ID, CUSTOMER_NAME)
SELECT
    CUSTOMER_SK_SEQ.NEXTVAL,
    CUSTOMER_ID,
    CUSTOMER_NAME
FROM staging_customer;

-- Or use within MERGE
MERGE INTO DIM_CUSTOMER target
USING staging_customer source
ON target.CUSTOMER_ID = source.CUSTOMER_ID
WHEN NOT MATCHED THEN
    INSERT (CUSTOMER_SK, CUSTOMER_ID, CUSTOMER_NAME)
    VALUES (CUSTOMER_SK_SEQ.NEXTVAL, source.CUSTOMER_ID, source.CUSTOMER_NAME);
```

### 3.2 Hash-Based Surrogate Key Generation

**Talend tMap Expression**:
```xml
<mapping name="SURROGATE_KEY" expression="
    java.util.UUID.nameUUIDFromBytes(
        (row1.DIMENSION_KEY1 + '|' + row1.DIMENSION_KEY2).getBytes()
    ).toString().replace('-', '')
"/>
```

**Equivalent Snowflake SQL**:
```sql
SELECT
    MD5(CONCAT(DIMENSION_KEY1, '|', DIMENSION_KEY2)) AS SURROGATE_KEY,
    DIMENSION_KEY1,
    DIMENSION_KEY2
FROM source_table;
```

### 3.3 Row Number-Based Surrogate Key

**Talend tMap**:
```xml
<mapping name="ROW_SK" expression="
    Integer.valueOf((String) globalMap.get('tFileInputDelimited_1_NB_LINE'))
"/>
```

**Equivalent Snowflake SQL**:
```sql
SELECT
    ROW_NUMBER() OVER (ORDER BY CUSTOMER_ID) AS ROW_SK,
    CUSTOMER_ID,
    CUSTOMER_NAME
FROM source_table;
```

---

## 4. ADVANCED SQL PATTERNS

### 4.1 Window Functions (Ranking, Running Totals)

**Talend tMap** (using Java for calculation):
```xml
<mapping name="RANK_IN_DEPT" expression="
    /* Talend doesn't have native window functions; use tAggregateSortedRow instead */
    /* Or implement complex logic in tJavaFlex with state tracking */
"/>
```

**Equivalent Snowflake SQL**:
```sql
SELECT
    CUSTOMER_ID,
    AMOUNT,
    DEPARTMENT_ID,
    RANK() OVER (PARTITION BY DEPARTMENT_ID ORDER BY AMOUNT DESC) AS RANK_IN_DEPT,
    ROW_NUMBER() OVER (PARTITION BY DEPARTMENT_ID ORDER BY AMOUNT DESC) AS ROW_NUM,
    SUM(AMOUNT) OVER (PARTITION BY DEPARTMENT_ID ORDER BY AMOUNT DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RUNNING_SUM,
    AVG(AMOUNT) OVER (PARTITION BY DEPARTMENT_ID) AS AVG_DEPT_AMOUNT
FROM sales_data;
```

### 4.2 QUALIFY Clause for Window Function Filtering

**Pattern**: Filter results based on window function computation

**Talend Equivalent** (using tUniqRow + tAggregate combo):
```
tDBInput → tAggregate [get max per group] → tMap [compare] → tUniqRow
```

**Snowflake SQL** (direct QUALIFY):
```sql
SELECT
    CUSTOMER_ID,
    DEPARTMENT_ID,
    SALARY,
    RANK() OVER (PARTITION BY DEPARTMENT_ID ORDER BY SALARY DESC) AS SAL_RANK
FROM employees
QUALIFY SAL_RANK <= 3;  -- Top 3 salaries per department
```

**Equivalent multi-step Talend approach**:
```xml
<!-- Step 1: Get rank -->
<node name="tMap_1" type="tMap">
  <mapping name="RANK_SAL" expression="
    /* Cannot compute window function in tMap; use separate aggregation */
  "/>
</node>

<!-- Step 2: Filter with aggregate + join -->
<node name="tAggregate_1" type="tAggregate">
  <elementParameter name="GROUP_BY">
    <key name="DEPARTMENT_ID"/>
  </elementParameter>
  <elementParameter name="OPERATIONS">
    <operation name="MAX_SALARY" function="MAX" column="SALARY"/>
  </elementParameter>
</node>
```

### 4.3 MERGE with Deduplication

**Problem**: Source has duplicate rows, MERGE requires unique match on key

**Talend Solution**:
```xml
<node name="tUniqRow_1" type="tUniqRow">
  <elementParameter name="UNIQUE_COLUMNS">
    <column name="CUSTOMER_ID"/>
  </elementParameter>
</node>
```

**Snowflake SQL**:
```sql
MERGE INTO target_table target
USING (
    SELECT CUSTOMER_ID, CUSTOMER_NAME, EMAIL
    FROM staging_input
    QUALIFY ROW_NUMBER() OVER (PARTITION BY CUSTOMER_ID ORDER BY LOAD_TIMESTAMP DESC) = 1
) source
ON target.CUSTOMER_ID = source.CUSTOMER_ID
WHEN MATCHED THEN
    UPDATE SET target.CUSTOMER_NAME = source.CUSTOMER_NAME, target.EMAIL = source.EMAIL
WHEN NOT MATCHED THEN
    INSERT (CUSTOMER_ID, CUSTOMER_NAME, EMAIL)
    VALUES (source.CUSTOMER_ID, source.CUSTOMER_NAME, source.EMAIL);
```

---

## 5. COMMON TALEND JAVA PATTERNS → SQL EQUIVALENTS

### 5.1 String Manipulation

| Talend Java | Snowflake SQL |
|------------|--------------|
| `row1.VALUE.toUpperCase()` | `UPPER(VALUE)` |
| `row1.VALUE.toLowerCase()` | `LOWER(VALUE)` |
| `row1.VALUE.trim()` | `TRIM(VALUE)` |
| `row1.VALUE.length()` | `LENGTH(VALUE)` |
| `row1.VALUE.substring(0, 3)` | `SUBSTRING(VALUE, 1, 3)` |
| `row1.VALUE.replace('a', 'b')` | `REPLACE(VALUE, 'a', 'b')` |
| `row1.VALUE.startsWith('x')` | `STARTSWITH(VALUE, 'x')` |
| `row1.VALUE.contains('x')` | `CONTAINS(VALUE, 'x')` or `LIKE '%x%'` |

### 5.2 Date/Time Manipulation

| Talend Java | Snowflake SQL |
|------------|--------------|
| `TalendDate.getCurrentDate()` | `CURRENT_DATE()` |
| `TalendDate.getCurrentTime()` | `CURRENT_TIMESTAMP()` |
| `TalendDate.addDate(date, 30, 'D')` | `DATEADD(DAY, 30, date)` |
| `TalendDate.addMonths(date, 3)` | `DATEADD(MONTH, 3, date)` |
| `TalendDate.diffDate(d1, d2)` | `DATEDIFF(DAY, d2, d1)` |
| `new java.util.Date().getTime()` | `EXTRACT(EPOCH FROM CURRENT_TIMESTAMP()) * 1000` |

### 5.3 Null Handling

| Talend Java | Snowflake SQL |
|------------|--------------|
| `row1.VALUE == null ? 'N/A' : row1.VALUE` | `COALESCE(VALUE, 'N/A')` |
| `row1.VALUE != null` | `VALUE IS NOT NULL` |
| `row1.VALUE == null` | `VALUE IS NULL` |
| `row1.VALUE == null ? 0 : row1.VALUE` | `IFNULL(VALUE, 0)` or `COALESCE(VALUE, 0)` |

### 5.4 Numeric Operations

| Talend Java | Snowflake SQL |
|------------|--------------|
| `java.lang.Math.round(value * 100) / 100.0` | `ROUND(value, 2)` |
| `java.lang.Math.abs(value)` | `ABS(value)` |
| `java.lang.Math.ceil(value)` | `CEIL(value)` |
| `java.lang.Math.floor(value)` | `FLOOR(value)` |
| `java.lang.Math.sqrt(value)` | `SQRT(value)` |
| `java.lang.Math.pow(value, 2)` | `POWER(value, 2)` |

---

## 6. PERFORMANCE OPTIMIZATION: TALEND vs SNOWFLAKE

### 6.1 Pushing Logic to Snowflake

**Suboptimal** (Talend does work):
```xml
<!-- tDBInput retrieves all rows -->
<node name="tDBInput_1" type="tDBInput">
  <elementParameter name="TABLE_NAME" value="LARGE_TRANSACTION_TABLE"/>
  <!-- 100M rows → Talend memory -->
</node>
<!-- tMap filters -->
<node name="tMap_1" type="tMap">
  <mapping name="OUTPUT" expression="row1.AMOUNT > 1000 ? row1 : null"/>
</node>
<!-- tAggregate aggregates -->
<node name="tAggregate_1" type="tAggregate"/>
```

**Optimized** (Snowflake does work):
```xml
<node name="tSnowflakeInput_1" type="tSnowflakeInput">
  <elementParameter name="SQL_QUERY" value="
    SELECT CUSTOMER_ID, SUM(AMOUNT) AS TOTAL_AMOUNT
    FROM LARGE_TRANSACTION_TABLE
    WHERE AMOUNT > 1000
    GROUP BY CUSTOMER_ID
  "/>
  <!-- Pre-aggregated, filtered data → Talend (1M rows instead of 100M) -->
</node>
```

**Benefits**:
- Database applies WHERE predicate first (partition pruning)
- Aggregation in Snowflake is optimized (vectorized)
- Network traffic reduced
- Talend memory freed for other operations

### 6.2 Batch Size and Commitment Strategy

**Talend tSnowflakeOutput**:
```xml
<node name="tSnowflakeOutput_1" type="tSnowflakeOutput">
  <elementParameter name="BATCH_SIZE" value="50000"/>
  <elementParameter name="USE_BULK_LOAD" value="true"/>
</node>
```

**Equivalent Snowflake Concept**:
```sql
-- Snowflake COPY INTO with batch parameters
COPY INTO target_table
FROM @my_stage/data/
PATTERN = '.*\.parquet'
FILE_FORMAT = (TYPE = PARQUET)
ON_ERROR = CONTINUE
PURGE = TRUE
FORCE = FALSE;
```

---

## APPENDIX A: FUNCTION MAPPING REFERENCE

### String Functions
```
toUpperCase() / toLowerCase() → UPPER() / LOWER()
trim() → TRIM()
length() → LENGTH()
substring(start, end) → SUBSTRING(str, start, end)
replace(old, new) → REPLACE(str, old, new)
concat(s1, s2) → CONCAT(s1, s2) or s1 || s2
split(delimiter) → STRTOK() or SPLIT_PART()
```

### Numeric Functions
```
Math.round(x) → ROUND(x)
Math.abs(x) → ABS(x)
Math.ceil(x) → CEIL(x)
Math.floor(x) → FLOOR(x)
Math.pow(x, y) → POWER(x, y)
Math.sqrt(x) → SQRT(x)
Math.max(x, y) → GREATEST(x, y)
Math.min(x, y) → LEAST(x, y)
```

### Date Functions
```
TalendDate.getCurrentDate() → CURRENT_DATE()
TalendDate.getCurrentTime() → CURRENT_TIMESTAMP()
TalendDate.addDate(d, n, 'D') → DATEADD(DAY, n, d)
TalendDate.diffDate(d1, d2) → DATEDIFF(DAY, d2, d1)
```

---

**End of Document**
