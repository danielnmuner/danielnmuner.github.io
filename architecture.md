# Black Box Intermediate Models Pattern

## SQL Transformation Validation Framework for Talend to Snowflake Migrations

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Phase 1: Static Analysis](#phase-1-static-analysis)
4. [Phase 2: Dynamic View Creation](#phase-2-dynamic-view-creation)
5. [Phase 3: Metadata Extraction](#phase-3-metadata-extraction)
6. [Phase 4: Schema Validation](#phase-4-schema-validation)
7. [Phase 5: Data Reconciliation](#phase-5-data-reconciliation)
8. [Technology Stack](#technology-stack)
9. [Implementation Examples](#implementation-examples)
10. [Best Practices](#best-practices)

---

## Overview

Framework for validating SQL transformations through intermediate models, specifically designed for Talend to Snowflake migrations with low data volumes (approximately 100 rows).

This pattern enables systematic validation of each transformation step by materializing CTEs as independent VIEWs, extracting execution metrics, validating schemas, and comparing results against reference data.

---

## Architecture Diagram

See [diagram.md](./diagram.md) for the complete Mermaid diagram.

---

## Phase 1: Static Analysis

### Purpose
Parse SQL to extract CTE dependencies and validate logical structure.

### Tools
- **sqlglot**: Extract CTE dependencies and build DAG
- **SYSTEM$EXPLAIN_PLAN_JSON**: Validate SQL logic hasn't changed

### Implementation

```python
import sqlglot
from sqlglot import exp

sql_complete = """
WITH cte_filter AS (
    SELECT * FROM raw_orders WHERE order_id IS NOT NULL
),
cte_enrich AS (
    SELECT o.*, c.region FROM cte_filter o
    LEFT JOIN customers c ON o.customer_id = c.customer_id
),
cte_final AS (
    SELECT * FROM cte_enrich WHERE region IS NOT NULL
)
SELECT * FROM cte_final
"""

ast = sqlglot.parse_one(sql_complete)
ctes_metadata = {}

for with_clause in ast.find_all(exp.CTE):
    cte_name = with_clause.alias
    cte_sql = with_clause.this.sql()
    
    dependencies = set()
    for table in with_clause.this.find_all(exp.Table):
        dependencies.add(table.name)
    
    ctes_metadata[cte_name] = {
        'sql': cte_sql,
        'dependencies': list(dependencies)
    }
```

---

## Phase 2: Dynamic View Creation

### Purpose
Create independent VIEWs for each CTE to enable isolated testing and validation.

### Approach
- Parse CTEs using sqlglot
- Resolve dependencies with topological sort
- Create VIEWs in dependency order

### Implementation

```python
def create_intermediate_views(sql_complete, schema='INT'):
    conn = snowflake.connector.connect(...)
    cursor = conn.cursor()
    
    ast = sqlglot.parse_one(sql_complete)
    ctes_metadata = {}
    
    for with_clause in ast.find_all(exp.CTE):
        cte_name = with_clause.alias
        cte_sql = with_clause.this.sql()
        dependencies = extract_dependencies(with_clause)
        
        ctes_metadata[cte_name] = {
            'sql': cte_sql,
            'dependencies': list(dependencies)
        }
    
    sorted_ctes = topological_sort(ctes_metadata)
    
    for cte_name in sorted_ctes:
        view_name = f"VW_{cte_name}".upper()
        sql_create = f"""
        CREATE OR REPLACE VIEW {schema}.{view_name} AS
        {ctes_metadata[cte_name]['sql']}
        """
        cursor.execute(sql_create)
    
    return sorted_ctes
```

---

## Phase 3: Metadata Extraction

### Purpose
Extract execution metrics to detect data loss or unexpected transformations.

### Tool
- **GET_QUERY_OPERATOR_STATS**: Extract INPUT_ROWS and OUTPUT_ROWS per operator

### Implementation

```python
def extract_operator_metrics(query_sql):
    conn = snowflake.connector.connect(...)
    cursor = conn.cursor()
    
    cursor.execute(query_sql)
    query_id = cursor.sfqid
    
    cursor.execute(f"SELECT * FROM TABLE(GET_QUERY_OPERATOR_STATS('{query_id}'))")
    stats = cursor.fetchall()
    
    metrics = {
        'query_id': query_id,
        'operators': []
    }
    
    for row in stats:
        metrics['operators'].append({
            'operator_id': row[0],
            'operator_type': row[1],
            'input_rows': row[2],
            'output_rows': row[3],
            'execution_time_ms': row[4]
        })
    
    audit = []
    for op in metrics['operators']:
        if op['input_rows'] > 0:
            loss_pct = (op['input_rows'] - op['output_rows']) / op['input_rows']
            if loss_pct > 0.5:
                audit.append({
                    'severity': 'WARNING',
                    'operator': op['operator_type'],
                    'message': f"Row loss: {loss_pct*100:.1f}%"
                })
    
    metrics['audit'] = audit
    return metrics
```

---

## Phase 4: Schema Validation

### Purpose
Validate data types, constraints, and nullable rules.

### Tool
- **Pandera**: Define and validate DataFrame schemas

### Implementation

```python
import pandas as pd
import pandera as pa
from pandera.typing import Series

class OrderSchema(pa.DataFrameModel):
    order_id: Series[int] = pa.Field(unique=True, ge=1)
    customer_id: Series[int] = pa.Field(nullable=False)
    amount: Series[float] = pa.Field(ge=0, nullable=False)
    region: Series[str] = pa.Field(nullable=False, str_length={'min': 2})
    status: Series[str] = pa.Field(isin=['ACTIVE', 'INACTIVE', 'PENDING'])

cursor = conn.cursor()
cursor.execute("SELECT * FROM INT.VW_FINAL_ORDERS")
df_snowflake = cursor.fetch_pandas_all()

try:
    OrderSchema.validate(df_snowflake)
    print("Schema validation: PASS")
except pa.errors.SchemaError as e:
    print(f"Schema validation: FAIL - {e}")
```

---

## Phase 5: Data Reconciliation

### Purpose
Compare Snowflake results against Talend reference output row-by-row.

### Tool
- **Pandas**: DataFrame comparison

### Implementation

```python
import pandas as pd
from datetime import datetime

df_expected = pd.read_csv('talend_expected_output.csv')

cursor = conn.cursor()
cursor.execute("SELECT * FROM DWH.VW_FINAL_TABLE")
df_actual = cursor.fetch_pandas_all()

def compare_dataframes(df_expected, df_actual):
    report = {
        'timestamp': datetime.now().isoformat(),
        'status': 'PASS',
        'errors': [],
        'warnings': []
    }
    
    cols_expected = set(df_expected.columns)
    cols_actual = set(df_actual.columns)
    
    if cols_expected != cols_actual:
        report['status'] = 'FAIL'
        report['errors'].append({
            'type': 'COLUMN_MISMATCH',
            'missing': list(cols_expected - cols_actual),
            'extra': list(cols_actual - cols_expected)
        })
        return report
    
    if len(df_expected) != len(df_actual):
        report['status'] = 'FAIL'
        report['errors'].append({
            'type': 'ROW_COUNT_MISMATCH',
            'expected_rows': len(df_expected),
            'actual_rows': len(df_actual)
        })
        return report
    
    df_expected_sorted = df_expected.sort_values(by='order_id').reset_index(drop=True)
    df_actual_sorted = df_actual.sort_values(by='order_id').reset_index(drop=True)
    
    comparison = df_expected_sorted.compare(df_actual_sorted, keep_shape=True)
    
    if not comparison.empty:
        report['status'] = 'FAIL'
        differences = []
        for idx in comparison.index[:10]:
            differences.append({
                'row': idx,
                'differences': comparison.loc[idx].to_dict()
            })
        report['errors'].append({
            'type': 'VALUE_MISMATCH',
            'count': len(comparison),
            'samples': differences
        })
    
    return report

result = compare_dataframes(df_expected, df_actual)

import json
with open('validation_report.json', 'w') as f:
    json.dump(result, f, indent=2)
```

---

## Technology Stack

| Tool | Purpose | Required |
|------|---------|----------|
| sqlglot | Parse SQL and extract dependencies | Yes |
| SYSTEM$EXPLAIN_PLAN_JSON | Validate SQL logic has not changed | Yes |
| Python + Snowflake Connector | Create VIEWs dynamically | Yes |
| GET_QUERY_OPERATOR_STATS | Extract metrics from each operator | Yes |
| Pandera | Validate schema and types | Yes |
| Pandas | Compare DataFrames | Yes |

---

## Implementation Examples

### Complete Validation Script

```python
#!/usr/bin/env python3
import argparse
import json
import logging
from datetime import datetime

import snowflake.connector
import pandas as pd
import sqlglot
import pandera as pa

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--sql', required=True)
    parser.add_argument('--csv', required=True)
    parser.add_argument('--schema', default='INT_VALIDATION')
    args = parser.parse_args()
    
    with open(args.sql, 'r') as f:
        sql = f.read()
    
    conn = snowflake.connector.connect(
        user='your_user',
        password='your_password',
        account='your_account',
        warehouse='COMPUTE_WH',
        database='ANALYTICS'
    )
    
    try:
        analyzer = SQLAnalyzer(conn)
        ctes = analyzer.parse_ctes(sql)
        
        builder = ViewBuilder(conn, args.schema)
        builder.create_schema()
        views = builder.create_from_ctes(ctes)
        
        extractor = MetricsExtractor(conn)
        cursor = conn.cursor()
        cursor.execute("SELECT LAST_QUERY_ID()")
        query_id = cursor.fetchone()[0]
        metrics = extractor.get_operator_stats(query_id)
        
        df_expected = pd.read_csv(args.csv)
        df_actual = get_dataframe_from_view(conn, views[list(views.keys())[-1]])
        
        comparison_report = CSVComparator.compare(df_expected, df_actual)
        
        report_path = f"validation_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(report_path, 'w') as f:
            json.dump({
                'ctes': ctes,
                'metrics': metrics,
                'comparison': comparison_report
            }, f, indent=2)
        
        logger.info(f"Report saved: {report_path}")
        logger.info(f"Final Status: {comparison_report['status']}")
        
    finally:
        conn.close()

if __name__ == '__main__':
    main()
```

### Usage

```bash
pip install snowflake-connector-python sqlglot pandera pandas

python validate_transformations.py \
    --sql my_query.sql \
    --csv talend_expected.csv \
    --schema INT_VALIDATION
```

---

## Best Practices

1. **Start Small**: Validate one layer (e.g., Landing) before scaling
2. **Save Baselines**: Store EXPLAIN_PLAN_JSON output for change detection
3. **Automate After Success**: Integrate into Airflow/Lambda after manual validation succeeds
4. **Set Up Alerts**: Alert when validation_report.status == 'FAIL'
5. **Document CTEs**: Add comments explaining each CTE's purpose and dependencies
6. **Monitor Metrics**: Track INPUT_ROWS vs OUTPUT_ROWS trends over time
7. **Version Control**: Keep SQL files and validation scripts in git
8. **Test Incremental**: Validate each phase independently before full integration

---

## Design Principles

### Isolation
Each CTE is materialized as an independent VIEW, enabling independent testing, isolated debugging, and reusable intermediate results.

### Observability
Metrics captured at each transformation step: INPUT_ROWS vs OUTPUT_ROWS tracking, execution time per operator, and complete audit trail generation.

### Idempotency
Repeatable validation through CREATE OR REPLACE for VIEWs, deterministic query execution, and consistent data sources.

### Audit Trail
Full lineage tracking includes all query executions logged, validation reports stored, and schema changes documented.

---

## Network Topologies

- **DAG**: CTE dependencies form a directed acyclic graph
- **Pipeline**: Five sequential validation stages
- **Fan-out**: Multiple CTEs created from single source table
- **Fan-in**: Multiple VIEWs consolidated into single validation result
