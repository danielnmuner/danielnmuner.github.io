import Container from '../components/layout/Container'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'

const BlackBoxDocument = () => {
  const downloadArchitecture = async () => {
    try {
      const response = await fetch('/architecture.md')
      const markdown = await response.text()
      const blob = new Blob([markdown], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'black-box-intermediate-models.md'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading architecture:', error)
    }
  }

  const OLD_generateMarkdown = () => {
    return `---
title: "Black Box Intermediate Models Pattern"
category: "Architecture"
date: "2025-12-25"
topologies: ["dag", "pipeline", "fan-out", "fan-in"]
principles: ["isolation", "observability", "idempotency", "audit-trail"]
tags: ["sql-validation", "snowflake", "talend-migration", "data-quality"]
description: "Framework for SQL transformation validation with intermediate models for Talend to Snowflake migrations"
---

# Black Box Intermediate Models Pattern

## Overview

Framework for validating SQL transformations through intermediate models, specifically designed for Talend to Snowflake migrations with low data volumes (approximately 100 rows).

## Architecture Diagram

\`\`\`mermaid
graph TB
    subgraph ARQUITECTURA["ARCHITECTURE: Black Box Intermediate Models Pattern"]
        direction TB
        Input["INPUT: SQL file with CTEs"]
        
        subgraph PHASE1["PHASE 1: Static Analysis Layer"]
            direction LR
            P1A["sqlglot.parse_one<br/>Extract CTE dependencies<br/>Build DAG<br/>Generate dependency graph"]
        end
        
        subgraph PHASE2["PHASE 2: Materialization Layer"]
            direction TB
            P2A["Topological Sort<br/>Resolve CTE dependencies"]
            P2B["CREATE OR REPLACE VIEW<br/>One view per CTE<br/>Snowflake DDL execution"]
        end
        
        subgraph PHASE3["PHASE 3: Observability Layer"]
            direction TB
            P3A["Execute final query<br/>LAST_QUERY_ID"]
            P3B["GET_QUERY_OPERATOR_STATS<br/>Extract INPUT_ROWS<br/>Extract OUTPUT_ROWS<br/>Per operator metrics"]
            P3C["Audit trail generation<br/>Row loss detection<br/>Performance profiling"]
        end
        
        subgraph PHASE4["PHASE 4: Schema Validation Layer"]
            direction TB
            P4A["Pandera DataFrameModel<br/>Define expected schema"]
            P4B["Schema.validate<br/>Type checking<br/>Constraint validation<br/>Nullable rules"]
        end
        
        subgraph PHASE5["PHASE 5: Data Reconciliation Layer"]
            direction TB
            P5A["pandas.read_csv<br/>Load Talend reference"]
            P5B["cursor.fetch_pandas_all<br/>Load Snowflake result"]
            P5C["DataFrame.compare<br/>Row-by-row diff<br/>Column-by-column comparison"]
        end
        
        Output["OUTPUT: validation_report.json<br/>Status: PASS or FAIL"]
    end
    
    Input --> PHASE1
    P1A --> P2A
    P2A --> P2B
    P2B --> PHASE3
    P3A --> P3B
    P3B --> P3C
    P3C --> PHASE4
    P4A --> P4B
    P4B --> PHASE5
    P5A --> P5C
    P5B --> P5C
    P5C --> Output
\`\`\`

## Design Principles Applied

### Isolation
Each CTE is materialized as an independent VIEW, enabling independent testing, isolated debugging, and reusable intermediate results.

### Observability
Metrics captured at each transformation step: INPUT_ROWS vs OUTPUT_ROWS tracking, execution time per operator, and complete audit trail generation.

### Idempotency
Repeatable validation through CREATE OR REPLACE for VIEWs, deterministic query execution, and consistent data sources.

### Audit Trail
Full lineage tracking includes all query executions logged, validation reports stored, and schema changes documented.

## Network Topologies Used

- **DAG**: CTE dependencies form a directed acyclic graph
- **Pipeline**: Five sequential validation stages
- **Fan-out**: Multiple CTEs created from single source table
- **Fan-in**: Multiple VIEWs consolidated into single validation result

## Technology Stack

| Tool | Purpose | Required |
|------|---------|----------|
| sqlglot | Parse SQL and extract dependencies | Yes |
| SYSTEM$EXPLAIN_PLAN_JSON | Validate SQL logic has not changed | Yes |
| Python + Snowflake Connector | Create VIEWs dynamically | Yes |
| GET_QUERY_OPERATOR_STATS | Extract metrics from each operator | Yes |
| Pandera | Validate schema and types | Yes |
| Pandas | Compare DataFrames | Yes |

## Implementation Example

\`\`\`python
import sqlglot
from sqlglot import exp

sql_completo = """
WITH cte_filtro AS (
    SELECT * FROM raw_orders WHERE order_id IS NOT NULL
),
cte_enrich AS (
    SELECT o.*, c.region FROM cte_filtro o
    LEFT JOIN customers c ON o.customer_id = c.customer_id
),
cte_final AS (
    SELECT * FROM cte_enrich WHERE region IS NOT NULL
)
SELECT * FROM cte_final
"""

ast = sqlglot.parse_one(sql_completo)
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
\`\`\`

## Best Practices

1. Start with one layer (e.g., Landing) before scaling
2. Save baselines of EXPLAIN_PLAN_JSON for change detection
3. Automate after manual validation succeeds
4. Set up alerts for validation_report.status == 'FAIL'
5. Document each CTE's purpose and dependencies
`
  }


  return (
    <Container>
      {/* Header with download button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-primary-900 mb-2">
            Black Box Intermediate Models Pattern
          </h1>
          <p className="text-primary-600">
            Framework for SQL transformation validation with intermediate models
          </p>
        </div>
        <button
          onClick={downloadArchitecture}
          className="px-6 py-3 bg-accent-600 text-white rounded-lg font-medium hover:bg-accent-700 transition-colors flex items-center space-x-2"
        >
          <span>Download Documentation</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>

      {/* Metadata */}
      <Card className="mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <span className="text-xs font-semibold text-primary-900 block mb-1">Category</span>
            <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded">Architecture</span>
          </div>
          <div>
            <span className="text-xs font-semibold text-primary-900 block mb-1">Topologies</span>
            <div className="flex gap-1">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">DAG</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Pipeline</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Fan-out</span>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Fan-in</span>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-primary-900 block mb-1">Principles</span>
            <div className="flex gap-1">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Isolation</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Observability</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Idempotency</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Audit Trail</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Overview */}
      <Section title="Overview">
        <Card>
          <p className="text-primary-700 leading-relaxed">
            Framework for validating SQL transformations through intermediate models, specifically designed 
            for Talend to Snowflake migrations with low data volumes (approximately 100 rows).
          </p>
        </Card>
      </Section>
    </Container>
  )
}

export default BlackBoxDocument
