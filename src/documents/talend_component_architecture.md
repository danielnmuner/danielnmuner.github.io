# Talend Studio Component Architecture and Semantics Reference
## Knowledge Base for RAG/MCP Integration

**Version**: 1.0
**Purpose**: Comprehensive mapping of Talend component architecture, Java semantics, and XML item file structure
**Source of Truth**: Talend *.item XML files are the absolute source of truth for all component configurations

---

## 1. TALEND JOB EXECUTION MODEL

### 1.1 Job Hierarchy Structure

Jobs in Talend form a hierarchical tree structure defined by `<elementValue name="JOBS">` in the *.item XML:

```
Parent Job (root)
├── Child Job 1 (tRunJob component)
│   ├── Child Job 1.1
│   └── Child Job 1.2
├── Child Job 2
└── Child Job 3
```

**Practical Constraints**:
- Maximum nesting depth: 3-5 levels recommended
- Best practice: Atomic modules of focused single-purpose
- Parallelization: Multiple tRunJob calls can execute simultaneously
- JVM isolation: "Use an independent process to run subjob" checkbox creates separate heap/thread

**XML Item Representation**:
```xml
<node name="tRunJob_1" type="tRunJob">
  <elementParameter name="JOBS" value="Child_Job_Name"/>
  <elementParameter name="USE_INDEPENDENT_PROCESS" value="true"/>
</node>
```

### 1.2 Job Flow Control

**tPreJob / tPostJob Components**:
- **tPreJob**: Executes before data flow processing (setup)
- **tPostJob**: Executes after all processing completes (cleanup/logging)
- Not data-flow components (no row throughput)
- Single execution per job
- Used for initializing context variables and resource allocation

**OnComponentOk / OnComponentError Triggers**:
```
Component_A --[onComponentOk]--> Component_B
Component_A --[onComponentError]--> Component_C
```
- Conditional execution based on previous component success/failure
- Example: tDBOutput success → tCloseConnection

---

## 2. TALEND JAVA COMPONENT ECOSYSTEM

### 2.1 Java Component Family Architecture

Talend provides three custom code components with distinct execution models:

#### **tJava Component**
**Execution Model**: One-shot, single execution at job initialization
**Semantics**:
- Executes once before any data processing begins
- Access to global context only (no row context)
- Primary use: Initialize variables, set up resources
- Does NOT process individual rows

**XML Item Structure**:
```xml
<node name="tJava_1" type="tJava">
  <elementParameter name="CODE" value="
    globalMap.put('initialization_flag', 'true');
    System.out.println('Job starting');
  "/>
</node>
```

**Variable Access Pattern**:
```java
// Global variables only
Integer processCount = (Integer) globalMap.get('process_count');
globalMap.put('start_time', System.currentTimeMillis());
```

#### **tJavaRow Component**
**Execution Model**: Per-row processing with synchronized input/output
**Semantics**:
- Executes for EACH incoming row
- Strict input_row/output_row syntax required
- Single main code block for row transformations
- Row-level context available
- Execution order: For each row { Main Code }

**XML Item Structure**:
```xml
<node name="tJavaRow_1" type="tJavaRow">
  <elementParameter name="CODE" value="
    output_row = new rowStruct();
    output_row.ID = input_row.ID;
    output_row.TRANSFORMED_VALUE = input_row.VALUE.toUpperCase();
    output_row.ROW_HASH = java.util.UUID.randomUUID().toString();
  "/>
</node>
```

**Variable Access Pattern**:
```java
// Input row from preceding component
Integer sourceId = input_row.CUSTOMER_ID;
String sourceValue = input_row.SOURCE_COLUMN;

// Output row to next component
output_row.DERIVED_ID = sourceId * 100;
output_row.CALCULATED_FIELD = sourceValue.length();

// Global context still accessible
globalMap.put('row_count', (Integer)globalMap.get('row_count') + 1);
```

**Critical Syntax Rules**:
- Variable names: `input_row` (source), `output_row` (target) - fixed names
- Column access: dot notation (input_row.COLUMN_NAME)
- Type conversion required for assignments
- Must instantiate output_row (output_row = new rowStruct())

#### **tJavaFlex Component**
**Execution Model**: Per-row processing with flexible code organization and state accumulation
**Semantics**:
- Executes for EACH incoming row
- Three code blocks: Start Code, Main Code, End Code
- Start Code: Executed once before first row (resource initialization)
- Main Code: Executed for every row (row processing)
- End Code: Executed once after last row (state finalization)
- Uses actual row variable names from input/output (not input_row/output_row)
- Allows state accumulation across rows

**XML Item Structure**:
```xml
<node name="tJavaFlex_1" type="tJavaFlex">
  <elementParameter name="START_CODE" value="
    globalMap.put('row_accumulator', new java.util.ArrayList());
    globalMap.put('total_sum', 0L);
  "/>
  <elementParameter name="MAIN_CODE" value="
    row2.ID = row1.ID;
    row2.VALUE_UPPER = row1.VALUE.toUpperCase();
    Long sum = (Long) globalMap.get('total_sum');
    sum += row1.AMOUNT;
    globalMap.put('total_sum', sum);
  "/>
  <elementParameter name="END_CODE" value="
    System.out.println('Final Sum: ' + globalMap.get('total_sum'));
  "/>
</node>
```

**Variable Access Pattern**:
```java
// START_CODE section
java.util.Map accumulator = new java.util.HashMap();
globalMap.put('processing_map', accumulator);

// MAIN_CODE section (executes per row)
row2.OUTPUT_ID = row1.INPUT_ID;
row2.ACCUMULATED_FLAG = String.valueOf(true);

// Access actual row names (row1, row2) not input_row/output_row
java.util.Map map = (java.util.Map) globalMap.get('processing_map');
map.put(row1.KEY, row1.VALUE);

// END_CODE section
java.util.Map finalMap = (java.util.Map) globalMap.get('processing_map');
System.out.println('Total entries: ' + finalMap.size());
```

**Critical Syntax Rules**:
- Variable names: Actual row names from input/output (e.g., row1, row2, source_data)
- Column access: Dot notation (row1.COLUMN_NAME)
- Three distinct execution phases with clear lifecycle
- State preservation across row iterations via globalMap

### 2.2 Java Component Comparison Matrix

| Aspect | tJava | tJavaRow | tJavaFlex |
|--------|-------|----------|-----------|
| Execution Count | Once (job init) | Per row | Per row (3 phases) |
| Input/Output | Global only | Row context | Row context + global |
| Code Blocks | Single | Single (main) | Three (start/main/end) |
| Variable Syntax | globalMap | input_row/output_row | Actual row names |
| State Accumulation | Yes | No (no end block) | Yes (via globalMap) |
| Use Case | Setup/cleanup | Simple transformations | Complex stateful logic |
| Memory Overhead | Minimal | Per-row overhead | Moderate (state tracking) |

### 2.3 Java Expression Context in tMap

The tMap component includes an Expression Builder that provides access to:

**Available Java Libraries**:
- java.lang.* (String, Integer, Math, etc.)
- java.util.* (ArrayList, HashMap, Date, etc.)
- Talend built-in functions (TalendDate, TalendString, etc.)
- Custom routines (user-defined Java classes)

**Expression Syntax in tMap**:
```xml
<mapping>
  <expression name="DERIVED_ID" expression="row1.ID * 1000 + row1.SEQUENCE"/>
  <expression name="FULL_NAME" expression="row1.FIRST_NAME + ' ' + row1.LAST_NAME"/>
  <expression name="CALCULATED_DATE" expression="TalendDate.addDate(row1.START_DATE, 30, 'D')"/>
  <expression name="CONDITIONAL_VALUE" expression="row1.STATUS.equals('ACTIVE') ? 'YES' : 'NO'"/>
  <expression name="CUSTOM_ROUTINE" expression="myRoutine.processValue(row1.INPUT_VALUE)"/>
</mapping>
```

**Routine Definition** (XML in *.item):
```xml
<node name="routine_custom_process">
  <elementParameter name="CODE" value="
    public static String processValue(String input) {
      if (input == null || input.isEmpty()) return 'NULL';
      return input.toUpperCase() + '_PROCESSED';
    }
  "/>
</node>
```

---

## 3. CORE TRANSFORMATION COMPONENTS

### 3.1 tMap Component - Data Transformation Engine

**Purpose**: Primary transformation component for mapping input fields to outputs with complex expression logic

**Architecture**:
```
Input Schema (Left Panel)
└─ Row 1: [Col1, Col2, Col3, ...]
└─ Lookup Table 1: [LookKey, LookVal, ...]
└─ Lookup Table N: ...
        ↓
    [Expression Builder]
    [Filter Logic]
    [Lookup Resolution]
        ↓
Output Schema (Right Panel)
└─ Main Output: [OutCol1, OutCol2, ...]
└─ Output 2: [...]
└─ Reject Output: [...]
```

**XML Item Structure**:
```xml
<node name="tMap_1" type="tMap">
  <elementParameter name="SCHEMA" value="input_schema"/>
  <elementParameter name="OUTPUT_SCHEMAS">
    <node name="main_output">
      <elementParameter name="MAPPING">
        <mapping name="ID" expression="row1.ID"/>
        <mapping name="NAME" expression="row1.FIRST_NAME + ' ' + row1.LAST_NAME"/>
      </elementParameter>
    </node>
    <node name="reject_output">
      <elementParameter name="CONDITION" expression="row1.AMOUNT < 0"/>
    </node>
  </elementParameter>
  <elementParameter name="LOOKUP_TABLES">
    <lookup name="lookup_customer">
      <parameter name="LOAD_MODE" value="LOAD_EACH_ROW"/>
      <parameter name="KEY" value="CUSTOMER_ID"/>
    </lookup>
  </elementParameter>
</node>
```

**Core Configuration Parameters**:
- **Schema**: Input schema definition
- **Lookup Mode**: LOAD_AT_START, LOAD_EACH_ROW, READ_EACH_ROW
- **Temporary Data Storage**: Memory (default) or disk (for large lookups)
- **Multiple Outputs**: Each with independent column mappings
- **Conditional Routing**: Filter expressions per output

**Memory Optimization**:
- **Store temp data**: Option to use disk instead of system memory
- Use case: Large lookup tables (millions of rows)
- Configuration: "Store temp data" checkbox in Advanced Settings
- File location: Specified directory on disk

### 3.2 tAggregate / tAggregateSortedRow Components

**tAggregate**:
- Aggregates entire input flow in memory
- Groups by specified columns
- Applies operations (SUM, AVG, COUNT, MIN, MAX, FIRST, LAST, CONCATENATE)
- Unsorted input acceptable
- High memory consumption for large datasets

**XML Item Structure**:
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
    <operation name="FIRST_DATE" function="FIRST" column="HIRE_DATE"/>
  </elementParameter>
</node>
```

**tAggregateSortedRow**:
- Expects pre-sorted input (critical requirement)
- Aggregates in single pass (optimal memory)
- Same grouping and operation semantics as tAggregate
- Input rows count must be specified (required parameter)

**XML Item Structure**:
```xml
<node name="tAggregateSortedRow_1" type="tAggregateSortedRow">
  <elementParameter name="INPUT_ROWS_COUNT" value="10000000"/>
  <elementParameter name="GROUP_BY">
    <key name="DEPARTMENT_ID"/>
  </elementParameter>
  <elementParameter name="OPERATIONS">
    <operation name="TOTAL_AMOUNT" function="SUM" column="AMOUNT"/>
  </elementParameter>
</node>
```

**tSortRow Precedent**:
```
tDBInput [ordered by DEPT_ID] → tSortRow [disk-based] → tAggregateSortedRow
```
Optimization: Push ORDER BY to source database instead of tSortRow component

### 3.3 tUniqRow Component - Duplicate Elimination

**Purpose**: Remove duplicate rows based on specified columns (first occurrence retained)

**Semantics**:
- Processes in order received
- First occurrence of key combination kept
- Subsequent duplicates discarded
- Case sensitivity: Configurable (default: case-insensitive for strings)
- No aggregation (unlike GROUP BY)

**XML Item Structure**:
```xml
<node name="tUniqRow_1" type="tUniqRow">
  <elementParameter name="CASE_SENSITIVE" value="false"/>
  <elementParameter name="UNIQUE_COLUMNS">
    <column name="COUNTRY"/>
    <column name="STATE"/>
  </elementParameter>
</node>
```

**Equivalent Snowflake SQL**:
```sql
SELECT *
FROM source_table
QUALIFY ROW_NUMBER() OVER (PARTITION BY COUNTRY, STATE ORDER BY 1) = 1;
```

### 3.4 tSortRow Component - Data Ordering

**Purpose**: Sort rows by specified columns (memory or disk-based)

**Execution Models**:
1. **Memory sort**: All rows loaded, sorted in memory (GC pressure for large datasets)
2. **Disk sort**: Uses temporary files (slower but memory-efficient)

**XML Item Structure**:
```xml
<node name="tSortRow_1" type="tSortRow">
  <elementParameter name="SORT_COLUMNS">
    <column name="DEPARTMENT_ID" order="ASC" nulls_first="true"/>
    <column name="SALARY" order="DESC" nulls_last="true"/>
  </elementParameter>
  <elementParameter name="USE_DISK" value="true"/>
  <elementParameter name="TEMP_DIR" value="/tmp/talend_sort"/>
</node>
```

**Performance Best Practice**:
- For database sources: Push sorting to SQL query (ORDER BY in tDBInput)
- Avoids Talend memory overhead
- Reduces network traffic by applying filter early

---

## 4. DATABASE AND SNOWFLAKE-SPECIFIC COMPONENTS

### 4.1 tDBInput / tDBOutput Generic Components

**tDBInput** (Source Component):
```xml
<node name="tDBInput_1" type="tDBInput">
  <elementParameter name="CONNECTION" value="Oracle_Connection"/>
  <elementParameter name="TABLE_NAME" value="EMPLOYEES"/>
  <elementParameter name="SQL_QUERY" value="SELECT * FROM EMPLOYEES WHERE HIRE_DATE > ?"/>
  <elementParameter name="QUERY_CONDITION" value="SALARY > 50000"/>
  <elementParameter name="ORDER_BY" value="DEPARTMENT_ID ASC"/>
</node>
```

**tDBOutput** (Target Component):
```xml
<node name="tDBOutput_1" type="tDBOutput">
  <elementParameter name="CONNECTION" value="Snowflake_Connection"/>
  <elementParameter name="TABLE_NAME" value="STG_EMPLOYEES"/>
  <elementParameter name="ACTION_ON_TABLE" value="INSERT"/>
  <!-- Actions: NONE, CREATE, CREATE_IF_NOT_EXISTS, TRUNCATE_AND_INSERT, INSERT, UPDATE, DELETE -->
  <elementParameter name="MATCH_ON_KEY" value="true"/>
  <elementParameter name="KEY_COLUMNS">
    <key name="EMPLOYEE_ID"/>
  </elementParameter>
</node>
```

**tDBOutput Action Semantics**:
- **NONE**: No DDL, data only
- **CREATE**: Create table (fails if exists)
- **CREATE_IF_NOT_EXISTS**: Create if not present
- **TRUNCATE_AND_INSERT**: TRUNCATE + INSERT
- **INSERT**: Direct INSERT (no duplicates checking)
- **UPDATE**: Update existing rows (requires key matching)
- **DELETE**: Delete matching rows (requires key matching)

### 4.2 Snowflake-Specific Components

**tSnowflakeInput**:
```xml
<node name="tSnowflakeInput_1" type="tSnowflakeInput">
  <elementParameter name="CONNECTION" value="Snowflake_Connection"/>
  <elementParameter name="DATABASE" value="ANALYTICS_DB"/>
  <elementParameter name="SCHEMA" value="PUBLIC"/>
  <elementParameter name="TABLE_NAME" value="SOURCE_TABLE"/>
  <elementParameter name="SQL_QUERY" value="SELECT * FROM SOURCE_TABLE WHERE YEAR = YEAR(CURRENT_DATE())"/>
</node>
```

**tSnowflakeOutput**:
```xml
<node name="tSnowflakeOutput_1" type="tSnowflakeOutput">
  <elementParameter name="CONNECTION" value="Snowflake_Connection"/>
  <elementParameter name="DATABASE" value="ANALYTICS_DB"/>
  <elementParameter name="SCHEMA" value="PUBLIC"/>
  <elementParameter name="TABLE_NAME" value="TARGET_TABLE"/>
  <elementParameter name="ACTION_ON_TABLE" value="INSERT"/>
</node>
```

**Snowflake-Specific Features**:
- Native support for Snowflake warehouses
- COPY INTO optimization for large batch loads
- Micro-partitions visibility
- Query result cache awareness
- Dynamic warehouse scaling support

---

## 5. XML ITEM FILE STRUCTURE

### 5.1 Job Item File Anatomy

The *.item XML file is the absolute source of truth for job definition and contains:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<talendfile:ProcessType name="Parent_Job_Name" version="8.0">
  <!-- Job-level metadata -->
  <elementParameter name="JOB_NAME" value="Parent_Job_Name"/>
  <elementParameter name="JOB_VERSION" value="1.0"/>
  <elementParameter name="JOB_AUTHOR" value="Data Engineer"/>
  
  <!-- Context variables definition -->
  <context name="Default">
    <contextParameter name="db_host" value="prod-snowflake.us-east-1.compute.snowflakecomputing.com"/>
    <contextParameter name="db_port" value="443"/>
    <contextParameter name="target_schema" value="STG_ANALYTICS"/>
    <contextParameter name="target_table" value="CUSTOMER_MASTER"/>
    <contextParameter name="load_date" value="2024-01-15"/>
  </context>
  
  <!-- Job node definitions -->
  <node name="tFileInputDelimited_1" type="tFileInputDelimited">
    <elementParameter name="FILE_NAME" value="context:source_file_path"/>
    <elementParameter name="HEADER" value="1"/>
    <elementParameter name="LIMIT" value="-1"/>
    <elementParameter name="ENCODING" value="UTF-8"/>
    <elementParameter name="SCHEMA">
      <column name="ID" type="INTEGER" nullable="false"/>
      <column name="NAME" type="STRING" length="255"/>
      <column name="EMAIL" type="STRING" length="255"/>
      <column name="CREATED_AT" type="DATE" pattern="yyyy-MM-dd"/>
    </elementParameter>
  </node>
  
  <!-- Schema definitions -->
  <metadataTable name="input_schema">
    <column name="ID" type="INTEGER" nullable="false"/>
    <column name="NAME" type="STRING" length="255"/>
  </metadataTable>
  
  <!-- Connection definition -->
  <connection name="Snowflake_Connection" type="Snowflake">
    <parameter name="HOST" value="context:db_host"/>
    <parameter name="PORT" value="context:db_port"/>
    <parameter name="DATABASE" value="ANALYTICS"/>
    <parameter name="SCHEMA" value="context:target_schema"/>
    <parameter name="USER" value="talend_service"/>
    <parameter name="PASSWORD" encrypted="true" value="xxx"/>
    <parameter name="WAREHOUSE" value="COMPUTE_WH"/>
  </connection>
  
  <!-- Component links (data flow) -->
  <link name="tFileInputDelimited_1 -> tMap_1" source="tFileInputDelimited_1" target="tMap_1"/>
  <link name="tMap_1 -> tSnowflakeOutput_1" source="tMap_1" target="tSnowflakeOutput_1"/>
  
  <!-- Component execution trigger links -->
  <link name="tSnowflakeOutput_1 -> tSnowflakeCloseConnection_1" source="tSnowflakeOutput_1" target="tSnowflakeCloseConnection_1" trigger="onComponentOk"/>
</talendfile:ProcessType>
```

### 5.2 Schema Definition in XML

```xml
<!-- Inline schema definition -->
<elementParameter name="SCHEMA">
  <column name="CUSTOMER_ID" type="INTEGER" nullable="false" key="true"/>
  <column name="CUSTOMER_NAME" type="STRING" length="255" nullable="false"/>
  <column name="EMAIL" type="STRING" length="255" nullable="true"/>
  <column name="AMOUNT_DUE" type="DECIMAL" precision="10" scale="2" nullable="true"/>
  <column name="LAST_PURCHASE_DATE" type="DATE" pattern="yyyy-MM-dd" nullable="true"/>
  <column name="IS_ACTIVE" type="BOOLEAN" nullable="false" default="true"/>
  <column name="METADATA_JSON" type="OBJECT"/>
  <column name="RAW_BINARY_DATA" type="byte[]"/>
</elementParameter>

<!-- Reference to metadata schema -->
<elementParameter name="SCHEMA" value="ref:meta_customer_schema"/>
```

### 5.3 Component Configuration in XML

Every component's configuration is stored as nested elementParameter nodes:

```xml
<node name="tMap_1" type="tMap">
  <!-- Basic properties -->
  <elementParameter name="UNIQUE_NAME" value="tMap_1"/>
  <elementParameter name="VERSION" value="2.1"/>
  <elementParameter name="START_POINT" value="false"/>
  
  <!-- Input/Output schema configuration -->
  <elementParameter name="INPUT_SCHEMA" value="input_schema"/>
  <elementParameter name="MULTIPLE_SCHEMAS" value="true"/>
  
  <!-- Advanced settings -->
  <elementParameter name="ACTIVATE_ADVANCED_OPTIONS" value="true"/>
  <elementParameter name="MEMORY_MODE" value="memory"/>
  <elementParameter name="STORE_TEMP_DATA" value="false"/>
  
  <!-- Map expressions -->
  <elementParameter name="MAPPING_OPERATIONS">
    <mapping name="OUTPUT_ID" expression="row1.ID * 1000"/>
    <mapping name="FULL_NAME" expression="row1.FIRST_NAME + ' ' + row1.LAST_NAME"/>
    <mapping name="STATUS_FLAG" expression="row1.AMOUNT > 1000 ? 'HIGH' : 'LOW'"/>
  </elementParameter>
  
  <!-- Lookup configurations -->
  <elementParameter name="LOOKUP_REFERENCE" value="lookup_customer"/>
</node>
```

---

## 6. COMPONENT EXECUTION SEMANTICS

### 6.1 Row-by-Row Processing

Components in a linear flow execute in a synchronized pipeline:

```
Component_A (outputs 100 rows)
    ↓ [Row 1]
Component_B (processes Row 1)
    ↓ [Row 1]
Component_C (outputs Row 1 to Target)

Repeat for Rows 2-100
```

**Buffering Behavior**:
- Standard components: Row-by-row streaming (minimal buffer)
- Aggregate components: Collect all rows (full buffering)
- Sort components: Collect all rows before processing (full buffering)

### 6.2 Multiple Output Routing

The tMap component can route rows to different outputs based on conditions:

```
tMap_1 [Main Logic]
├─→ Output_Main (all rows matching main criteria)
├─→ Output_Rejected (rows where AMOUNT < 0)
└─→ Output_Warnings (rows where STATUS = 'PENDING')
```

**XML Configuration**:
```xml
<node name="tMap_1" type="tMap">
  <elementParameter name="OUTPUT_SCHEMAS">
    <schema name="main_output">
      <filter expression="true"/>  <!-- All rows by default -->
    </schema>
    <schema name="rejected_output">
      <filter expression="row1.AMOUNT < 0"/>  <!-- Conditional routing -->
    </schema>
    <schema name="warnings_output">
      <filter expression="row1.STATUS.equals('PENDING')"/>
    </schema>
  </elementParameter>
</node>
```

### 6.3 Error Handling Flow

Components support error output for row-level failures:

```
Component_Input [100 rows]
    ├─→ Normal Output [98 rows] → Processing
    └─→ Reject/Error Output [2 rows] → Log/Archive
```

**XML Configuration**:
```xml
<link name="tMap_1 -> tLogRow_1" source="tMap_1" target="tLogRow_1" connector="main"/>
<link name="tMap_1 -> tLogRow_Error" source="tMap_1" target="tLogRow_Error" connector="reject"/>
```

---

## 7. PERFORMANCE OPTIMIZATION PATTERNS

### 7.1 Memory-Efficient Component Sequencing

**Suboptimal Pattern**:
```
tDBInput → tSortRow (memory) → tUniqRow → tMap → tDBOutput
```
Issues: Sort in Talend uses heap memory, row-by-row processing overhead

**Optimized Pattern**:
```
tDBInput [ORDER BY + GROUP BY in SQL] → tAggregateSortedRow → tMap → tDBOutput
```
Benefits: Database handles sorting/aggregation, Talend receives pre-aggregated data

### 7.2 Lookup Table Optimization

**For Small Lookups** (< 1M rows):
```xml
<elementParameter name="LOOKUP_MODE" value="LOAD_AT_START"/>
<elementParameter name="STORE_TEMP_DATA" value="false"/>
```
All lookup data loaded to memory at job start

**For Large Lookups** (> 1M rows):
```xml
<elementParameter name="LOOKUP_MODE" value="READ_EACH_ROW"/>
<elementParameter name="STORE_TEMP_DATA" value="true"/>
<elementParameter name="TEMP_DIR" value="/mnt/talend_temp"/>
```
Lookup data spilled to disk, read on-demand for each row

### 7.3 Parallelization Patterns

**Partition-Based Parallelization**:
```
tPartitioner [splits by DEPARTMENT_ID]
├─→ Child_Job_1 [processes DEPT 1-3]
├─→ Child_Job_2 [processes DEPT 4-6]
└─→ Child_Job_3 [processes DEPT 7-10]
    └─→ tDepartitioner [merges results]
```

**Sequential Child Job Execution**:
```
Parent_Job
├─→ tRunJob (Child_1: Data validation)
├─→ tRunJob (Child_2: Data transformation)
└─→ tRunJob (Child_3: Data loading)
```

---

## 8. CONTEXT VARIABLES AND PARAMETERIZATION

**Context Definition** (in *.item):
```xml
<context name="Default">
  <contextParameter name="source_file_path" value="/data/input/customers.csv"/>
  <contextParameter name="target_table" value="CUSTOMER_STG"/>
  <contextParameter name="load_date" value="2024-01-15"/>
  <contextParameter name="batch_size" value="5000"/>
</context>

<context name="Production">
  <contextParameter name="source_file_path" value="s3://prod-bucket/input/customers.csv"/>
  <contextParameter name="target_table" value="CUSTOMER_PROD"/>
  <contextParameter name="load_date" value="context:CURRENT_DATE"/>
  <contextParameter name="batch_size" value="50000"/>
</context>
```

**Usage in Components**:
```xml
<elementParameter name="FILE_NAME" value="context:source_file_path"/>
<elementParameter name="TABLE_NAME" value="context:target_table"/>
```

**Global Variables** (accessible at runtime):
```java
// In any Java component
String batchId = (String) globalMap.get('batch_execution_id');
Integer processedRows = (Integer) globalMap.get('tFileInputDelimited_1_NB_LINE');
```

---

## APPENDIX A: TALEND DATA TYPES MAPPING

| Talend Type | Java Type | Snowflake Type | Size/Precision |
|-------------|-----------|----------------|-----------------|
| STRING | java.lang.String | VARCHAR | Length specified |
| INTEGER | java.lang.Integer | NUMBER(38,0) | 32-bit |
| LONG | java.lang.Long | NUMBER(38,0) | 64-bit |
| DOUBLE | java.lang.Double | DOUBLE PRECISION | IEEE 754 |
| DECIMAL | java.math.BigDecimal | DECIMAL(p,s) | p=precision, s=scale |
| DATE | java.util.Date | DATE | Pattern: yyyy-MM-dd |
| TIMESTAMP | java.util.Date | TIMESTAMP | Pattern: yyyy-MM-dd HH:mm:ss |
| BOOLEAN | java.lang.Boolean | BOOLEAN | true/false |
| byte[] | byte[] | BINARY | Raw bytes |
| OBJECT | java.lang.Object | VARIANT | Semi-structured |

---

## APPENDIX B: CRITICAL WARNINGS

1. **DO NOT edit generated Java code directly** - Always use component properties or routines
2. **Always validate *.item XML** - This is the source of truth, UI can lag
3. **Memory leaks in tJavaFlex** - Clear globalMap state in END_CODE section
4. **Case sensitivity in tUniqRow** - Verify expected behavior per business requirements
5. **Lookup key duplicates** - Result undefined if lookup key not unique (use GROUP BY in source)
6. **Schema evolution** - Propagate schema changes throughout all linked components

---

**End of Document**
