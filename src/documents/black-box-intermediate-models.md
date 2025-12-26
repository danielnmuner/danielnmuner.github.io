# Black Box Intermediate Models Pattern

![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Snowflake](https://img.shields.io/badge/snowflake-required-29B5E8.svg)
![sqlglot](https://img.shields.io/badge/sqlglot-latest-orange.svg)
![Pandera](https://img.shields.io/badge/pandera-0.17+-green.svg)

## Overview

When migrating Talend ETL jobs to Snowflake, the fundamental challenge isn't rewriting SQL—it's proving your transformations produce identical results while maintaining full observability. The Black Box Intermediate Models pattern decomposes monolithic CTE chains into isolated, testable VIEWs. Each transformation step becomes transparent: `SYSTEM$EXPLAIN_PLAN_JSON` creates an immutable execution plan registry for change detection, `CREATE OR REPLACE VIEW` materializes each CTE as an independent VIEW, `GET_QUERY_OPERATOR_STATS` captures INPUT_ROWS and OUTPUT_ROWS at every operator to trace data flow point-to-point, Pandera's `DataFrameModel` validates schemas in cascade, and Pandas `DataFrame.compare()` reconciles row-level differences. This architecture transforms opaque SQL into a fully observable, auditable validation pipeline.

---

## Architecture: Isolation + Observability + Audit Trail

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    INPUT("SQL with CTEs")
    P1("sqlglot DAG")
    P1B("EXPLAIN_PLAN_JSON Registry")
    P2("CREATE VIEWs")
    P3("GET_OPERATOR_STATS")
    P4("Pandera Validation")
    P5("DataFrame.compare")
    OUTPUT("PASS/FAIL + Audit")
    
    INPUT e1@--> P1
    P1 e2@--> P1B
    P1B e3@--> P2
    P2 e4@--> P3
    P3 e5@--> P4
    P4 e6@--> P5
    P5 e7@--> OUTPUT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef ioStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef registryStyle fill:#e91e63,stroke:#e91e63,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class P1,P2,P3,P4,P5 flowStyle
    class INPUT,OUTPUT ioStyle
    class P1B registryStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
```

---

## Validation Pipeline

| Phase | Snowflake Function | Purpose | Output |
|-------|-------------------|---------|--------|
| **1. Parse** | `sqlglot.parse_one()` | Extract CTE dependency graph | DAG with execution order |
| **2. Registry** | `SYSTEM$EXPLAIN_PLAN_JSON` | Capture execution plan baseline | Immutable plan for change detection |
| **3. Isolate** | `CREATE OR REPLACE VIEW` | Materialize each CTE as VIEW | Independent testable components |
| **4. Trace** | `GET_QUERY_OPERATOR_STATS` | Track INPUT_ROWS → OUTPUT_ROWS | Point-to-point data lineage |
| **5. Validate** | `pa.DataFrameModel.validate()` | Enforce schema constraints | Type/constraint violations |
| **6. Reconcile** | `df.compare(keep_shape=True)` | Row-level diff vs reference | Mismatch report with samples |

---

## Phase 1: Dependency Analysis with sqlglot

**Why:** CTEs have implicit dependencies. A CTE referencing another CTE must execute after its dependency. Without topological sorting, VIEW creation fails.

**How:** `sqlglot.parse_one(sql)` parses SQL into AST. `ast.find_all(exp.CTE)` extracts CTE nodes. For each CTE, `with_clause.this.find_all(exp.Table)` identifies table references. Build dependency dict `{cte_name: [dependency1, dependency2]}`. Apply `toposort_flatten()` to get execution order.

**Output:** Ordered list of CTEs ready for sequential VIEW creation.

---

## Phase 2: Execution Plan Registry with SYSTEM$EXPLAIN_PLAN_JSON

**Why:** SQL rewrites can silently change logic. Without a baseline, you can't detect if a refactor altered the execution plan.

**How:** For each CTE, execute `SELECT SYSTEM$EXPLAIN_PLAN_JSON('SELECT * FROM {cte_sql}')`. Store the JSON execution plan with timestamp and CTE name. On subsequent runs, compare new plan against baseline. Flag differences as potential logic changes.

**Output:** Immutable registry of execution plans. Enables change detection across migration iterations.

---

## Phase 3: VIEW Isolation with CREATE OR REPLACE VIEW

**Why:** Monolithic CTEs are untestable. Materializing each CTE as a VIEW enables independent validation, debugging, and reuse.

**How:** For each CTE in topological order, execute `CREATE OR REPLACE VIEW schema.VW_{cte_name} AS {cte_sql}` via `cursor.execute()`. Use schema prefix (e.g., `INT_VALIDATION`) to separate validation VIEWs from production. Idempotent execution allows reruns without cleanup.

**Output:** One VIEW per CTE. Each VIEW can be queried independently: `SELECT * FROM INT_VALIDATION.VW_cte_filter`.

---

## Phase 4: Point-to-Point Tracing with GET_QUERY_OPERATOR_STATS

**Why:** Data loss is invisible without operator-level metrics. A JOIN might drop 50% of rows silently. You need INPUT_ROWS and OUTPUT_ROWS per operator to trace data flow.

**How:** Execute `SELECT * FROM VW_final` and capture `cursor.sfqid` (Snowflake query ID). Query `SELECT * FROM TABLE(GET_QUERY_OPERATOR_STATS('{query_id}'))` to retrieve metrics for each operator (JOIN, FILTER, AGGREGATE). Extract `INPUT_ROWS`, `OUTPUT_ROWS`, `execution_time_ms`. Calculate row delta: `(INPUT_ROWS - OUTPUT_ROWS) / INPUT_ROWS`. Alert if delta exceeds threshold (e.g., 50% loss).

**Output:** Per-operator audit trail. Example: `{"operator": "JOIN", "input": 1000, "output": 500, "loss_pct": 50}`.

---

## Phase 5: Cascade Schema Validation with Pandera

**Why:** Type mismatches break downstream transformations. A column changing from INT to VARCHAR causes silent failures. Schema validation must happen before reconciliation.

**How:** Define expected schema: `class OrderSchema(pa.DataFrameModel): order_id: Series[int] = pa.Field(unique=True, ge=1)`. Load Snowflake VIEW data: `df = cursor.fetch_pandas_all()`. Validate: `OrderSchema.validate(df)`. Pandera raises `SchemaError` with details on type mismatches, constraint violations, or nullable rule breaks. Cascade validation: validate each VIEW sequentially from source to final.

**Output:** Schema validation report. PASS if all constraints met, FAIL with violation details otherwise.

---

## Phase 6: Row-Level Reconciliation with Pandas

**Why:** Schema validation confirms structure, but not values. A transformation might produce correct types but wrong calculations. Row-level diff is the final proof.

**How:** Load Talend reference: `df_expected = pd.read_csv('talend_output.csv')`. Load Snowflake result: `df_actual = cursor.fetch_pandas_all()`. Compare column sets: `set(df_expected.columns) == set(df_actual.columns)`. Compare row counts: `len(df_expected) == len(df_actual)`. Row-level diff: `diff = df_expected.compare(df_actual, keep_shape=True)`. Extract mismatches: `diff.index.tolist()` and `diff.to_dict('records')`.

**Output:** JSON report with status (PASS/FAIL), row count delta, column mismatches, and sample diffs (first 5 rows).

---

## Observability: Metrics, Alerts, Audit

**Metrics Captured:**
- **CTE-level:** VIEW creation timestamp, row count per VIEW, execution time
- **Operator-level:** INPUT_ROWS, OUTPUT_ROWS, execution_time_ms per JOIN/FILTER/AGGREGATE
- **Schema-level:** Type mismatches, constraint violations, null counts
- **Reconciliation-level:** Row count delta, column mismatches, value diffs

**Alerting Triggers:**
- Row loss >50% in any operator (data loss detection)
- Schema validation FAIL (type/constraint violation)
- Column set mismatch (structure change)
- Row count delta >0 (missing/extra rows)
- Value comparison FAIL (calculation error)

**Audit Trail:**
- All query IDs logged with timestamps
- All EXPLAIN_PLAN_JSON baselines versioned
- All VIEW DDL statements captured
- All validation reports stored with run metadata
- Full lineage: source CTE → VIEW → operator metrics → schema validation → reconciliation

---

## Design Principles

**Isolation:** Each CTE as independent VIEW. Test transformations in isolation without running full pipeline.

**Observability:** Metrics at every layer. No black boxes. INPUT_ROWS → OUTPUT_ROWS tracing reveals data flow.

**Idempotency:** `CREATE OR REPLACE VIEW` allows reruns. No manual cleanup required.

**Audit Trail:** Immutable execution plan registry + query ID logging + timestamped reports = full lineage.
