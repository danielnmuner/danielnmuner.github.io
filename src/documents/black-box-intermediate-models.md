---
title: "Black Box Intermediate Models Pattern"
category: "Architecture"
date: "2025-12-25"
topologies: ["dag", "pipeline", "fan-out", "fan-in"]
principles: ["isolation", "observability", "idempotency", "audit-trail"]
tags: ["sql-validation", "snowflake", "talend-migration", "data-quality"]
description: "SQL transformation validation framework for Talend-to-Snowflake migrations with observability-first design"
---

# Black Box Intermediate Models Pattern

![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Snowflake](https://img.shields.io/badge/snowflake-required-29B5E8.svg)
![sqlglot](https://img.shields.io/badge/sqlglot-latest-orange.svg)
![Pandera](https://img.shields.io/badge/pandera-0.17+-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Overview

SQL transformation validation framework for Talend-to-Snowflake migrations. Materializes CTEs as Snowflake VIEWs, extracts operator-level metrics via `GET_QUERY_OPERATOR_STATS`, validates schemas with Pandera, and reconciles against reference data.

**Target:** Low-volume migrations (~100 rows) requiring full observability.

---

## Key Decisions

**Why intermediate VIEWs?** Isolation enables independent testing. Each CTE becomes a materialized VIEW with full lineage.

**Why sqlglot?** Parse CTEs, extract dependencies, build DAG. Alternative: manual parsing (error-prone).

**Why GET_QUERY_OPERATOR_STATS?** Snowflake native. Captures INPUT_ROWS/OUTPUT_ROWS per operator. Detects data loss at transformation level.

**Why Pandera over dbt tests?** Type-safe schema validation. DataFrameModel pattern enforces constraints in Python. Faster feedback than SQL-based tests.

**Why Pandas DataFrame.compare?** Row-level diff with column alignment. Alternative: SQL EXCEPT (slower, less granular).

---

## Requirements

| Component | Version | Purpose |
|-----------|---------|---------||
| Python | 3.8+ | Runtime |
| snowflake-connector-python | latest | Snowflake API |
| sqlglot | latest | SQL parsing |
| pandas | 1.3+ | DataFrame operations |
| pandera | 0.17+ | Schema validation |
| Snowflake | Enterprise+ | GET_QUERY_OPERATOR_STATS access |

---

## Architecture

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    INPUT("CTEs SQL")
    P1("sqlglot AST")
    P2("Snowflake VIEWs")
    P3("Operator Metrics")
    P4("Schema Validation")
    P5("Reconciliation")
    OUTPUT("PASS/FAIL Report")
    
    INPUT e1@--> P1
    P1 e2@--> P2
    P2 e3@--> P3
    P3 e4@--> P4
    P4 e5@--> P5
    P5 e6@--> OUTPUT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef ioStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class P1,P2,P3,P4,P5 flowStyle
    class INPUT,OUTPUT ioStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
```

---

## Phase 1: Static Analysis with sqlglot

**Input:** SQL file with WITH clauses  
**Output:** CTE dependency DAG + metadata dict

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("SQL FILE →")
    P1A("sqlglot.parse_one")
    P1B("exp.CTE.find_all")
    P1C("exp.Table dependencies")
    P1D("Build DAG")
    NEXT("→ MATERIALIZATION")
    
    PREV e1@--> P1A
    P1A e2@--> P1B
    P1B e3@--> P1C
    P1C e4@--> P1D
    P1D e5@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class P1A,P1B,P1C,P1D flowStyle
    class PREV,NEXT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
```

**Key API:** `ast.find_all(exp.CTE)` extracts CTE nodes. `with_clause.this.find_all(exp.Table)` gets dependencies.

---

## Phase 2: VIEW Materialization with Topological Sort

**Input:** CTE DAG  
**Output:** Snowflake VIEWs (one per CTE) in dependency order

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("DAG →")
    P2A("toposort_flatten")
    P2B("CREATE OR REPLACE VIEW")
    P2C("cursor.execute DDL")
    P2D("SHOW VIEWS validation")
    NEXT("→ OBSERVABILITY")
    
    PREV e1@--> P2A
    P2A e2@--> P2B
    P2B e3@--> P2C
    P2C e4@--> P2D
    P2D e5@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class P2A,P2B,P2C,P2D flowStyle
    class PREV,NEXT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
```

**Key Pattern:** `CREATE OR REPLACE VIEW schema.VW_{cte_name} AS {cte_sql}`. Idempotent execution.

---

## Phase 3: Observability with GET_QUERY_OPERATOR_STATS

**Input:** Query execution  
**Output:** Operator metrics (INPUT_ROWS, OUTPUT_ROWS, execution_time_ms)

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("VIEWs →")
    P3A("SELECT * FROM VW")
    P3B("cursor.sfqid")
    P3C("GET_QUERY_OPERATOR_STATS")
    P3D("Extract metrics")
    P3E("Detect row loss >50%")
    NEXT("→ SCHEMA")
    
    PREV e1@--> P3A
    P3A e2@--> P3B
    P3B e3@--> P3C
    P3C e4@--> P3D
    P3D e5@--> P3E
    P3E e6@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class P3A,P3B,P3C,P3D,P3E flowStyle
    class PREV,NEXT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
```

**Critical:** `TABLE(GET_QUERY_OPERATOR_STATS(query_id))` returns per-operator metrics. Compare INPUT_ROWS vs OUTPUT_ROWS to detect transformations causing data loss.

---

## Phase 4: Schema Validation with Pandera

**Input:** Snowflake result DataFrame  
**Output:** Schema validation report (PASS/FAIL)

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("METRICS →")
    P4A("DataFrameModel definition")
    P4B("cursor.fetch_pandas_all")
    P4C("pa.Field type checks")
    P4D("pa.Field constraints")
    P4E("pa.Field nullable rules")
    NEXT("→ RECONCILIATION")
    
    PREV e1@--> P4A
    P4A e2@--> P4B
    P4B e3@--> P4C
    P4B e4@--> P4D
    P4B e5@--> P4E
    P4C e6@--> NEXT
    P4D e7@--> NEXT
    P4E e8@--> NEXT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class P4A,P4B,P4C,P4D,P4E flowStyle
    class PREV,NEXT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
```

**Pattern:** Define `class SchemaModel(pa.DataFrameModel)` with typed `Series[int]`, `pa.Field(ge=0, unique=True)` constraints. Call `SchemaModel.validate(df)` to enforce.

---

## Phase 5: Data Reconciliation with Pandas

**Input:** Talend CSV reference + Snowflake result  
**Output:** Row-level diff report (JSON)

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'primaryColor':'#3498db','primaryTextColor':'#ffffff','primaryBorderColor':'#3498db','lineColor':'#3498db','secondaryColor':'#3498db','tertiaryColor':'#3498db','background':'#ffffff','mainBkg':'#ffffff','secondBkg':'#ffffff','tertiaryBkg':'#ffffff'}}}%%
flowchart LR
    PREV("SCHEMA VALID →")
    P5A("pd.read_csv Talend")
    P5B("fetch_pandas_all SF")
    P5C("Column set comparison")
    P5D("len df check")
    P5E("df.compare row-by-row")
    P5F("JSON report")
    OUTPUT("PASS/FAIL + samples")
    
    PREV e1@--> P5A
    PREV e2@--> P5B
    P5A e3@--> P5C
    P5B e4@--> P5C
    P5C e5@--> P5D
    P5D e6@--> P5E
    P5E e7@--> P5F
    P5F e8@--> OUTPUT

    classDef flowStyle fill:#3498db,stroke:#3498db,stroke-width:2px,color:#ffffff,rx:10,ry:10
    classDef prevNextStyle fill:#009688,stroke:#009688,stroke-width:2px,color:#ffffff,rx:10,ry:10
    
    class P5A,P5B,P5C,P5D,P5E,P5F flowStyle
    class PREV,OUTPUT prevNextStyle
    
    e1@{ animate: true }
    e2@{ animate: true }
    e3@{ animate: true }
    e4@{ animate: true }
    e5@{ animate: true }
    e6@{ animate: true }
    e7@{ animate: true }
    e8@{ animate: true }
```

**Key API:** `df_expected.compare(df_actual, keep_shape=True)` returns diff DataFrame. Extract mismatches with `.index` and `.to_dict('records')`.

---

## Observability Focus

**Metrics Captured:**
- CTE-level: VIEW creation timestamp, row count per VIEW
- Operator-level: INPUT_ROWS, OUTPUT_ROWS, execution_time_ms per operator
- Schema-level: Type mismatches, constraint violations, null counts
- Reconciliation-level: Row count delta, column mismatches, value diffs

**Alerting Triggers:**
- Row loss > 50% in any operator
- Schema validation FAIL
- Column mismatch between expected/actual
- Row count delta > 0
- Value comparison FAIL

**Audit Trail:**
- All query IDs logged
- All validation reports timestamped and stored
- All VIEW DDL statements captured
- Full lineage from source CTE to final result

---

## Network Topologies

**DAG:** CTE dependencies as directed acyclic graph. `toposort_flatten` resolves execution order.

**Pipeline:** 5-phase sequential flow. Each phase produces artifacts consumed by next.

**Fan-out:** Phase 4 (schema validation) runs 3 parallel checks. Phase 5 loads 2 data sources in parallel.

**Fan-in:** Phase 5 converges Talend + Snowflake data into single comparison.
