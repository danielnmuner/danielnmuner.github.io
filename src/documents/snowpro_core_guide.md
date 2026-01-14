# SNOWPRO CORE (COF-C02) EXHAUSTIVE STUDY GUIDE
## Prepare with Confidence for the Snowflake Certification Exam

**Exam Version:** COF-C02  
**Last Updated:** January 2026  
**Official Study Guide Reference:** Snowflake SnowPro Core Study Guide (August 22, 2025)  
**Candidate Target:** 6+ months Snowflake platform experience  
**Exam Format:** 100 multiple-choice questions, 115 minutes  
**Passing Score:** 750/1000  
**Cost:** $175 USD

---

## TABLE OF CONTENTS

1. Introduction and Exam Strategy
2. Domain 1.0: Snowflake AI Data Cloud Features and Architecture (24%)
3. Domain 2.0: Account Access and Security (18%)
4. Domain 3.0: Performance and Cost Optimization Concepts (16%)
5. Domain 4.0: Data Loading and Unloading (12%)
6. Domain 5.0: Data Transformations (18%)
7. Domain 6.0: Data Protection and Data Sharing (12%)
8. Exam Tips and Last-Week Cram Strategy
9. Practice Questions and Solutions

---

# CHAPTER 1: INTRODUCTION AND EXAM STRATEGY

## Understanding the Exam

The SnowPro Core (COF-C02) certification validates your ability to implement, manage, and optimize Snowflake solutions across the full data lifecycle. This is **not** a superficial overview—exam questions are scenario-based and require both theoretical understanding and practical knowledge.

**Key Facts:**
- **Duration:** 115 minutes
- **Question Count:** 100 questions
- **Question Types:** Multiple-choice (single select) and multiple-select
- **Passing Score:** 750 out of 1000 (75%)
- **Unscored Questions:** The exam includes "experimental" unscored questions for statistical validation (typically 10-15%)—don't waste time figuring out which ones they are
- **Exam Reference:** All questions are 100% referenceable to Snowflake documentation

**Critical Insight:** The exam does NOT test your ability to memorize commands. It tests your **conceptual understanding** of Snowflake's architecture, your ability to reason through trade-offs, and your knowledge of best practices.

### Prerequisite Knowledge NOT Covered But Assumed

Before taking this exam, you should be comfortable with:
- Basic SQL (SELECT, WHERE, JOIN, GROUP BY, aggregate functions)
- Relational database concepts (tables, schemas, databases)
- Cloud computing fundamentals (compute vs. storage, cloud providers like AWS/Azure/GCP)
- Basic authentication and authorization concepts

**Resource for Background:** If you need to refresh these concepts, review:
- https://docs.snowflake.com/en/sql-reference (SQL Reference)
- https://docs.snowflake.com/en/user-guide/intro-key-concepts (Key Concepts)

---

## Domain Weightings and Study Allocation

| Domain | Topic | Weight | Estimated Questions | Study Hours |
|--------|-------|--------|-------------------|--------------|
| 1.0 | Snowflake AI Data Cloud Features and Architecture | 24% | ~24 | 20-25 |
| 2.0 | Account Access and Security | 18% | ~18 | 15-18 |
| 3.0 | Performance and Cost Optimization Concepts | 16% | ~16 | 13-16 |
| 4.0 | Data Loading and Unloading | 12% | ~12 | 10-12 |
| 5.0 | Data Transformations | 18% | ~18 | 15-18 |
| 6.0 | Data Protection and Data Sharing | 12% | ~12 | 10-12 |
| **TOTAL** | | **100%** | **~100** | **83-101** |

**Study Strategy:**
- **Weeks 1-2:** Deep dive into Domain 1.0 (architecture foundation)
- **Weeks 3-4:** Domains 2.0 and 5.0 (security and transformations)
- **Weeks 5:** Domain 3.0 (performance and cost)
- **Week 6:** Domains 4.0 and 6.0 (loading/unloading and protection)
- **Week 7:** Practice exams, review weak areas
- **Week 8:** Last-minute cram and confidence building

### Why This Order?

Domain 1.0 is foundational. Everything else builds on understanding:
- How Snowflake separates compute and storage
- What micro-partitions are
- How the three layers (storage, compute, cloud services) interact

Once you understand this, security and performance optimization make intuitive sense.

---

## Study Resources You Will Reference

Throughout this guide, you will see resource links. Bookmark these:

**Official Snowflake Documentation:** https://docs.snowflake.com
- This is your primary reference. All exam questions can be answered using this documentation.

**Snowflake University (On-Demand Courses):** https://learn.snowflake.com
- Level Up: Snowflake Key Concepts
- Level Up: Snowflake Ecosystem
- SnowPro Core Certification Prep Course
- Getting Started With Snowflake (Modules 2-10)

**Snowflake Hands-On Labs:**
- Free trial account (https://signup.snowflake.com)
- Community account (https://www.snowflake.com/en/resources/community/)

**Practice Exams:**
- Official SnowPro Practice Exams: https://learn.snowflake.com/en/certifications/snowpro-practice-exams
- These are built using the same specifications and weightings as the live exam

---

# CHAPTER 2: DOMAIN 1.0 - SNOWFLAKE AI DATA CLOUD FEATURES AND ARCHITECTURE (24%)

This is the foundation domain. If you understand these concepts deeply, the rest of the exam becomes much easier.

## 1.1 Key Features of the Snowflake AI Data Cloud

### Separation of Compute and Storage

This is the fundamental architectural principle of Snowflake and differentiates it from traditional data warehouses.

**Traditional DW Model:** Compute and storage are tightly coupled. You buy a "box" that has both—if you need more storage, you must buy more compute, and vice versa. This leads to overprovisioning and waste.

**Snowflake Model:** 
- **Storage** is cloud object storage (S3, Azure Blob, GCS)—automatically managed, highly scalable, pay-only-for-what-you-use
- **Compute** is virtual warehouses—independent clusters that can scale up, down, or be suspended instantly
- They communicate through the **Cloud Services Layer** (metadata, query optimization, security)

**Exam Focus Points:**
- Be able to explain WHY this separation is beneficial (cost efficiency, scalability, concurrency)
- Understand that storage and compute can scale independently
- Know that a suspended virtual warehouse still incurs storage costs (for data, not compute)

**Reference:** https://docs.snowflake.com/en/user-guide/intro-key-concepts#snowflake-architecture

### Elastic Compute

Snowflake's compute is "elastic"—it can scale horizontally (add clusters) and vertically (increase warehouse size) without downtime.

**Key Concepts:**
- **Virtual Warehouses (VWs):** Named compute clusters, created on-demand, suspended/resumed instantly
- **T-Shirt Sizing:** XS (1 credit/second) through 6XL (64 credits/second)
- **Multi-Cluster Warehouses:** Multiple clusters working in parallel for concurrency (requires Enterprise+ edition)
- **Scaling Policies:** STANDARD (maximize throughput), ECONOMY (balance cost/throughput), AUTO (machine learning-based)

**Exam Focus Points:**
- Understand the difference between scaling UP (larger warehouse) vs. scaling OUT (more clusters)
- Know warehouse auto-suspend and auto-resume behavior
- Understand that warehouse size directly impacts query performance AND cost

**Reference:** https://docs.snowflake.com/en/user-guide/warehouses-overview

### Snowflake's Three Layers

All Snowflake questions can be categorized by which layer they concern:

**1. Storage Layer**
- Cloud object storage (S3, Azure Blob, GCS)
- Data organized in **micro-partitions** (64MB-160MB compressed)
- Immutable, compressed, encrypted by default
- Independent of compute—data persists even if all warehouses are suspended

**2. Compute Layer (Virtual Warehouses)**
- Ephemeral—clusters created on-demand, suspended when idle
- Execute queries, transformations, and data loading
- No local persistent storage (cache is temporary)

**3. Cloud Services Layer**
- Authentication, authorization, metadata management
- Query optimization and compilation
- Transaction management
- Snowflake manages this; you cannot directly configure it
- Costs: Billed as percentage of compute (typically 10-20%)

**Exam Focus Points:**
- Understand which operations use which layer
- Know that the Cloud Services Layer is the "orchestrator" of the other two
- Understand that Cloud Services costs scale with compute usage
- Be able to identify which layer is the bottleneck in a given scenario

**Reference:** https://docs.snowflake.com/en/user-guide/intro-key-concepts#snowflake-architecture

### Snowflake Editions Overview

Snowflake offers four editions, each building on the previous:

| Feature | Standard | Business Critical | Enterprise | Editions |
|---------|----------|-------------------|-----------|----------|
| **Multi-cluster WH** | No | Yes | Yes | Yes |
| **Time Travel (days)** | 1 | 90 | 90 | 90 |
| **Fail-safe (days)** | 7 | 7 | 7 | 7 |
| **Materialized Views** | No | Yes | Yes | Yes |
| **Column-Level Security** | No | Yes | Yes | Yes |
| **Replication** | No | Yes | Yes | Yes |
| **Disaster Recovery** | No | Yes | Yes | Yes |
| **Priority Support** | No | No | No | Yes |

**Exam Focus Points:**
- Know which features require Enterprise edition (multi-cluster, materialized views)
- Know which require Business Critical (column masking, replication)
- Understand that "Time Travel" is limited to 1 day in Standard, but can be extended to 90 days in higher editions (with cost)
- Know that replication and failover are NOT available in Standard edition

**Reference:** https://docs.snowflake.com/en/user-guide/intro-editions

---

## 1.2 Key Snowflake Tools and User Interfaces

You don't need to be an expert in each tool, but you should know when to use each and their primary purpose.

### Snowsight (Web UI)

The modern, cloud-native web interface for Snowflake.

**Key Features:**
- Query execution and results viewing
- Dashboard creation (visual BI)
- Worksheets for SQL development
- **Cost Insights feature** for cost attribution and monitoring
- Collaboration (sharing results, dashboards)
- No software installation required

**Exam Focus Points:**
- Know that Snowsight is the **recommended** modern interface
- Be familiar with Cost Insights (breakdown by warehouse, user, database)
- Understand that Snowsight is browser-based and can be slow on large result sets (consider LIMIT)

**Reference:** https://docs.snowflake.com/en/user-guide/ui-snowsight

### SnowSQL (CLI)

Command-line interface for Snowflake query execution and administration.

**Key Features:**
- Batch query execution
- Script automation (`.sql` files)
- Integration with CI/CD pipelines
- File operations (PUT, GET)
- Excellent for serverless/headless workflows

**Exam Focus Points:**
- Know that SnowSQL is ideal for automation and scripting
- Understand PUT/GET commands (used for staging file uploads/downloads)
- Recognize scenarios where SnowSQL is the better choice (automated pipelines, no GUI)

**Reference:** https://docs.snowflake.com/en/user-guide/snowsql

### Snowflake Connectors and Drivers

Multiple language-specific connectors for programmatic access:

**Available Connectors:**
- **Python:** `snowflake-connector-python` (most popular for data engineering)
- **JDBC/ODBC:** For Java and other languages
- **Node.js, Go, .NET, JavaScript:** Language-specific libraries
- **Connectors for ETL tools:** Talend, Informatica, Apache Spark, Kafka, etc.

**Exam Focus Points:**
- Know that Snowflake integrates with standard JDBC/ODBC
- Understand that connectors enable programmatic access (not just interactive SQL)
- Recognize scenarios where you'd use connectors (application integration, ETL tools)

**Reference:** https://docs.snowflake.com/en/developer-guide/drivers-and-tools

### Snowpark

A distributed processing framework that allows Python, Scala, and Java code to execute within Snowflake.

**Key Concepts:**
- Code executes in Snowflake's compute layer (not your local machine)
- DataFrame API similar to Spark
- Can define User-Defined Functions (UDFs) and stored procedures
- Ideal for complex transformations that are awkward in SQL

**Exam Focus Points:**
- Understand that Snowpark brings **code** to the **data** (not the reverse)
- Know that Snowpark UDFs run within Snowflake (not external)
- Recognize scenarios where Snowpark is better than pure SQL
- Understand vectorized UDFs for performance

**Reference:** https://docs.snowflake.com/en/developer-guide/snowpark/index

### Streamlit in Snowflake

Python-based framework for building interactive web applications, natively integrated with Snowflake.

**Key Features:**
- No separate deployment infrastructure
- Direct data access via Snowflake queries
- Real-time interactivity
- Ideal for dashboards, data exploration, and lightweight BI

**Exam Focus Points:**
- Know that Streamlit runs **within** Snowflake (not external)
- Understand use cases: dashboards, exploratory analysis, lightweight BI
- Recognize that Streamlit is serverless and scales with Snowflake

**Reference:** https://docs.snowflake.com/en/developer-guide/streamlit/index

### Snowflake Cortex

AI/ML services built into Snowflake (no external ML infrastructure needed).

**Available Services:**
- **LLMs:** Text generation, completion, summarization
- **Sentiment Analysis:** NLP for customer feedback
- **Translation:** Multi-language support
- **Embeddings:** Vector generation for semantic search
- **Timeseries Forecasting:** Built-in ML for predictions

**Exam Focus Points:**
- Know that Cortex is **serverless** (no infrastructure to manage)
- Understand that it can be called directly from SQL or Snowpark
- Recognize use cases: chatbots, text analysis, embeddings for vector search
- Cortex costs are included in Cloud Services billing

**Reference:** https://docs.snowflake.com/en/user-guide/snowflake-cortex

### Snowflake SQL API

REST-based API for executing queries without maintaining persistent connections.

**Key Use Case:** Microservices, serverless applications, lightweight integrations

**Exam Focus Points:**
- Know that SQL API uses serverless compute (pay-per-query)
- Understand it's ideal for bursty, infrequent queries
- Recognize that SQL API is HTTP-based (no persistent connection)
- Be aware of cost implications (serverless compute is more expensive per-unit than warehouse compute)

**Reference:** https://docs.snowflake.com/en/developer-guide/sql-api

### SnowCD

Tool for replication and continuous disaster recovery (CDP).

**Exam Focus Points:**
- Know that SnowCD is used for account-level replication
- Understand it's for disaster recovery (not just backup)
- Recognize it's only available in Business Critical+ editions

**Reference:** https://docs.snowflake.com/en/user-guide/disaster-recovery-intro

---

## 1.3 Snowflake Catalog and Objects

This section covers the **object hierarchy** in Snowflake. Understand this well—many exam questions test object relationships.

### Object Hierarchy

```
Organization (if multi-account setup)
  └── Account
      └── Database
          └── Schema
              ├── Tables
              ├── Views
              ├── Functions (UDFs, UDTFs)
              ├── Procedures (Stored Procedures)
              ├── Streams
              ├── Tasks
              └── Sequences
          
      Stages (Internal & External)
      Pipes
      Shares (reference databases from shares)
```

### Databases and Schemas

**Databases:** Logical containers for related data. At the account level.
- Can be cloned (zero-copy)
- Can be time-traveled
- Have independent Time Travel retention settings

**Schemas:** Logical grouping within a database.
- Contain tables, views, functions, procedures, etc.
- Can be cloned
- Two special schemas:
  - `INFORMATION_SCHEMA`: System metadata for the schema
  - `PUBLIC`: Default schema if none specified

**Exam Focus Points:**
- Know that `INFORMATION_SCHEMA` contains metadata views
- Understand that dropping a database does NOT drop cloned databases
- Know that Time Travel can be configured per-database or per-table

**Reference:** https://docs.snowflake.com/en/sql-reference/ddl-database

### Table Types

**1. Permanent Tables (Default)**
- Standard durable storage
- Time Travel enabled (1-90 days depending on edition)
- Fail-safe enabled (7 days, automatic recovery)
- Highest cost (storage + Time Travel + Fail-safe)

**2. Temporary Tables**
- Session-scoped (deleted when session ends)
- No Time Travel
- No Fail-safe
- Use case: Intermediate results in a session
- Lower cost

**3. Transient Tables**
- Account-level persistence (survives session)
- No Time Travel (0 days)
- No Fail-safe
- Use case: Non-critical staging data, ephemeral working data
- Moderate cost (savings from no Time Travel/Fail-safe)

**4. Iceberg Tables** (newer feature)
- Apache Iceberg-compatible format
- Supports advanced features like partition evolution
- Interoperable with other Iceberg platforms
- Use case: Data lakes, complex partitioning strategies

**5. Dynamic Tables** (newer feature)
- Automatically refresh via Snowflake tasks/streams
- Like materialized views but with different refresh semantics
- Use case: Incremental data pipelines

**6. External Tables**
- Reference data in external cloud storage (S3, Azure Blob, GCS)
- Metadata-only in Snowflake
- Query external data without copying
- Use case: Data lake exploration, avoiding copy-in costs initially

**Exam Focus Points:**
- Know the cost and retention differences between table types
- Understand when to use transient vs. permanent (permanent for production data)
- Know that external tables are metadata-only (lightweight)
- Understand that cloning an external table does NOT clone the underlying data
- Recognize that temporary tables are session-scoped and auto-drop

**Reference:** https://docs.snowflake.com/en/user-guide/tables-overview

### View Types

**1. Standard Views**
- Virtual representation of a query result
- No materialization—query is executed every time
- Lightweight metadata storage
- Use case: Common queries, security masking (via secure views)

**2. Materialized Views** (Enterprise+ editions only)
- Pre-computed query results stored as a table
- Automatic refresh strategies (on-write, on-schedule, or manual)
- Query rewrite: If you query a source table, Snowflake may automatically use the materialized view
- Higher storage cost but faster queries on frequent patterns
- Use case: Common aggregations, BI queries, heavy joins

**3. Secure Views** (Business Critical+ editions)
- View definition hidden from all roles except the defining role
- Use case: Row-level security, column masking, PII protection
- Slightly slower than standard views (cannot use query rewrite optimization)

**4. Dynamic Views** (newer)
- Views that incorporate streams and Time Travel
- Advanced use case: Incremental processing

**Exam Focus Points:**
- Know that materialized views have a cost-benefit trade-off
- Understand that secure views hide the definition but add performance overhead
- Know that view selection (query rewrite) is automatic and transparent
- Understand that you CANNOT update view underlying tables via a view (views are read-only)

**Reference:** https://docs.snowflake.com/en/user-guide/views-materialized

### Data Types

Snowflake supports a comprehensive set of data types:

| Category | Types | Notes |
|----------|-------|-------|
| **Numeric** | NUMBER, INT, FLOAT | NUMBER(p,s) for fixed precision |
| **String** | VARCHAR, CHAR, TEXT | VARCHAR is variable-length, recommended |
| **Binary** | BINARY, VARBINARY | For non-text data |
| **Boolean** | BOOLEAN | TRUE, FALSE, NULL |
| **Date/Time** | DATE, TIME, TIMESTAMP, TIMESTAMP_LTZ, TIMESTAMP_NTZ | LTZ = with local timezone, NTZ = no timezone |
| **Semi-Structured** | VARIANT, ARRAY, OBJECT | VARIANT is the universal container |
| **Specialized** | GEOGRAPHY, VECTOR | GEOGRAPHY for geo-spatial, VECTOR for ML embeddings |

**Exam Focus Points:**
- Know that VARIANT is the universal semi-structured container (can hold JSON, etc.)
- Understand TIMESTAMP variants (LTZ vs. NTZ)
- Know that ARRAY and OBJECT are semi-structured types
- Understand that VECTOR is for AI/ML embeddings

**Reference:** https://docs.snowflake.com/en/sql-reference/data-types

### User-Defined Functions (UDFs)

Functions that you define to encapsulate logic.

**Types:**

1. **SQL UDFs**
   - Inline SQL logic
   - Fast (executed as part of query)
   - Limitations: Cannot call external services, limited procedural logic

2. **Python UDFs**
   - Python code executed in Snowflake's Python runtime
   - Slower than SQL UDFs (cross-language overhead)
   - Use cases: Complex transformations, ML predictions, external library usage

3. **JavaScript UDFs**
   - JavaScript code executed in Snowflake's JavaScript runtime
   - Similar use cases to Python

4. **Java UDFs**
   - Java code compiled and executed
   - For teams that prefer Java

5. **External UDFs**
   - HTTP calls to external services
   - Asynchronous processing
   - Higher latency
   - Use case: ML model calls, external APIs

**Secure UDFs:**
- Source code hidden (encrypted)
- Cannot be modified or inspected
- Used for proprietary logic

**Vectorized UDFs:**
- Process multiple rows at once (batching)
- Higher throughput for Python/JavaScript UDFs
- Requires `@udf(input_types=[...], return_type=..., vectorized_udf=True)`

**Exam Focus Points:**
- Know the performance implications (SQL > Python/JS > External)
- Understand that UDFs are schema-scoped objects
- Recognize that external UDFs add latency
- Know that secure UDFs hide code for IP protection
- Understand vectorized UDFs for batch processing

**Reference:** https://docs.snowflake.com/en/sql-reference/user-defined-functions

### User-Defined Table Functions (UDTFs)

Functions that return multiple rows (like a table).

**Key Difference from UDFs:**
- UDFs return a single value per input row
- UDTFs return multiple rows per input row

**Use Case:** Unpacking nested structures, generating multiple outputs

**Exam Focus Points:**
- Know that UDTFs are used with `TABLE()` syntax: `SELECT * FROM TABLE(my_udtf(...))`
- Understand they're used with lateral joins for hierarchical data

**Reference:** https://docs.snowflake.com/en/sql-reference/table-functions

### Stored Procedures

Named SQL/Python/Java scripts that execute on-demand.

**Key Features:**
- Can manage transactions (COMMIT, ROLLBACK)
- Can execute multiple SQL statements
- Can have input parameters and return values
- Can use procedural logic (loops, conditionals)

**Exam Focus Points:**
- Know that stored procedures have transaction control (UDFs do not)
- Understand use cases: ETL workflows, complex initialization
- Know that stored procedures execute synchronously

**Reference:** https://docs.snowflake.com/en/sql-reference/stored-procedures

### Streams

Change Data Capture (CDC) mechanism. Tracks DML changes (INSERT, UPDATE, DELETE) on tables.

**Types:**

1. **Standard Streams**
   - Track INSERT, UPDATE, DELETE with row version tracking
   - Can detect which rows changed and how

2. **Append-Only Streams**
   - Only track INSERTS (not UPDATES or DELETES)
   - Lighter weight, good for logs

3. **Insert-Only Streams**
   - Similar to append-only but explicit naming

**Key Concept:**
- Streams don't store data—they track changes
- A stream can only be consumed once per "stream generation"
- After consumption, stream is marked as STALE (reset on next change)
- Streams have a retention period (default 24 hours)

**Exam Focus Points:**
- Know that streams are CDC, not data storage
- Understand the "stream generation" concept (why queries against the same stream twice return different results)
- Know that streams require a table to track
- Understand that streams pair with tasks for automated ELT

**Reference:** https://docs.snowflake.com/en/user-guide/streams

### Tasks

Scheduled SQL execution (similar to cron jobs).

**Key Features:**
- Standalone tasks: Execute on a schedule (CRON syntax)
- Chained tasks: Execute when dependencies complete
- Can suspend/resume a task
- Error handling: Can configure `ON_ERROR` behavior
- Execution log: Task history and monitoring

**Exam Focus Points:**
- Know that tasks enable serverless scheduling (no external orchestrator)
- Understand dependencies (task trees, DAGs)
- Know that tasks execute within the Cloud Services Layer
- Understand task monitoring via `TASK_HISTORY` views

**Reference:** https://docs.snowflake.com/en/user-guide/tasks-intro

### Pipes

Continuous data ingestion mechanism (Snowpipe).

**Key Concept:**
- Pipes automatically detect new files and load them
- Event-driven (via cloud provider notifications: SQS, Event Grid, Pub/Sub)
- Lightweight compute model (serverless)

**Types:**
1. **Standard Snowpipe:** Event-driven auto-loading
2. **Snowpipe Express:** Simplified, REST-based (higher cost)

**Exam Focus Points:**
- Know that pipes are for continuous, automatic loading
- Understand that pipes are serverless (separate billing)
- Know that pipes are event-driven (react to file uploads)
- Understand the cost model (higher per-credit than warehouse compute)

**Reference:** https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro

### Shares and Databases (from Shares)

**Share:** A database-level object that contains other objects (tables, views, functions).

**Key Distinction:**
- **Shares:** Provider-side objects (what you're sharing)
- **Shared Databases (Reference Databases):** Consumer-side objects (what you've received)

**Exam Focus Points:**
- Know that shares contain databases, not individual tables
- Understand that shares are account-level objects
- Know that shared databases are read-only on the consumer side
- Understand row-level security via secure views in shares

**Reference:** https://docs.snowflake.com/en/user-guide/data-sharing-intro

### Sequences

Auto-increment mechanism for generating unique IDs.

**Key Features:**
- Can be ordered (guaranteed next value) or unordered (faster)
- Distributed sequence generation (works across parallel writers)
- Syntax: `SELECT nextval(my_sequence_name)`

**Exam Focus Points:**
- Know that Snowflake sequences differ from traditional databases (unordered by default)
- Understand that ordered sequences have performance implications
- Know that sequences are schema-scoped

**Reference:** https://docs.snowflake.com/en/sql-reference/sql-ddl-sequence

---

## 1.4 Snowflake Storage Concepts

### Micro-Partitions

The fundamental unit of data organization in Snowflake.

**Key Characteristics:**
- Size: 64MB-160MB compressed (can vary)
- Immutable: Once written, never modified in-place
- Clustered: Rows with similar values are naturally grouped
- Metadata: Each micro-partition has min/max values per column

**Why This Matters:**
- Snowflake doesn't scan at the row level—it scans at the micro-partition level
- If a query has a WHERE clause that excludes all rows in a micro-partition, that partition is skipped
- This is called **partition pruning** and is automatic

**Example:**
```
Table: customers (1 billion rows, 10GB compressed)
Micro-partitions: 100 partitions, 100MB each

Query: SELECT * FROM customers WHERE customer_id = 12345

Snowflake examines partition metadata:
- Partition 1: customer_id min=1, max=10M → skip
- Partition 2: customer_id min=10M, max=20M → SCAN
- Partition 3: customer_id min=20M, max=30M → skip
Result: Only 1 partition scanned instead of 100
```

**Exam Focus Points:**
- Understand partition pruning is automatic
- Know that clustering keys improve pruning efficiency
- Understand that the metadata cache (free) helps pruning decisions
- Know that partition pruning reduces bytes scanned = reduced cost

**Reference:** https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions

### Data Clustering

Intentional organization of data via clustering keys to improve query performance.

**Clustering Key:** A set of columns you specify that signal to Snowflake how to organize data.

**Without Clustering:**
- Data loaded in insertion order
- Pruning works but may be inefficient
- Partitions may contain mix of all customer_ids

**With Clustering on customer_id:**
- Data organized by customer_id
- Queries on customer_id are highly efficient
- Pruning is much more effective

**Clustering Depth:**
- Measured 0-100 (higher = better clustered, lower = more fragmented)
- Automatic reclustering available (costs credits)
- Only for large tables (typically 1B+ rows)

**Exam Focus Points:**
- Know that clustering is optional but beneficial for large tables
- Understand that reclustering has a cost (automatic tasks consume credits)
- Know the difference between clustering (proactive) vs. search optimization (reactive)
- Understand that clustering improves performance but adds cost (reclustering)

**Reference:** https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions

### Search Optimization Service

Alternative to clustering for performance—uses indexes instead of reorganization.

**Key Differences from Clustering:**
- Clustering: Reorganizes data physically
- Search Optimization: Builds indexes (logical metadata)
- Search Optimization: Automatic refresh (no reclustering cost)
- Search Optimization: Slightly higher cloud services cost than clustering

**Supported Predicates:**
- Equality (column = value)
- Range (column > value)
- Pattern matching (column LIKE value)
- Nested queries (VARIANT column access)

**Exam Focus Points:**
- Know that search optimization is an alternative to clustering
- Understand it's more suitable for columns with high cardinality (many distinct values)
- Know the cost model (cloud services, automatic)
- Understand that search optimization is transparent (no query changes needed)

**Reference:** https://docs.snowflake.com/en/user-guide/search-optimization-service

### Data Storage Monitoring

Track and optimize storage costs using monitoring tools.

**Key Metrics:**
- **Active Data:** Compressed size of all table data
- **Fail-safe Data:** Additional 7-day recovery data
- **Time Travel Data:** Historical versions (configurable 1-90 days)
- **Stage Storage:** Files in internal/external stages
- **Directory Tables:** Metadata index for external files

**Monitoring Tools:**

1. **ACCOUNT_USAGE Schema** (views on storage)
   - `TABLE_STORAGE_METRICS`: Per-table storage
   - `STAGE_STORAGE_METRICS`: Per-stage storage

2. **Cost Insights Feature** (in Snowsight)
   - Visual breakdown of storage costs
   - Attribution by table, database, warehouse

3. **System Functions**
   - `SELECT * FROM INFORMATION_SCHEMA.TABLES` (includes bytes_scanned)
   - `SYSTEM$ESTIMATE_SEARCH_OPTIMIZATION_COST(table_name)`

**Exam Focus Points:**
- Know how to identify high-storage tables
- Understand the difference between active data and historical (Time Travel, Fail-safe)
- Know that dropping data (DELETE) doesn't immediately free storage (Fail-safe retention)
- Understand cost implications of Time Travel retention settings

**Reference:** https://docs.snowflake.com/en/user-guide/cost-understanding-compute-storage

---

# CHAPTER 3: DOMAIN 2.0 - ACCOUNT ACCESS AND SECURITY (18%)

Security is a significant portion of the exam. Understand RBAC, privilege inheritance, and the built-in roles thoroughly.

## 2.1 Security Principles and Policies

### Network Security

Controlling who can connect to Snowflake and from where.

**Network Policies:**
- Whitelist IP addresses allowed to connect
- Block/allow at the account or user level
- Syntax: `CREATE NETWORK POLICY policy_name ALLOWED_IP_LIST = ('1.2.3.4', '5.6.7.8/24')`

**Exam Focus Points:**
- Know that network policies restrict by IP
- Understand they can be account-level or user-level
- Know the difference between ALLOWED_IP_LIST and BLOCKED_IP_LIST

**Reference:** https://docs.snowflake.com/en/user-guide/network-policies

### Private Link

Direct, private connectivity to Snowflake (no internet exposure).

**Use Case:** Organizations with strict network policies, compliance requirements (no internet-routed data)

**Exam Focus Points:**
- Know that Private Link is available for AWS and Azure
- Understand it's for organizations with strict network policies
- Know it adds cost and complexity

**Reference:** https://docs.snowflake.com/en/user-guide/private-connectivity

### Multi-Factor Authentication (MFA)

Require two or more factors for user authentication.

**MFA Methods:**
1. **TOTP (Time-based One-Time Password):** Authenticator apps (Google Authenticator, Duo)
2. **Push Notifications:** Duo Security, etc.
3. **SMS:** (declining in favor of TOTP/push)

**MFA Enforcement:**
- Can be configured at the account level (all users)
- Or per-user
- Syntax: `CREATE USER user_name ... MFA_AUTHENTICATION_METHODS = ('TOTP')`

**Exam Focus Points:**
- Know that MFA is optional (not enforced by default)
- Understand that ACCOUNTADMIN users should have MFA enabled
- Know that MFA is configured per-user or account-wide

**Reference:** https://docs.snowflake.com/en/user-guide/security-mfa

### Federated Authentication (SAML / OAuth)

Delegate authentication to an external identity provider (IdP).

**SAML:** Assertion-based, common in enterprises (Okta, Azure AD, Ping Identity)
**OAuth:** Token-based, modern standard (Google, GitHub, etc.)

**Benefits:**
- Centralized user management
- Single sign-on (SSO)
- Automated user provisioning (JIT - Just-In-Time)
- Compliance (audit trail in IdP)

**Exam Focus Points:**
- Know the difference between SAML and OAuth
- Understand SAML is assertion-based, OAuth is token-based
- Know that federated auth removes password management from Snowflake
- Understand automated provisioning creates users on first login

**Reference:** https://docs.snowflake.com/en/user-guide/security-federation

### Key Pair Authentication

Public/private key pair for programmatic authentication (e.g., Python connector, SnowSQL).

**Process:**
1. Generate RSA key pair (2048 or 4096 bits)
2. Upload public key to Snowflake
3. Use private key in application (keep secret!)

**Exam Focus Points:**
- Know that key pair auth is for programmatic access (not interactive users)
- Understand the risk of key exposure (keep private key secret)
- Know that key pairs can be rotated
- Understand key pair auth doesn't require password

**Reference:** https://docs.snowflake.com/en/user-guide/key-pair-auth

### Single Sign-On (SSO)

Unified authentication across multiple applications.

**Typical Flow:**
1. User logs in to Snowflake
2. Redirected to federated IdP
3. IdP validates credentials
4. IdP sends assertion/token back to Snowflake
5. User authenticated without re-entering credentials

**Exam Focus Points:**
- Know that SSO is enabled via SAML/OAuth federation
- Understand the user experience (seamless, no additional login)
- Know that SSO requires IdP integration

**Reference:** https://docs.snowflake.com/en/user-guide/security-federation

---

## 2.2 Access Control in Snowflake

This is core material. The exam heavily tests RBAC, privilege inheritance, and best practices.

### Access Control Framework

Snowflake uses **Role-Based Access Control (RBAC):** 

- Users are assigned **Roles**
- Roles have **Privileges** on **Objects**
- Users can have multiple roles
- Roles can be hierarchical (inherited)

**Example:**
```
User: alice
Roles: analyst, developer

Role: analyst
Privileges: SELECT on database my_db

Role: developer
Privileges: SELECT, INSERT, UPDATE on schema my_db.dev_schema

Result: alice can SELECT from my_db (via analyst role)
        alice can SELECT, INSERT, UPDATE on my_db.dev_schema (via developer role)
```

### Built-In Roles (Critical!)

**ACCOUNTADMIN**
- Highest privilege role
- Full account control (user management, billing, warehouse creation)
- Only 1-2 users should have this
- Cannot be granted—only the initial setup account

**SECURITYADMIN**
- Manages users and roles
- Grants/revokes privileges
- Cannot create databases or warehouses (those are SYSADMIN)
- **Critical:** SECURITYADMIN can grant any privilege, including ACCOUNTADMIN

**SYSADMIN**
- Creates databases, schemas, warehouses
- Does NOT manage users or grant privileges
- Cannot create/grant roles

**ORGADMIN** (Multi-account setups)
- Organization-level administration
- Manages accounts

**PUBLIC**
- Default role for all users
- Typically has minimal privileges
- Used for baseline access

**Custom Roles**
- User-defined roles for specific access patterns
- Recommended: Create custom roles instead of using built-in roles

**Exam Focus Points:**
- Know the distinct responsibilities of ACCOUNTADMIN, SECURITYADMIN, SYSADMIN
- Understand that SECURITYADMIN can grant ACCOUNTADMIN privilege
- Know that ACCOUNTADMIN is not the only way to manage privileges
- Understand best practice: Minimize ACCOUNTADMIN usage, use SECURITYADMIN + SYSADMIN

**Reference:** https://docs.snowflake.com/en/user-guide/security-access-control-overview

### Role Hierarchy and Privilege Inheritance

**Role Hierarchy:**
Roles can inherit from other roles (role-to-role grants).

**Example:**
```
ACCOUNTADMIN
  ↓
SYSADMIN (inherits ACCOUNTADMIN privileges)
  ↓
dba_role (inherits SYSADMIN privileges)
  ↓
analyst_role (inherits dba_role privileges)
```

**Privilege Inheritance:**
When a role inherits another role, it gains **all** privileges of the parent role.

**Exam Focus Points:**
- Know that privileges cascade down the hierarchy
- Understand the principle of least privilege (don't over-inherit)
- Know that you can revoke a role from a user (removing all inherited privileges)

**Reference:** https://docs.snowflake.com/en/user-guide/security-access-control-overview#role-hierarchy

### Privileges: Types and Granularity

Snowflake privileges are object-specific.

**Global Privileges** (account-level, no object):
- CREATE DATABASE
- CREATE SHARE
- CREATE INTEGRATION
- IMPORT SHARE

**Schema Privileges** (schema-level):
- USAGE (can use the schema)
- CREATE TABLE
- CREATE VIEW
- CREATE PROCEDURE

**Table Privileges** (table-level):
- SELECT (read rows)
- INSERT (add rows)
- UPDATE (modify rows)
- DELETE (remove rows)
- TRUNCATE (delete all rows)
- REFERENCES (foreign key references)

**Warehouse Privileges:**
- USAGE (can use the warehouse)
- MODIFY (can suspend/resume, change size)
- MONITOR (can view query history)

**Database Privileges:**
- USAGE
- CREATE SCHEMA
- CREATE SHARE (to share database)
- REFERENCE_USAGE (for share consumer)

**Exam Focus Points:**
- Know that USAGE is the baseline for accessing an object
- Understand the differences between SELECT (read), INSERT, UPDATE, DELETE
- Know that you can't grant SELECT on a database (must grant on schema or table)
- Understand database vs. schema vs. table hierarchy

**Reference:** https://docs.snowflake.com/en/sql-reference/sql-ddl-user-security

### Granting and Revoking Privileges

**GRANT Syntax:**
```sql
GRANT privilege_type ON object_type object_name TO ROLE role_name;

-- Example:
GRANT SELECT ON TABLE my_db.my_schema.my_table TO ROLE analyst_role;
GRANT CREATE TABLE ON SCHEMA my_db.my_schema TO ROLE developer_role;
GRANT USAGE ON WAREHOUSE compute_wh TO ROLE analyst_role;
```

**REVOKE Syntax:**
```sql
REVOKE privilege_type ON object_type object_name FROM ROLE role_name;
```

**WITH GRANT OPTION:**
Allows a role to grant privileges to others.
```sql
GRANT SELECT ON TABLE my_table TO ROLE analyst_role WITH GRANT OPTION;
-- Now analyst_role can grant SELECT to other roles
```

**GRANTED BY:**
Specifies who granted a privilege (for compliance/audit).
```sql
SHOW GRANTS ON TABLE my_table;
-- Shows who granted each privilege
```

**Exam Focus Points:**
- Know the GRANT/REVOKE syntax
- Understand that WITH GRANT OPTION allows privilege delegation
- Know that revoking a role removes all inherited privileges
- Understand the principle of least privilege (grant only what's needed)

**Reference:** https://docs.snowflake.com/en/sql-reference/sql-grant-ownership

### Object Ownership and Ownership Transfer

**Ownership:** Every object has an owner (initially the role that created it).

**Implications:**
- Owner can grant/revoke privileges on the object
- Owner can delete the object
- Owner is typically SYSADMIN or a custom role

**Transfer Ownership:**
```sql
ALTER TABLE my_table OWNER TO ROLE new_owner_role;
```

**Exam Focus Points:**
- Know that ownership determines who can manage privileges
- Understand that ACCOUNTADMIN can always take ownership
- Know that transferring ownership is part of proper governance

**Reference:** https://docs.snowflake.com/en/sql-reference/sql-ddl-user-security

### Information Schema and Access Tracking

**INFORMATION_SCHEMA:**
System views for metadata (tables, columns, functions, etc.).

```sql
SELECT * FROM my_db.INFORMATION_SCHEMA.TABLES;
SELECT * FROM my_db.INFORMATION_SCHEMA.COLUMNS;
SELECT * FROM my_db.INFORMATION_SCHEMA.FUNCTIONS;
```

**ACCOUNT_USAGE Schema:**
Account-level views for historical data and system metrics.

```sql
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY;  -- Who accessed what, when
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY;  -- User login attempts
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY;  -- Query execution history
```

**ACCESS_HISTORY View:**
- Shows read/write operations on objects
- User who accessed
- Timestamp
- Type of access (SELECT, INSERT, etc.)
- Availability: 365 days of history

**Exam Focus Points:**
- Know that INFORMATION_SCHEMA is per-database
- Know that ACCOUNT_USAGE is account-level
- Understand ACCESS_HISTORY for compliance/audit
- Know the retention (365 days for ACCESS_HISTORY)

**Reference:** https://docs.snowflake.com/en/user-guide/information-schema

### Secure Functions

**Secure Functions:** User-defined functions with hidden source code.

**Creation:**
```sql
CREATE FUNCTION secure_udf(input INT)
RETURNS INT
LANGUAGE SQL
SECURE
AS
$$
  SELECT input * 2;
$$;
```

**Benefits:**
- Source code hidden (encrypted, not readable by other roles)
- IP protection
- Can still be used/executed by other roles (with USAGE privilege)

**Limitations:**
- Cannot use query optimization (slightly slower)
- Cannot see function definition (can't debug easily)

**Exam Focus Points:**
- Know that SECURE hides the function definition
- Understand use case (proprietary logic IP protection)
- Know the performance trade-off (optimization disabled)

**Reference:** https://docs.snowflake.com/en/sql-reference/user-defined-functions#secure-udfs

### Row and Column-Level Security

**Row-Level Security (via Row Access Policies):**
Dynamically filter rows based on user/role.

**Example:**
```sql
CREATE ROW ACCESS POLICY row_policy ON (employee_id INT)
AS (employee_id IN (SELECT employee_id FROM hr_table WHERE manager_id = CURRENT_USER()));

ALTER TABLE employees ADD ROW ACCESS POLICY row_policy ON (employee_id);
-- Now queries on employees only return rows where employee_id matches the policy
```

**Column-Level Security (Masking Policies):**
Hide or mask column values.

**Example:**
```sql
CREATE MASKING POLICY mask_ssn AS (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() = 'HR_ADMIN' THEN val
    ELSE '***-**-' || SUBSTR(val, -4)  -- Show last 4 digits only
  END;

ALTER TABLE employees MODIFY COLUMN ssn SET MASKING POLICY mask_ssn;
-- Now non-HR roles see '***-**-1234' instead of '123-45-6789'
```

**Exam Focus Points:**
- Know the difference: Row Access (filters rows), Masking (masks columns)
- Understand that policies are transparent (users don't know they're applied)
- Know the use cases (PII protection, data segregation)
- Understand performance implications (policies add overhead)

**Reference:** https://docs.snowflake.com/en/user-guide/security-row-column-level-security

### Object Tags and Tag-Based Access Control

**Tags:** Metadata labels for objects (databases, tables, columns).

**Creation:**
```sql
CREATE TAG classification_tag ALLOWED_VALUES = ('PII', 'PUBLIC', 'CONFIDENTIAL');
```

**Assigning Tags:**
```sql
ALTER TABLE customers SET TAG classification_tag = 'PII';
ALTER TABLE marketing_data SET TAG classification_tag = 'PUBLIC';
```

**Tag-Based Policies:**
Tags can be used in masking/row access policies for flexible governance.

**Exam Focus Points:**
- Know that tags are metadata (separate from privileges)
- Understand tag hierarchies (can inherit from parent objects)
- Know the use case (classification, governance, masking policy triggers)

**Reference:** https://docs.snowflake.com/en/user-guide/object-tagging

---

## 2.3 Account and Organization Management

### Account Structure

**Account:** A single Snowflake instance with separate:
- Users and roles
- Databases and data
- Virtual warehouses
- Billing (though can be consolidated in organization)

**Account Types:**
1. **Standard Account:** Full functionality
2. **Reader Account:** Read-only access to shared data (created by provider)

**Multi-Account Management:** Organizations (not exam-heavy, but know basics)

### Organizations

**Organization:** Container for multiple accounts (requires Business Critical edition minimum).

**Benefits:**
- Consolidated billing
- Cross-account resource sharing (via organization roles)
- Centralized audit/compliance

**Exam Focus Points:**
- Know that organizations enable multi-account management
- Understand consolidated billing advantages
- Know this is not heavily tested (understand basic concept)

**Reference:** https://docs.snowflake.com/en/user-guide/organizations-accounts

### Secure Views in Data Governance

**Secure Views:** Row-level masking via view definition.

**Example:**
```sql
CREATE SECURE VIEW customer_view AS
SELECT 
  customer_id,
  customer_name,
  CASE 
    WHEN CURRENT_ROLE() = 'EXECUTIVE' THEN email
    ELSE '***@***.com'
  END AS email
FROM customers;
```

**Use Case:** Data sharing where you want to expose some rows/columns but mask others.

**Exam Focus Points:**
- Know that secure views enforce row/column masking via view logic
- Understand they're used in data sharing for controlled access
- Know they replace the need for separate masking policies (simpler but less flexible)

**Reference:** https://docs.snowflake.com/en/user-guide/views-secure

---

# CHAPTER 4: DOMAIN 3.0 - PERFORMANCE AND COST OPTIMIZATION CONCEPTS (16%)

This is a critical domain. Understand warehouse configuration, caching, and cost drivers thoroughly.

## 3.1 Query Performance Analysis

### Query Profile

Every query executed in Snowflake generates a **Query Profile**—a breakdown of execution.

**Accessing Query Profile:**
1. In Snowsight: Run a query, click "Query Profile" tab
2. Via SQL: `SELECT * FROM TABLE(GET_QUERY_PROFILE_BY_ID('query_id'))`

**Key Metrics in Profile:**
- **Operator Tree:** Each operation (scan, join, aggregate, etc.)
- **Rows Produced:** Output rows per operator
- **Bytes Scanned:** Data read from storage
- **Execution Time:** Time per operator
- **Spilling:** When operator data exceeds warehouse memory

**Example Profile Analysis:**
```
Query: SELECT COUNT(*) FROM large_table

Profile Tree:
1. TableScan (large_table)
   - Rows Scanned: 1,000,000,000
   - Bytes Scanned: 10GB
   - Execution Time: 2 seconds
   
2. Aggregate (COUNT)
   - Rows Produced: 1
   - Execution Time: 0.5 seconds
```

**Optimization Clues:**
- High bytes scanned → Add WHERE clause or clustering
- High execution time in join → Poor join order or missing statistics
- Data spilling → Increase warehouse size

**Exam Focus Points:**
- Know what information the Query Profile provides
- Understand how to identify bottlenecks
- Know that Query Profile is free (always available)

**Reference:** https://docs.snowflake.com/en/user-guide/ui-query-profile

### Explain Plans

**EXPLAIN:** Shows the query plan **before** execution.

**Syntax:**
```sql
EXPLAIN SELECT * FROM customers WHERE customer_id = 123;
```

**Output:** Query execution tree without actual execution.

**Purpose:** 
- Preview query execution plan
- Identify inefficient plans before running expensive queries

**Exam Focus Points:**
- Know the difference between EXPLAIN (plan only) and Query Profile (actual execution)
- Understand that EXPLAIN is faster (no execution)
- Know when to use each (EXPLAIN for planning, Query Profile for analysis)

**Reference:** https://docs.snowflake.com/en/sql-reference/sql-explain

### Data Spilling

**Definition:** When an operator's working memory exceeds warehouse memory, Snowflake spills data to disk.

**Types:**
1. **Local Disk Spilling:** Spill to local SSD (faster, limited capacity)
2. **Remote Disk Spilling:** Spill to cloud storage (slower, unlimited)

**Performance Impact:**
- Spilling significantly slows queries (disk I/O much slower than memory)
- Local spill is faster than remote
- Remote spill is much slower but handles large operations

**Identifying Spilling:**
- Query Profile shows "SPILLED_BYTES_WRITTEN" and "SPILLED_BYTES_READ"
- If spilled bytes > 0, spilling occurred

**Mitigation:**
1. **Increase warehouse size** (more memory)
2. **Optimize query** (reduce data processed)
3. **Add intermediate materialized results** (break query into steps)

**Exam Focus Points:**
- Know what causes spilling (operator exceeds memory)
- Understand the performance impact
- Know the mitigation strategies

**Reference:** https://docs.snowflake.com/en/user-guide/query-performance-spilling

### Caching in Snowflake

Snowflake has **three layers** of caching:

**1. Metadata Cache** (Automatic, Free)
- Cluster-level metadata (table schemas, column statistics)
- Enables partition pruning decisions
- Cannot be disabled
- Very fast (no I/O required)

**2. Query Result Cache** (Automatic, Account-Level, Free)
- Stores query results for 24 hours
- Reused if exact same query runs again
- Invalidated if underlying table changes
- Applies to SELECT queries only
- Can be disabled per-session: `ALTER SESSION SET USE_CACHED_RESULT = FALSE;`

**3. Warehouse Cache** (Per-Cluster, Temporary)
- Local SSD cache of data files read
- Persists within a cluster while running
- Cleared when warehouse is suspended
- Fastest cache layer (local hardware)
- Automatically leveraged

**Example:**
```
Query 1: SELECT * FROM large_table (100GB) → Scans storage, stores result cache, loads data to warehouse cache
Query 2: SELECT * FROM large_table (100GB) → Result cache HIT, returns instantly
Query 3: SELECT col1 FROM large_table → Result cache MISS (different SELECT list), but warehouse cache HIT on data files
Query 4 (after 24h): SELECT * FROM large_table → Result cache EXPIRED, all caches cleared
```

**Cache Invalidation:**
- Result cache: Invalidated on any DML (INSERT, UPDATE, DELETE, TRUNCATE)
- Warehouse cache: Invalidated on warehouse suspend
- Metadata cache: Invalidated on schema/table metadata changes

**Exam Focus Points:**
- Know all three caching layers and when they apply
- Understand which caches are "free" vs. warehouse memory
- Know that result cache is 24-hour default (configurable by edition)
- Understand cache invalidation triggers
- Know that caching is transparent (no query changes needed)

**Reference:** https://docs.snowflake.com/en/user-guide/query-performance-query-caching

### Micro-Partition Pruning

**Partition Pruning:** Snowflake skips micro-partitions that cannot contain rows matching the WHERE clause.

**How It Works:**
1. Each micro-partition has min/max statistics per column
2. Query WHERE clause compared to partition min/max
3. Partitions that cannot match are skipped

**Example:**
```
Table: orders (10B rows, 1000 micro-partitions, 1GB each)

Without Clustering:
- Partitions randomly ordered
- All 1000 partitions scanned
- 1000GB total bytes scanned

With Clustering on order_date:
- Partitions ordered by order_date
- Query: WHERE order_date = '2025-01-15'
- Only partitions with min/max dates containing 2025-01-15 scanned
- ~10 partitions scanned
- 10GB total bytes scanned (100x reduction!)
```

**Efficiency Metrics:**
- **Partition Count:** Number of partitions scanned
- **Bytes Scanned:** Actual bytes read from storage
- **Pruning Efficiency:** (Total Partitions - Scanned Partitions) / Total Partitions

**Exam Focus Points:**
- Know that pruning is automatic (no configuration)
- Understand that clustering improves pruning
- Know that clustered queries cost significantly less
- Understand metadata cache enables pruning (fast, free)

**Reference:** https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions

### Query History

Track all queries executed in the account via `SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY`.

**Key Columns:**
- QUERY_ID: Unique query identifier
- USER_NAME: Who ran the query
- QUERY_TEXT: The SQL
- START_TIME, END_TIME: Execution timeframe
- TOTAL_ELAPSED_TIME: Duration (milliseconds)
- BYTES_SCANNED: Data read from storage
- ROWS_PRODUCED: Output rows
- WAREHOUSE_NAME: Which warehouse
- DATABASE_NAME, SCHEMA_NAME: Target objects
- QUERY_TYPE: SELECT, INSERT, UPDATE, DELETE, CREATE, etc.

**Analysis:**
```sql
-- Find slowest queries
SELECT QUERY_ID, USER_NAME, TOTAL_ELAPSED_TIME, BYTES_SCANNED
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
ORDER BY TOTAL_ELAPSED_TIME DESC
LIMIT 10;

-- Find most expensive queries (bytes × warehouse size)
SELECT QUERY_ID, WAREHOUSE_NAME, BYTES_SCANNED, TOTAL_ELAPSED_TIME
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE BYTES_SCANNED > 100 * 1024 * 1024 * 1024  -- > 100GB
ORDER BY BYTES_SCANNED DESC;
```

**Exam Focus Points:**
- Know that QUERY_HISTORY is available for 365 days
- Understand key metrics (BYTES_SCANNED for cost, TOTAL_ELAPSED_TIME for performance)
- Know this is in ACCOUNT_USAGE schema (account-level, not per-warehouse)

**Reference:** https://docs.snowflake.com/en/sql-reference/account-usage/query-history

---

## 3.2 Virtual Warehouse Configuration

### Warehouse Types

**Standard Warehouses (Default)**
- General-purpose compute
- Suitable for most workloads

**Snowpark-Optimized Warehouses**
- Larger memory footprint
- For Snowpark Python/Scala jobs
- Same per-credit cost, just more memory per credit

**Cloud Services Warehouses**
- Snowflake-managed (for system operations)
- Not user-facing

**Exam Focus Points:**
- Know the difference (standard vs. Snowpark-optimized memory)
- Understand Snowpark-optimized for data science workloads
- Know they cost the same (different resource allocation)

**Reference:** https://docs.snowflake.com/en/user-guide/warehouses-overview

### Warehouse Sizing

Snowflake uses **"T-Shirt" sizing** for warehouses:

| Size | Credits/Second | Typical Use Case |
|------|----------------|------------------|
| XS | 1 | Development, testing |
| S | 2 | Small analytics, BI |
| M | 4 | Medium analytics |
| L | 8 | Large analytics |
| XL | 16 | Enterprise analytics |
| 2XL | 32 | Very large data (multiple TB) |
| 3XL-6XL | 64-128 | Massive workloads (100B rows+) |

**Cost Model:**
- Size directly impacts cost (2X larger = 2X cost)
- Also impacts query performance (larger = faster for memory-bound queries)

**Right-Sizing:**
- Too small: Slow queries, spilling
- Too large: Wasted costs
- Optimal: Queries complete without spilling, no idle time

**Exam Focus Points:**
- Know that larger warehouses cost more and are faster
- Understand the trade-off (cost vs. performance)
- Know that auto-scaling can optimize cost for variable workloads

**Reference:** https://docs.snowflake.com/en/user-guide/warehouses-overview#warehouse-size

### Multi-Cluster Warehouses (Enterprise+ Edition)

**Purpose:** Handle spiky concurrency (many simultaneous queries).

**Configuration:**
```sql
CREATE WAREHOUSE multi_wh
WITH WAREHOUSE_SIZE = 'L'
MIN_CLUSTER_COUNT = 1
MAX_CLUSTER_COUNT = 10
SCALING_POLICY = 'STANDARD';
```

**How It Works:**
- Starts with MIN_CLUSTER_COUNT clusters
- Adds clusters (up to MAX_CLUSTER_COUNT) as queries queue
- Removes clusters when demand drops
- All clusters are identical size

**Cost Model:**
- Only running clusters are billed
- Multi-cluster overhead: +10% Cloud Services cost

**Scaling Policies:**

1. **STANDARD:** Maximize Query Throughput
   - Add cluster if queries queue
   - Aggressive scaling (more clusters, higher cost)
   - Use when: Concurrency critical, cost secondary

2. **ECONOMY:** Balance Throughput and Cost
   - Conservative scaling
   - Wait longer before adding clusters (batch queries)
   - Use when: Cost important, concurrency less critical

3. **AUTO:** Machine Learning-Based (Beta)
   - Snowflake ML model optimizes for workload pattern
   - Balances throughput and cost

**Exam Focus Points:**
- Know that multi-cluster is for concurrency (not raw performance)
- Understand the scaling policies (STANDARD vs. ECONOMY trade-off)
- Know that multi-cluster adds ~10% cloud services cost overhead
- Understand MIN/MAX cluster configuration

**Reference:** https://docs.snowflake.com/en/user-guide/warehouses-multicluster

### Warehouse Settings and Access

**Key Settings:**

| Setting | Purpose | Default |
|---------|---------|---------|
| AUTO_SUSPEND | Minutes idle before warehouse suspends | 10 minutes |
| AUTO_RESUME | Auto-resume on query | TRUE |
| INITIALLY_SUSPENDED | Warehouse starts suspended | FALSE |
| QUERY_ACCELERATION_MAX_RUNNING_TIME | Max time before offloading to query acceleration | 0 (disabled) |
| STATEMENT_QUEUING_TIMEOUT_IN_SECONDS | Max time query waits in queue | 0 (unlimited) |
| MAX_DATA_SCANNED_PER_QUERY | Limit bytes scanned per query | NULL (unlimited) |

**Access Control:**
```sql
GRANT USAGE ON WAREHOUSE my_wh TO ROLE analyst_role;  -- Can use
GRANT MODIFY ON WAREHOUSE my_wh TO ROLE dba_role;  -- Can suspend, resize
GRANT MONITOR ON WAREHOUSE my_wh TO ROLE analyst_role;  -- Can view query history
```

**Exam Focus Points:**
- Know AUTO_SUSPEND for cost optimization (no charges when idle)
- Understand AUTO_RESUME for user convenience
- Know MAX_DATA_SCANNED_PER_QUERY for cost protection
- Understand warehouse access control (USAGE, MODIFY, MONITOR)

**Reference:** https://docs.snowflake.com/en/sql-reference/sql-ddl-warehouse

---

## 3.3 Virtual Warehouse Performance Tools

### Monitoring Warehouse Load

**Key Metrics:**
- **Running Queries:** Current queries executing
- **Queued Queries:** Waiting for cluster availability
- **Queue Time:** How long queries wait
- **CPU Utilization:** Compute usage percentage

**Monitoring Tools:**

1. **Snowsight Dashboard:** Visual warehouse metrics
2. **WAREHOUSE_METERING_HISTORY:** Historical usage
3. **WAREHOUSE_LOAD_HISTORY:** Queue and active query counts

**Example Query:**
```sql
SELECT 
  WAREHOUSE_NAME,
  AVG_RUNNING_QUERIES,
  AVG_QUEUED_QUERIES,
  AVG_QUEUE_TIME_MS
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_LOAD_HISTORY
WHERE DATE(TIMESTAMP) = CURRENT_DATE
GROUP BY WAREHOUSE_NAME;
```

**Optimization Actions:**
- Queued queries → Add clusters (multi-cluster) or larger size
- Low utilization → Reduce size or suspend
- High CPU → Check for inefficient queries

**Exam Focus Points:**
- Know how to identify warehouse bottlenecks
- Understand queue time as indicator of undersizing
- Know the mitigation strategies

**Reference:** https://docs.snowflake.com/en/user-guide/warehouses-monitoring

### Scaling Up vs. Scaling Out

**Scaling Up (Vertical Scaling):**
- Increase warehouse size (XS → S → M, etc.)
- Single larger cluster
- Faster queries (more memory per query)
- Lower concurrency capability

**Scaling Out (Horizontal Scaling):**
- Increase cluster count (1 cluster → 2 clusters, etc.)
- Multiple clusters in parallel
- Better concurrency (each cluster handles independent queries)
- Slightly higher cost (multi-cluster overhead)

**Decision Matrix:**

| Scenario | Action | Reason |
|----------|--------|--------|
| Few users, slow queries | Scale Up | Increase memory for faster queries |
| Many users, queries waiting in queue | Scale Out | Distribute queries across clusters |
| Variable workload (spiky) | Multi-cluster + auto-suspend | Handle peaks, save on idle |
| Consistent high load | Scale Up | Single large cluster most cost-efficient |

**Exam Focus Points:**
- Know the difference between scaling up and out
- Understand when to use each strategy
- Know that multi-cluster requires Enterprise edition
- Understand cost implications

**Reference:** https://docs.snowflake.com/en/user-guide/warehouses-overview

### Query Acceleration Service

**Purpose:** Speed up large result set scanning.

**How It Works:**
- Scans accelerated by Snowflake-managed service (not user warehouse)
- Offloads heavy scanning to dedicated hardware
- Billed separately (Cloud Services)

**Use Cases:**
- Large BI queries returning millions of rows
- Dashboard queries scanning huge tables
- Expensive analytical queries

**Limitations:**
- Cannot accelerate all query types (some operations unsupported)
- Additional cost (10-100% overhead for scan acceleration)
- Only beneficial if scan is bottleneck (not join/aggregate)

**Exam Focus Points:**
- Know that Query Acceleration is a serverless acceleration service
- Understand it's for scan-heavy queries
- Know the additional cost
- Recognize when it helps (full table scans, large result sets)

**Reference:** https://docs.snowflake.com/en/user-guide/query-acceleration-service

---

## 3.4 Query Performance Optimization

### Materialized Views

**Definition:** Pre-computed query results stored as a table, automatically refreshed.

**Syntax:**
```sql
CREATE MATERIALIZED VIEW mv_daily_sales AS
SELECT DATE(order_date) AS sale_date, SUM(amount) AS total_sales
FROM orders
GROUP BY DATE(order_date);
```

**Refresh Strategies:**

1. **On Write (Default):**
   - Refresh when underlying table changes
   - Always current
   - Cost: Automatic refresh operations

2. **On Schedule:**
   - Refresh at scheduled times (hourly, daily, etc.)
   - Lower cost (control when refresh happens)
   - Risk: Can be stale between refreshes

3. **Manual:**
   - Refresh on-demand via `ALTER MATERIALIZED VIEW ... REFRESH`
   - Lowest cost
   - Risk: Must remember to refresh

**Performance Benefit:**
- Pre-aggregated results stored (no computation on query)
- Faster than original query by orders of magnitude
- Cost trade-off: Storage + refresh cost vs. query speed

**Query Rewrite:**
- Snowflake automatically detects if a materialized view can answer a query
- Transparent optimization (no query change needed)

**Example:**
```sql
-- Original query (slow)
SELECT DATE(order_date), SUM(amount)
FROM orders
GROUP BY DATE(order_date);

-- If mv_daily_sales exists, Snowflake uses it (fast)
-- You don't change your query—it happens automatically
```

**Limitations:**
- Materialized views only available in Enterprise+ editions
- Storage cost (view stored like a table)
- Refresh cost (on-write refresh can be expensive if underlying table changes frequently)

**Exam Focus Points:**
- Know that materialized views are pre-computed results
- Understand the refresh strategies and trade-offs
- Know they require Enterprise edition
- Understand query rewrite (automatic optimization)
- Know when they're cost-effective (frequent queries on same aggregation)

**Reference:** https://docs.snowflake.com/en/user-guide/views-materialized

### Clustering and Clustering Keys

**Covered in Domain 1.4** but reinforced here for performance context.

**Key Points for Performance:**
- Clustering key on large tables dramatically improves query performance
- Clustered queries may run 100x faster for range queries
- Reclustering cost (automatic task) vs. benefit trade-off

**Exam Focus Points:**
- Know that clustering improves partition pruning
- Understand the cost-benefit (better queries, cost of reclustering)
- Know when clustering is worth it (large tables, 1B+ rows, frequently filtered columns)

### Search Optimization Service

**Covered in Domain 1.4** but key for performance.

**Performance Context:**
- Alternative to clustering for non-sorted column access patterns
- Builds indexes instead of reorganizing data
- Transparent (no query changes)
- Automatic refresh (incremental)

**Exam Focus Points:**
- Know search optimization as clustering alternative
- Understand it's better for high-cardinality columns
- Know the cost (cloud services, automatic)

### Persisted Query Results

**Definition:** Query results cached by Snowflake for 24 hours.

**Benefit:** If the exact query runs again, result is returned instantly (no scan).

**Invalidation:** On any DML to underlying tables.

**Exam Focus Points:**
- Know that result caching is automatic and free
- Understand it only works for identical queries
- Know the 24-hour retention (configurable by edition)

### Caching Types and Impact Summary

| Cache Type | Scope | Speed | Cost | Use Case |
|-----------|-------|-------|------|----------|
| Metadata Cache | Cluster | Instant | Free | Partition pruning decisions |
| Result Cache | Account | Instant | Free | Repeated identical queries |
| Warehouse Cache | Cluster | Very Fast | Free* | Repeated data file access |

*Free in sense that it's included in warehouse cost, not separate billing.

**Exam Focus Points:**
- Know all three caching layers
- Understand which are automatic and free
- Know cache invalidation triggers
- Understand the impact on query costs

**Reference:** https://docs.snowflake.com/en/user-guide/query-performance-query-caching

---

## 3.5 Cost Optimization Concepts and Best Practices

### Understanding Snowflake Costs

**Cost Model:**
- **Compute:** Per second, per credit
- **Storage:** Per TB per month
- **Data Transfer:** Per GB (egress, replication)
- **Cloud Services:** Percentage of compute (typically 10-20%)

**Cost Components:**

1. **Compute Cost**
   - Virtual warehouse size × duration × credit price
   - Example: Large warehouse (8 credits/second) × 100 seconds = 800 credits
   - Credit price varies by region and edition ($2-$4 USD per credit)

2. **Storage Cost**
   - Average daily storage amount × credit price × days
   - Example: 1TB average × 365 days × $0.40/TB/month = $120/month
   - Lower than compute for most organizations

3. **Cloud Services Cost**
   - Percentage of compute usage (typically 10-20%)
   - Example: 1000 credits of compute → 100-200 credits of cloud services
   - Automatic, not user-configurable

4. **Data Transfer Cost**
   - Egress from cloud provider (S3 downloads outside AWS)
   - Cross-region replication
   - Typically smallest cost component

**Exam Focus Points:**
- Know the primary cost drivers (compute, then storage, then cloud services)
- Understand credit-based pricing
- Know that cloud services scale with compute

### Cost Insights Feature

**Location:** Snowsight Cost tab

**Attribution Dimensions:**
- **Warehouse:** Which warehouse consumed credits
- **User:** Which user's queries
- **Database:** Which database
- **Date:** Timeline
- **Query:** Drill down to individual queries

**Example Analysis:**
```
Cost Dashboard:
- Total Cost: $10,000/month
- Compute: $7,000 (70%)
  - Reporting_WH: $4,000 (slow BI queries)
  - ETL_WH: $2,000 (nightly loads)
  - Dev_WH: $1,000 (development, unused during off-hours)
- Storage: $2,500 (25%)
  - Raw_Data: $1,500 (large raw datasets)
  - Warehouse: $1,000 (processed tables)
- Cloud Services: $500 (5%)

Actions:
- Optimize Reporting_WH queries → Materialized views, clustering
- Add auto-suspend to Dev_WH → Save on idle cost
- Archive old raw data → Reduce storage
```

**Exam Focus Points:**
- Know that Cost Insights provides detailed cost attribution
- Understand dimensions of analysis (warehouse, user, database)
- Know this is the primary tool for cost optimization

**Reference:** https://docs.snowflake.com/en/user-guide/cost-understanding-compute

### Cost Optimization by Feature Usage

**Table Type Selection:**
- Permanent: For production data (pay for Time Travel + Fail-safe)
- Transient: For ephemeral data (no Time Travel overhead)
- Temporary: For session-scope work

**View Optimization:**
- Materialized views: Cost (storage + refresh) vs. benefit (query speed)
- Only use if query runs frequently
- Return on investment: (Refresh cost) < (Original query cost × frequency)

**File Format Selection for Loading:**
- Parquet: Better compression (smaller files, less bandwidth)
- CSV: Larger files, more scanning overhead
- Example: 100GB CSV = 20GB Parquet (5x compression)

**Semi-Structured Data:**
- VARIANT columns have higher storage costs
- Parse/flatten only needed columns
- Don't store entire JSON if only 2 fields needed

**Exam Focus Points:**
- Know the cost implications of each choice
- Understand the trade-offs (storage vs. compute)
- Know when each is worth it

### Storage Cost Optimization

**Identifying High-Cost Tables:**
```sql
SELECT 
  TABLE_NAME,
  BYTES_SCANNED / 1024 / 1024 / 1024 AS BYTES_GB,
  (BYTES_SCANNED * 0.40) / 1024 / 1024 / 1024 AS MONTHLY_COST_USD
FROM SNOWFLAKE.ACCOUNT_USAGE.TABLE_STORAGE_METRICS
WHERE DATE(MEASUREMENT_DATE) = CURRENT_DATE - 1
ORDER BY BYTES_SCANNED DESC
LIMIT 20;
```

**Optimization Strategies:**

1. **Data Retention Policies**
   - Archival: Move old data to external storage (S3)
   - Deletion: Drop data older than X days
   - Compression: Archive historical data in compressed formats

2. **Cloning for Dev/Test**
   - Zero-copy clone: No storage cost until data diverges
   - Much cheaper than copying full datasets

3. **Time Travel Tuning**
   - Default: 1 day (standard edition) or 90 days (business critical)
   - Consider: Do you need 90 days of history?
   - Cost: More days = more storage

4. **Fail-Safe Tuning**
   - Fixed 7 days (non-configurable)
   - For critical data: Worth the cost
   - For non-critical: Consider cost impact

**Exam Focus Points:**
- Know the storage cost drivers
- Understand Time Travel/Fail-safe cost implications
- Know archival and deletion strategies
- Understand cloning for cost-effective testing

### Compute Cost Optimization

**Virtual Warehouse Auto-Suspend:**
- Most important cost optimization
- Example: Developer runs daily 1-hour ETL job
  - Without auto-suspend: 24 hours × 8 credits/sec = 691,200 credits/month
  - With 10-minute auto-suspend: 1 hour × 8 credits/sec × 22 days = 633,600 credits/month
  - Savings: ~8% per month (add up across organization)

**Warehouse Right-Sizing:**
- Over-sized warehouse: Running L (8 cr/sec) when S (2 cr/sec) sufficient
  - Cost: 4x more than necessary
- Under-sized warehouse: Running S when L needed
  - Cost: More query time, higher total credits

**Query Optimization:**
- Reduce bytes scanned (via WHERE, clustering, indexes)
- Every 10% reduction in bytes = 10% cost reduction (same warehouse)

**Materialized Views:**
- Pre-computation cost: Worth it if query runs >10x/day on same aggregation

**Multi-Cluster Configuration:**
- Auto-scale up/down based on demand
- ECONOMY mode: Save on multi-cluster overhead
- Cost: Only run clusters when needed

**Exam Focus Points:**
- Know that auto-suspend is the easiest cost saving
- Understand warehouse sizing and utilization
- Know query optimization ROI
- Understand multi-cluster cost implications

### Cloud Services Cost Optimization

**Cloud Services:** ~10-20% of compute cost, automatic.

**Cost Drivers:**
- Query compilation (metadata operations)
- Cached result storage
- Cloud Services tasks (auto-suspend, reclustering, etc.)

**Optimization (Limited):**
- Reduce query count (batch queries)
- Batch data loading (fewer loads = fewer cloud services tasks)
- Avoid excessive metadata operations

**Exam Focus Points:**
- Know that cloud services cost is tied to compute
- Understand you cannot directly control it
- Know it's relatively small percentage (~15% average)

### Serverless Features Costs

**Snowpipe:** Higher cost per credit than warehouse compute
- Example: 1 credit of Snowpipe ≈ 2-3 credits of warehouse compute
- Use when: Real-time loading is critical
- Avoid when: Batch loading sufficient

**Query Acceleration Service:** Additional cost
- Example: +50% to scans using acceleration
- Use when: Scan is bottleneck and query runs frequently

**Snowflake SQL API:** Serverless compute (higher per-unit cost)
- Use when: Bursty, infrequent queries
- Avoid when: High-frequency queries (use warehouse)

**Materialized View Auto-Refresh:** Cloud Services cost
- Cost: Refresh operations
- Use when: Query benefit > refresh cost

**Exam Focus Points:**
- Know that serverless features cost more per-unit than warehouse
- Understand when serverless is worth it (real-time, infrequent)
- Know when to use warehouse instead (frequent, batch)

### Cost Monitoring and Control

**Resource Monitors:**
- Set warehouse credit limits
- Alerts at thresholds
- Auto-suspend when limit reached

**Syntax:**
```sql
CREATE RESOURCE MONITOR monthly_limit
WITH CREDIT_QUOTA = 10000
FREQUENCY = MONTHLY
START_TIMESTAMP = '2025-01-01 00:00:00'
TRIGGERS ON 50 PERCENT DO NOTIFY
TRIGGERS ON 90 PERCENT DO NOTIFY
TRIGGERS ON 100 PERCENT DO SUSPEND;

ALTER WAREHOUSE my_wh SET RESOURCE_MONITOR = monthly_limit;
```

**Snowflake Budgets Service:**
- Account-level budgets
- Cost tracking against target
- Alerts when approaching/exceeding

**Cost Center Tagging:**
```sql
CREATE TAG cost_center ALLOWED_VALUES = ('engineering', 'marketing', 'finance');
ALTER TABLE my_table SET TAG cost_center = 'engineering';

-- Then attribute costs to cost centers
SELECT 
  TAG:cost_center,
  SUM(CREDITS_USED)
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
GROUP BY TAG:cost_center;
```

**ACCOUNT_USAGE Schema:**
- `METERING_HISTORY`: Daily credit consumption
- `WAREHOUSE_METERING_HISTORY`: Warehouse-level details
- `STORAGE_USAGE`: Table-level storage (daily)

**Exam Focus Points:**
- Know resource monitors for cost control
- Understand budgets for forecasting
- Know cost center tagging for chargeback
- Understand ACCOUNT_USAGE for deep analysis

**Reference:** https://docs.snowflake.com/en/user-guide/cost-monitoring-budgets

---

# CHAPTER 5: DOMAIN 4.0 - DATA LOADING AND UNLOADING (12%)

## 4.1 Data Loading Concepts and Best Practices

### Stages

**Stage:** A location where files are stored (Snowflake's staging area).

**Types:**

1. **Internal Stages** (Snowflake-managed)
   - User Stage: Private, per-user (`@~`)
   - Table Stage: Tied to a table (`@%table_name`)
   - Named Stage: Reusable, shared (`@my_stage`)

2. **External Stages** (Cloud provider storage)
   - S3 (AWS)
   - Azure Blob Storage
   - GCS (Google Cloud Storage)
   - Authentication: Credentials, IAM roles, or SAS tokens

**Stage Creation:**
```sql
-- Internal stage
CREATE STAGE my_internal_stage;

-- External stage (S3)
CREATE EXTERNAL STAGE my_s3_stage
URL = 's3://my-bucket/data/'
CREDENTIALS = (AWS_KEY_ID = 'xxx' AWS_SECRET_KEY = 'yyy');

-- External stage with IAM role (preferred)
CREATE EXTERNAL STAGE my_s3_stage_iam
URL = 's3://my-bucket/data/'
STORAGE_INTEGRATION = 'my_s3_integration';
```

**Stage Properties:**
- Encryption (client-side and/or server-side)
- Compression format
- File size limits
- Directory structure

**Exam Focus Points:**
- Know internal vs. external stages
- Understand when to use each (internal for temp, external for ongoing)
- Know stage naming conventions
- Understand stage ownership and access control

**Reference:** https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage

### File Formats

**Supported Formats:**

1. **CSV** (Comma-Separated Values)
   - Most compatible
   - Larger files (less compression)
   - Parameters: DELIMITER, RECORD_DELIMITER, ESCAPE, QUOTE

2. **Parquet**
   - Columnar, highly compressed
   - Smaller files (5-10x compression vs. CSV)
   - Ideal for BI tools
   - Parameters: SNAPPY compression by default

3. **JSON**
   - Semi-structured
   - Parameters: STRIP_OUTER_ARRAY, ENABLE_OCTAL

4. **Avro**
   - Schema evolution support
   - Parameters: None (schema embedded)

5. **ORC**
   - Columnar, compression
   - Smaller than CSV

6. **XML**
   - Hierarchical data
   - Parameters: DOCUMENT_FORM, STRIP_OUTER_ELEMENT

**File Format Creation:**
```sql
CREATE FILE FORMAT csv_format
  TYPE = 'CSV'
  FIELD_DELIMITER = ','
  RECORD_DELIMITER = '\n'
  NULL_IF = ('NULL', '')
  EMPTY_FIELD_AS_NULL = TRUE;

CREATE FILE FORMAT parquet_format
  TYPE = 'PARQUET'
  COMPRESSION = 'SNAPPY';
```

**Exam Focus Points:**
- Know the supported formats
- Understand compression trade-offs (CSV larger, Parquet smaller)
- Know format-specific parameters
- Understand NULL/empty string handling

**Reference:** https://docs.snowflake.com/en/user-guide/data-load-create-file-format

### File Size and Parallelism

**Optimal File Size:** 100-1000 MB compressed

**Why:**
- Very small files: High overhead, poor parallelism (100MB file = 1 task, can't parallelize)
- Very large files: Can't split, single-threaded loading, slow

**Example:**
```
Load 10GB of data

Scenario 1: 1 file (10GB)
- 1 loading thread
- 10 minutes to load

Scenario 2: 10 files (1GB each)
- 10 loading threads in parallel
- 1 minute to load (10x faster)

Scenario 3: 100 files (100MB each)
- 100 loading threads in parallel
- 1 minute to load (same as scenario 2, parallelism saturated)

Scenario 4: 1000 files (10MB each)
- Overhead managing 1000 files
- More time than scenario 3 (diminishing returns)
```

**Best Practice:** Consolidate small files before loading.

**Exam Focus Points:**
- Know optimal file size (100-1000MB)
- Understand parallelism benefits
- Know that file size impacts loading performance
- Understand consolidation strategy for small files

### Snowpipe (Continuous Loading)

**Snowpipe:** Automatically detects new files and loads them (event-driven).

**Architecture:**
1. Files uploaded to cloud storage
2. Cloud notification (SQS, Event Grid, Pub/Sub) triggered
3. Snowpipe detects notification
4. Files loaded automatically

**Advantages:**
- Real-time data ingestion
- No manual COPY INTO needed
- Automated, hands-off

**Disadvantages:**
- Higher cost per credit (serverless compute)
- Eventual consistency (not immediate)
- Limited visibility (logs harder to access)

**Snowpipe Types:**
1. **Standard Snowpipe:** Event-driven, automatic
2. **Snowpipe Express:** REST-based, simplified, higher cost

**Exam Focus Points:**
- Know Snowpipe is event-driven and automatic
- Understand the cost model (serverless, higher per-unit)
- Know when to use Snowpipe (real-time) vs. COPY INTO (batch)
- Understand Snowpipe Express as simpler alternative

**Reference:** https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro

---

## 4.2 Data Loading Commands

### COPY INTO

**Most common load command.**

**Syntax:**
```sql
COPY INTO my_table
FROM @my_stage/data/
FILE_FORMAT = (FORMAT_NAME = 'csv_format')
ON_ERROR = 'SKIP_FILE'
PURGE = TRUE;
```

**Parameters:**
- **FROM:** Stage or URL
- **FILE_FORMAT:** Format name or inline definition
- **ON_ERROR:** SKIP_FILE (skip bad file), CONTINUE (skip bad rows), ABORT_STATEMENT (stop)
- **PURGE:** Delete files after successful load
- **FILES:** List specific files
- **PATTERN:** Regex for files to load

**Data Transformation:**
```sql
COPY INTO my_table (col1, col2, col3)
FROM (
  SELECT $1, $2, $3
  FROM @my_stage/data/
  FILE_FORMAT = 'csv_format'
  WHERE $1 > 100  -- Filter rows
)
ON_ERROR = 'CONTINUE';
```

**Exam Focus Points:**
- Know COPY INTO is the primary load command
- Understand PURGE for cleanup
- Know ON_ERROR handling
- Understand transformation capability (SELECT within COPY)

**Reference:** https://docs.snowflake.com/en/sql-reference/sql-copy-into-table

### CREATE STAGE, CREATE FILE FORMAT, CREATE PIPE

**Already covered in 4.1** (stages, formats) and **1.3 (pipes)**.

**For exam:** Know these are prerequisites for loading.

### External Tables

**External Table:** Metadata-only reference to external data (doesn't copy).

**Syntax:**
```sql
CREATE EXTERNAL TABLE ext_table (
  id INT,
  name VARCHAR,
  age INT
)
LOCATION = @s3_stage/users/
FILE_FORMAT = (FORMAT_NAME = 'parquet_format')
AUTO_REFRESH = TRUE;
```

**Benefits:**
- No copy overhead (metadata-only)
- Data stays in cloud storage (cheaper)
- Can still query as if in Snowflake

**Limitations:**
- Cannot INSERT/UPDATE/DELETE (read-only)
- Slower queries than native tables (data not optimized)

**Use Cases:**
- Data lake exploration (before committing to Snowflake)
- Cost-sensitive scenarios (no copy cost)

**Exam Focus Points:**
- Know external tables are metadata-only
- Understand they don't copy data
- Know they're read-only
- Understand use cases (exploration, cost-sensitive)

**Reference:** https://docs.snowflake.com/en/user-guide/tables-external-intro

### INSERT, INSERT OVERWRITE, PUT, VALIDATE

**INSERT:** Standard row insertion.
```sql
INSERT INTO my_table (col1, col2) VALUES (1, 'a'), (2, 'b');
```

**INSERT OVERWRITE:** Replace entire partition (Iceberg tables).
```sql
INSERT OVERWRITE INTO my_table SELECT * FROM staging_table WHERE date_col = CURRENT_DATE;
```

**PUT:** Upload file from local to internal stage (SnowSQL only).
```
PUT file:///local/path/data.csv @my_stage/data/;
```

**VALIDATE:** Test file format without loading.
```sql
SELECT * FROM TABLE(VALIDATE(@my_stage/data.csv, FILE_FORMAT => 'csv_format'));
```

**Exam Focus Points:**
- Know INSERT for single/bulk row insertion
- Know INSERT OVERWRITE for partition replacement
- Know PUT for file uploads (SnowSQL)
- Know VALIDATE for pre-flight checks

---

## 4.3 Data Unloading Concepts

### File Size and Format

**Optimal Unload File Size:** Similar to loading (100-1000MB).

**Format Selection:**
- **Parquet:** For BI tools, compression, columnar analysis
- **CSV:** For universal compatibility, but larger
- **ORC/Avro:** For specialized use cases

**Example:**
```sql
-- Unload to Parquet (recommended)
COPY INTO @s3_stage/exports/
FROM my_table
FILE_FORMAT = (TYPE = 'PARQUET')
SINGLE = FALSE;  -- Multiple files for parallelism
```

### Compression Methods

**Available Compression:**
- **GZIP:** Most compatible, good compression (default for CSV)
- **BZIP2:** Better compression, slower
- **ZSTD:** Fast, good compression (Snowflake native)
- **SNAPPY:** Fast, lower compression
- **DEFLATE:** Standard, moderate compression
- **None:** Uncompressed (large files)

**Exam Focus Points:**
- Know GZIP is standard
- Understand compression trade-off (size vs. processing time)

### Unloading to Single File

**SINGLE=TRUE:** Output to one file (no parallelism).

**Use Case:**
- Exporting for API responses
- Downloading entire result
- Fixed file requirement

**Trade-off:**
- No parallelism (slower)
- File size must fit memory
- ORDER BY works (single file = consistent order)

**Exam Focus Points:**
- Know SINGLE=TRUE for single-file output
- Understand it disables parallelism
- Know ORDER BY works with SINGLE

---

## 4.4 Data Unloading Commands

### COPY INTO <location>, GET, LIST

**COPY INTO (unload):**
```sql
COPY INTO @s3_stage/exports/
FROM my_table
FILE_FORMAT = 'parquet_format'
SINGLE = FALSE
OVERWRITE = TRUE;
```

**GET:** Download from internal stage (SnowSQL).
```
GET @my_stage/data/file.csv file:///local/path/;
```

**LIST:** List files in stage.
```sql
LIST @my_stage/data/;
```

**Exam Focus Points:**
- Know COPY INTO for unloading
- Know GET/LIST for stage management (SnowSQL commands)
- Understand OVERWRITE for replacing files

**Reference:** https://docs.snowflake.com/en/sql-reference/sql-copy-into-location

---

# CHAPTER 6: DOMAIN 5.0 - DATA TRANSFORMATIONS (18%)

## 5.1 Structured Data Transformations

### Estimation Functions

**APPROX_COUNT_DISTINCT:** Fast cardinality estimation (not exact).

```sql
SELECT APPROX_COUNT_DISTINCT(customer_id) FROM orders;
-- Returns ~1,000,000 (not exact, but fast)

SELECT COUNT(DISTINCT customer_id) FROM orders;
-- Returns exact 987,654 (slower, scans all data)
```

**Use Cases:** Quick data profiling, no need for exact counts.

**Accuracy:** ~2-4% error typical.

**Exam Focus Points:**
- Know APPROX functions for speed
- Understand accuracy trade-off
- Know when to use (exploration, not production counts)

### SAMPLE and TABLESAMPLE

**SAMPLE Clause:**
```sql
-- Row-based: 1000 rows
SELECT * FROM orders SAMPLE (1000 ROWS);

-- Probability-based: 10% of rows
SELECT * FROM orders SAMPLE (10 PERCENT);

-- Reproducible (seeded)
SELECT * FROM orders SAMPLE (10 PERCENT) REPEATABLE (42);
```

**Use Case:** Exploratory analysis, reducing query cost.

**TABLESAMPLE Clause:**
```sql
SELECT * FROM TABLE(SAMPLE(orders, 10 PERCENT));
```

**Exam Focus Points:**
- Know both SAMPLE and TABLESAMPLE
- Understand row-based vs. probability-based
- Know REPEATABLE for reproducibility

**Reference:** https://docs.snowflake.com/en/sql-reference/sql-select#sample

### System Functions

**Aggregate Functions:** SUM, AVG, COUNT, MIN, MAX, STDDEV, etc.

**Window Functions:** ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, NTILE, etc.

```sql
SELECT 
  customer_id,
  order_date,
  amount,
  SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_num,
  LAG(amount, 1) OVER (PARTITION BY customer_id ORDER BY order_date) AS prev_amount
FROM orders;
```

**String Functions:** CONCAT, SUBSTRING, UPPER, LOWER, REPLACE, TRIM, etc.

**Date Functions:** DATE_TRUNC, DATE_ADD, DATE_DIFF, EXTRACT, etc.

**Numeric Functions:** ABS, ROUND, CEIL, FLOOR, POWER, etc.

**Conditional Functions:** CASE, COALESCE, NULLIF, IF, etc.

**Exam Focus Points:**
- Know major function categories
- Understand window functions (PARTITION BY, ORDER BY)
- Know date functions (EXTRACT for year/month/day)
- Don't memorize syntax, but understand concepts

**Reference:** https://docs.snowflake.com/en/sql-reference/functions

### Table Functions and External Functions

**Table Functions:** Return multiple rows.

**FLATTEN:** Expand semi-structured data (covered in 5.2).

**SPLIT_TO_TABLE:** Split strings into rows.
```sql
SELECT value FROM TABLE(SPLIT_TO_TABLE('a,b,c', ','));
-- Returns 3 rows: a, b, c
```

**External Functions:** Call external HTTP services.

```sql
CREATE OR REPLACE EXTERNAL FUNCTION ml_predict(text VARCHAR)
RETURNS VARIANT
API_INTEGRATION = 'my_http_integration'
AS 'https://ml-service.example.com/predict';

SELECT ml_predict('Some text') FROM my_table;
```

**Exam Focus Points:**
- Know table functions return multiple rows
- Understand FLATTEN for semi-structured data
- Know external functions for API integration

**Reference:** https://docs.snowflake.com/en/sql-reference/functions-table

### User-Defined Functions (UDFs)

**Covered in Domain 1.3** but emphasize performance:

**SQL UDFs:** Fastest (inline execution).
**Python/JavaScript UDFs:** Slower (interpreter overhead).
**External UDFs:** Slowest (HTTP latency).
**Vectorized UDFs:** Batch processing for speed.

**Exam Focus Points:**
- Know the performance hierarchy
- Understand when to use each type
- Know vectorized UDFs for batch processing

### Stored Procedures

**Covered in Domain 1.3** but emphasize use cases:

**Use Cases:**
- Multi-step ETL processes
- Transaction control (COMMIT/ROLLBACK)
- Complex procedural logic

**Exam Focus Points:**
- Know when to use stored procedures vs. UDFs
- Understand transaction control in procedures
- Know language support (SQL, Python, Java, JavaScript)

### Streams and Tasks

**Streams:** CDC mechanism (covered in Domain 1.3).
**Tasks:** Scheduled execution (covered in Domain 1.3).

**Combined Pattern (ELT):**
```sql
-- Stream tracks changes on orders
CREATE STREAM orders_stream ON TABLE orders;

-- Task runs on schedule, processes stream
CREATE TASK process_orders
WAREHOUSE = compute_wh
SCHEDULE = '1 minute'
AS
MERGE INTO orders_processed AS target
USING orders_stream AS source ON target.order_id = source.order_id
WHEN MATCHED AND source.metadata$action = 'DELETE' THEN DELETE
WHEN MATCHED THEN UPDATE SET amount = source.amount
WHEN NOT MATCHED THEN INSERT (order_id, amount) VALUES (source.order_id, source.amount);
```

**Exam Focus Points:**
- Know streams for CDC
- Know tasks for automation
- Understand ELT pattern (streams + tasks)

**Reference:** https://docs.snowflake.com/en/user-guide/streams

---

## 5.2 Semi-Structured Data

### VARIANT Data Type

**VARIANT:** Universal container for semi-structured data (JSON, nested objects, arrays).

**Example:**
```sql
CREATE TABLE events (
  event_id INT,
  event_data VARIANT  -- Can hold any JSON structure
);

INSERT INTO events VALUES (1, '{"user_id": 123, "action": "click", "timestamp": "2025-01-14"}');
INSERT INTO events VALUES (2, '{"user_id": 456, "items": [1, 2, 3], "total": 99.99}');
```

**Storage:** Snowflake stores VARIANT as compressed binary + JSON indexing.

**Cost:** Higher storage cost than native types (inefficient for fixed schemas).

**Best Practice:** Flatten VARIANT to relational schema for production tables.

**Exam Focus Points:**
- Know VARIANT is for flexible/semi-structured data
- Understand higher storage cost
- Know to flatten when schema is known

### FLATTEN Command

**Purpose:** Convert nested structure to rows.

```sql
-- Input: JSON array
SELECT * FROM events WHERE event_data:items IS NOT NULL;

-- Output (before FLATTEN):
event_id | event_data
2        | {"user_id": 456, "items": [1, 2, 3], "total": 99.99}

-- FLATTEN to expand array
SELECT 
  event_data:user_id::INT AS user_id,
  value::INT AS item_id
FROM TABLE(FLATTEN(input => event_data, path => 'items', mode => 'ARRAY'))
WHERE event_id = 2;

-- Output (after FLATTEN):
user_id | item_id
456     | 1
456     | 2
456     | 3
```

**FLATTEN Parameters:**
- **INPUT:** The VARIANT column
- **PATH:** Dot-notation path (e.g., 'items', 'user.address.zip')
- **MODE:** 'ARRAY' (expand arrays), 'OBJECT' (expand objects), 'BOTH' (both)
- **RECURSIVE:** TRUE to flatten nested structures
- **SINGLE_ELEMENT:** TRUE to flatten single-element arrays

**LATERAL FLATTEN:** Preserve context from outer query.
```sql
SELECT 
  e.event_id,
  f.value
FROM events e,
LATERAL FLATTEN(input => e.event_data, path => 'items') f;
```

**Exam Focus Points:**
- Know FLATTEN for unpacking nested structures
- Understand LATERAL for context preservation
- Know PATH notation for navigation

**Reference:** https://docs.snowflake.com/en/sql-reference/functions/flatten

### Semi-Structured Data Functions

**GET Operator:** Navigate JSON paths (returns VARIANT).
```sql
SELECT event_data:user_id FROM events;
-- Returns VARIANT: 456 (must cast to extract string/number)

SELECT event_data:user_id::INT FROM events;
-- Cast to INT
```

**GET_PATH:** Dynamic path specification.
```sql
SELECT GET_PATH(event_data, ARRAY_CONSTRUCT('user', 'email')) AS email FROM events;
```

**Type Predicates:** Check data type.
```sql
WHERE TYPEOF(event_data:user_id) = 'NUMBER'
```

**ARRAY/OBJECT Manipulation:**
```sql
-- Create array
SELECT ARRAY_CONSTRUCT(1, 2, 3) AS my_array;

-- Create object
SELECT OBJECT_CONSTRUCT('key1', 'value1', 'key2', 'value2') AS my_object;

-- Array operations
SELECT ARRAY_SIZE([1, 2, 3]);  -- 3
SELECT ARRAY_CONTAINS([1, 2, 3], 2);  -- TRUE
```

**Exam Focus Points:**
- Know GET operator for path navigation
- Understand type predicates
- Know ARRAY/OBJECT construction functions

**Reference:** https://docs.snowflake.com/en/sql-reference/functions-json

---

## 5.3 Unstructured Data

### Directory Tables

**Directory Table:** Metadata table tracking external files (path, size, timestamp).

```sql
CREATE EXTERNAL TABLE unstructured_files
LOCATION = @s3_stage/documents/
FILE_FORMAT = 'parquet_format'
AUTO_REFRESH = TRUE;

-- Query file metadata
SELECT RELATIVE_PATH, FILE_SIZE, LAST_MODIFIED FROM unstructured_files;
```

**Use Case:** Data lake file discovery and tracking.

### SQL File Functions

**READ_TEXT:** Read entire text file as string.
```sql
SELECT READ_TEXT(@s3_stage/document.txt) AS document_content;
```

**STRTOK_SPLIT_TO_TABLE:** Tokenize file content.
```sql
SELECT value FROM TABLE(STRTOK_SPLIT_TO_TABLE(READ_TEXT(@s3_stage/log.txt), '\n'));
-- Splits log file into lines
```

**Exam Focus Points:**
- Know SQL file functions for unstructured data
- Understand READ_TEXT for text file processing
- Know tokenization functions

### Processing Unstructured Data

**UDFs for Unstructured:**
```sql
-- Python UDF for text processing
CREATE OR REPLACE FUNCTION extract_entities(text VARCHAR)
RETURNS ARRAY
LANGUAGE PYTHON
AS $$
import spacy
nlp = spacy.load('en_core_web_sm')
doc = nlp(text)
return [ent.text for ent in doc.ents]
$$;
```

**Use Cases:**
- NLP (named entity recognition, sentiment analysis)
- Image processing
- Document parsing

**Exam Focus Points:**
- Know Python UDFs for complex unstructured processing
- Understand use cases (NLP, image, documents)

**Reference:** https://docs.snowflake.com/en/user-guide/unstructured-data-overview

---

# CHAPTER 7: DOMAIN 6.0 - DATA PROTECTION AND DATA SHARING (12%)

## 6.1 Continuous Data Protection

### Time Travel

**Time Travel:** Query historical data at any point in time (last 1-90 days).

**Configuration:**
```sql
-- Set Time Travel for a database (default 1 day)
ALTER DATABASE my_db SET DATA_RETENTION_TIME_IN_DAYS = 7;

-- Set for a table
ALTER TABLE my_table SET DATA_RETENTION_TIME_IN_DAYS = 30;

-- Query historical state
SELECT * FROM my_table AT (TIMESTAMP => '2025-01-10 10:00:00');

-- Restore dropped table
UNDROP TABLE my_table;
```

**Cost Impact:**
- Each historical version stored
- Standard edition: 1 day (included)
- Business Critical: 1-90 days (configurable, costs storage)

**Use Cases:**
- Accidental data deletion recovery
- Point-in-time analysis
- Data versioning

**Exam Focus Points:**
- Know Time Travel retention by edition
- Understand cost implications (storage)
- Know syntax for querying history
- Understand UNDROP for recovery

**Reference:** https://docs.snowflake.com/en/user-guide/data-time-travel

### Fail-Safe

**Fail-Safe:** Automatic recovery period **after** Time Travel expires.

**Characteristics:**
- 7 days (fixed, non-configurable)
- Data only accessible to Snowflake support (not user-accessible)
- For disaster recovery (system failure, malicious deletion)

**Cost:** Only storage, no compute charges.

**Timeline:**
```
Day 0: Data deleted/modified
Days 1-1: Time Travel accessible (1-90 days depending on config)
Days 2-8: Fail-safe accessible (7 days, automatic)
Day 9+: Data permanently deleted
```

**Exam Focus Points:**
- Know Fail-safe is 7 days (fixed)
- Understand it's automatic (no configuration)
- Know it's for disaster recovery only

**Reference:** https://docs.snowflake.com/en/user-guide/data-failsafe

### Data Encryption

**At Rest (Default):**
- Cloud provider default encryption (AES-256)
- Snowflake manages keys

**In Transit (Default):**
- TLS 1.2+ for all connections
- Encrypted by default

**Customer-Managed Keys (BYOK):**
- Bring your own encryption keys
- Manage in AWS/Azure/GCP key management service
- Higher compliance (you control keys)

**Exam Focus Points:**
- Know encryption is default and transparent
- Understand BYOK for compliance requirements
- Know TLS 1.2+ for transit encryption

**Reference:** https://docs.snowflake.com/en/user-guide/encryption-by-default

### Zero-Copy Cloning

**Cloning:** Create independent copy (metadata-only initially).

**Syntax:**
```sql
-- Clone table
CREATE TABLE my_table_clone CLONE my_table;

-- Clone database (all tables within)
CREATE DATABASE my_db_clone CLONE my_db;

-- Clone from point-in-time
CREATE TABLE my_table_restore CLONE my_table AT (TIMESTAMP => '2025-01-10 10:00:00');
```

**Cost Model:**
- Initial clone: Metadata-only (free/minimal)
- After changes: Storage only for diverged data
- No compute cost

**Use Cases:**
- Dev/test environments (cheap testing)
- Point-in-time snapshots (backup alternative)
- Table/database reorganization

**Exam Focus Points:**
- Know cloning is zero-copy (metadata-only initially)
- Understand cost implications (free at creation, cost after divergence)
- Know it works across time (CLONE AT TIME TRAVEL)

**Reference:** https://docs.snowflake.com/en/user-guide/object-clone

### Replication and Failover

**Replication:** Copy database to another account/region for disaster recovery.

**Account Failover:** Promote secondary account if primary fails.

**Requirements:**
- Business Critical edition minimum
- Same cloud provider (or cross-cloud in some cases)

**Cost:** Replication operations consumed as credits (cloud services).

**Exam Focus Points:**
- Know replication requires Business Critical edition
- Understand failover for business continuity
- Know cost implications (replication overhead)

**Reference:** https://docs.snowflake.com/en/user-guide/disaster-recovery-intro

---

## 6.2 Data Sharing

### Snowflake Data Sharing Overview

**Data Sharing:** Share databases between Snowflake accounts without copying data.

**Participants:**
- **Provider:** Account sharing data
- **Consumer:** Account receiving shared data

**Key Benefit:** Zero-copy sharing (data shared via metadata, not replicated).

**Types:**

1. **Direct Share:** Named share with specific consumer accounts
2. **Snowflake Marketplace:** Published share for broader discovery

### Account Types

**Standard Account:** Full Snowflake account (provider or consumer).

**Reader Account:** Read-only account created by provider (shared database only).
- Lower cost (no independent compute)
- Consumer can query shared data only

### Creating and Managing Shares

**Provider Side:**

```sql
-- Create share
CREATE SHARE my_share;

-- Grant database to share
GRANT USAGE ON DATABASE my_db TO SHARE my_share;
GRANT USAGE ON SCHEMA my_db.my_schema TO SHARE my_share;
GRANT SELECT ON TABLE my_db.my_schema.my_table TO SHARE my_share;

-- Add consumer account
ALTER SHARE my_share ADD ACCOUNTS = 'consumer_account_name';

-- View share details
SHOW SHARES;
DESCRIBE SHARE my_share;
```

**Consumer Side:**

```sql
-- List shared databases
SHOW DATABASES IN ACCOUNT LIKE '%share%';

-- Create reference to shared database (appears as "db_name" in consumer account)
CREATE DATABASE shared_db FROM SHARE provider_account.my_share;

-- Query shared data
SELECT * FROM shared_db.my_schema.my_table;
```

**Exam Focus Points:**
- Know SHARE is the container
- Understand GRANT to share
- Know ADD ACCOUNTS for consumer management
- Understand databases from shares (read-only on consumer side)

**Reference:** https://docs.snowflake.com/en/user-guide/data-sharing-intro

### Secure Data Sharing with Row-Level Security

**Secure Views:** Hide row/column data based on role.

```sql
-- Provider: Create secure view masking PII
CREATE SECURE VIEW shared_customers AS
SELECT 
  customer_id,
  customer_name,
  CASE 
    WHEN CURRENT_ROLE() IN ('EXECUTIVE') THEN email
    ELSE '***@***.com'
  END AS email
FROM customers;

-- Grant view to share
GRANT SELECT ON VIEW shared_customers TO SHARE my_share;

-- Consumer sees masked emails (unless EXECUTIVE role)
```

**Row-Level Security Policies:**
```sql
CREATE ROW ACCESS POLICY region_policy ON (region VARCHAR)
AS (region = CURRENT_ROLE_GRANTS('REGION_ACCESS')[0]);

-- Consumer only sees rows for their region
```

**Exam Focus Points:**
- Know secure views for data masking in shares
- Understand row-level policies in shared databases
- Understand PII protection mechanisms

### Snowflake Marketplace

**Snowflake Marketplace:** Public listing of shared databases.

**Provider Workflow:**
1. Create share (as above)
2. Publish listing (free, paid, or trial)
3. Snowflake Marketplace handles discovery/onboarding

**Consumer Workflow:**
1. Browse Snowflake Marketplace
2. Request access (instant for free, approval for paid)
3. Automatically added to share
4. Create reference database

**Exam Focus Points:**
- Know Snowflake Marketplace for data monetization
- Understand free vs. paid listings
- Know automatic consumer onboarding

**Reference:** https://docs.snowflake.com/en/user-guide/data-marketplace-intro

---

# CHAPTER 8: EXAM TIPS AND LAST-WEEK CRAM STRATEGY

## Critical Concepts by Domain (Quick Review)

**Domain 1.0 (24%) - Architecture:**
- Separate compute and storage (foundation)
- Micro-partitions (auto, 64-160MB)
- Clustering improves pruning
- Virtual warehouses (scale independently)
- Three layers (storage, compute, cloud services)
- Editions (Standard vs. Business Critical vs. Enterprise)

**Domain 2.0 (18%) - Security:**
- RBAC (role-based access control)
- Built-in roles (ACCOUNTADMIN, SECURITYADMIN, SYSADMIN)
- GRANT/REVOKE syntax
- Privilege hierarchy
- Row/column-level masking
- Federated authentication (SAML, OAuth)

**Domain 3.0 (16%) - Performance & Cost:**
- Query Profile (identify bottlenecks)
- Three caching layers (metadata, result, warehouse)
- Partition pruning (automatic)
- Warehouse sizing (right-size, don't over-provision)
- Multi-cluster for concurrency
- ACCOUNT_USAGE schema (query history, storage)
- Cost Insights (attribution by warehouse/user)
- Resource monitors (credit limits)

**Domain 4.0 (12%) - Loading:**
- Stages (internal vs. external)
- COPY INTO (primary load command)
- File formats (CSV, Parquet, JSON)
- Snowpipe (event-driven, real-time)
- Optimal file size (100-1000MB)
- External tables (metadata-only)

**Domain 5.0 (18%) - Transformations:**
- SQL, Python, JavaScript, Java UDFs
- Stored procedures (transactions)
- FLATTEN (semi-structured)
- Streams (CDC)
- Tasks (scheduling)
- VARIANT data type
- External functions

**Domain 6.0 (12%) - Protection & Sharing:**
- Time Travel (1-90 days depending on edition)
- Fail-safe (7 days, automatic)
- Zero-copy cloning
- Replication (requires Business Critical)
- Shares (provider → consumer)
- Secure views (masking)
- Snowflake Marketplace

## Exam Question Types and Strategies

### Multiple-Choice (Single Select)
- Only ONE correct answer
- Read all options before choosing
- Eliminate obviously wrong choices
- Watch for "best practice" vs. "possible" (best practice is typically correct)

### Multiple-Select (Select All That Apply)
- TWO OR MORE correct answers
- Mark each correct answer separately
- Partial credit possible
- Read carefully—phrases like "Which of the following..." vs. "Which of the following COULD..."

### Scenario-Based Questions
- Real-world contexts
- Require understanding of trade-offs
- Example:
  > "A company is loading 1TB of CSV files daily from S3. Files are 50MB each. Loads must complete within 1 hour. Cost is secondary. Which approach?"
  > A) Snowpipe Express (wrong—too slow, wrong tool)
  > B) COPY INTO with multi-threaded scripts (right—parallel, fast)
  > C) External tables (wrong—doesn't copy data)
  > D) Scheduled tasks (wrong—tasks are for orchestration, not loading)

## Time Management During the Exam

- **115 minutes total, ~100 questions = 1.15 minutes per question average**
- **Strategy:**
  1. Read question carefully (30 seconds)
  2. Attempt answer (30 seconds)
  3. Flag if uncertain, move on (don't spend >2 minutes)
  4. Review flagged questions in final 15 minutes

- **Flagging Questions:** Flag questions where:
  - You're between two answers
  - You're unsure of a technical detail
  - Question is ambiguous

## Common Exam Gotchas

1. **Edition Confusion:**
   - "Multi-cluster warehouses" → Enterprise edition minimum
   - "Materialized views" → Enterprise edition minimum
   - "Replication" → Business Critical minimum
   - Watch for questions hiding edition requirements

2. **Time Travel vs. Fail-Safe:**
   - Time Travel: User-accessible (1-90 days)
   - Fail-Safe: Support-only (7 days, automatic)
   - Both cumulative (9 days total retention)

3. **Scaling Up vs. Out:**
   - Up: Single larger warehouse (faster queries, lower concurrency)
   - Out: More clusters (better concurrency, slightly higher cost)
   - Questions often test understanding of when each applies

4. **Cost Model Confusion:**
   - Compute: Per-second, per warehouse size
   - Storage: Per TB per month
   - Cloud Services: ~15% of compute (automatic)
   - Don't include data transfer in basic cost calculations

5. **Partition Pruning:**
   - Automatic (no configuration)
   - Metadata-driven (fast, free)
   - Improved by clustering
   - Not the same as indexing (indexes explicit, pruning automatic)

6. **UDF vs. Stored Procedure:**
   - UDFs: Return single value, no transaction control
   - Procedures: Can manage transactions, multiple statements
   - Python UDFs still run in Snowflake (not local machine)

7. **Privilege Inheritance:**
   - SECURITYADMIN can grant ACCOUNTADMIN (surprise!)
   - Revoking a role revokes all inherited privileges
   - GRANT ON ... TO ROLE (not user)

8. **Caching Layers:**
   - All three are automatic and transparent
   - Result cache is 24 hours (account-level, free)
   - Warehouse cache clears on suspend
   - Metadata cache is free partition pruning

## Final Review Checklist (48 Hours Before Exam)

- [ ] Review all 6 domains thoroughly
- [ ] Take 1-2 full practice exams (time yourself)
- [ ] Review missed questions from practice exams
- [ ] Understand WHY you missed each question
- [ ] Review Snowflake official documentation on weak areas
- [ ] Get good sleep night before exam
- [ ] Eat healthy breakfast morning of exam
- [ ] Test your exam environment (internet, browser, proctoring software)

## During Exam - Mental Framework

1. **Read question twice** before choosing answer
2. **Eliminate obviously wrong** choices first
3. **Look for patterns** in correct answers:
   - Best practice questions → Choose "most correct" not "also possible"
   - Scenario questions → Choose answer that addresses all constraints
4. **Watch for "all of the above" or "none of the above"** → Usually a clue
5. **Flag and come back** if spending >2 minutes on one question
6. **Review ALL flagged** questions in final 10-15 minutes

---

# CHAPTER 9: PRACTICE QUESTIONS AND SOLUTIONS

## Practice Questions (50 Questions Covering All Domains)

---

### Domain 1.0 Questions (Snowflake Architecture - 12 Questions)

**Question 1.1**
A company is building a new data warehouse on Snowflake. They want to separate compute and storage so they can scale each independently without impacting costs. Which Snowflake architectural principle enables this?

A) Multi-cluster warehouses
B) Separation of compute and storage layers
C) Virtual warehouse auto-scaling
D) Micro-partition clustering

**Answer:** B

**Explanation:** The separation of compute and storage is the fundamental architectural principle of Snowflake that differentiates it from traditional data warehouses. This allows organizations to scale storage and compute independently, which directly addresses the requirement to scale without impacting costs.

**Reference:** https://docs.snowflake.com/en/user-guide/intro-key-concepts#snowflake-architecture

---

**Question 1.2**
Which three layers comprise the Snowflake architecture?

Select THREE.

A) Storage layer (cloud object storage)
B) Compute layer (virtual warehouses)
C) Cloud services layer
D) Metadata layer
E) Security layer

**Answers:** A, B, C

**Explanation:** Snowflake's architecture consists of:
1. Storage layer: Immutable, compressed data in cloud object storage
2. Compute layer: Virtual warehouses for query execution
3. Cloud services layer: Orchestration, metadata, security, query optimization

Metadata layer (D) and Security layer (E) are functions within the cloud services layer, not separate layers.

**Reference:** https://docs.snowflake.com/en/user-guide/intro-key-concepts#snowflake-architecture

---

**Question 1.3**
A table in a Standard Edition Snowflake account has 1 day of Time Travel retention by default. The customer wants to extend this to 30 days. Which edition would they need to upgrade to?

A) Business Critical Edition
B) Enterprise Edition
C) Either Business Critical or Enterprise
D) Standard Edition supports up to 30 days natively

**Answer:** C

**Explanation:** Both Business Critical and Enterprise editions support extended Time Travel retention (up to 90 days). Standard Edition is limited to 1 day. The question doesn't specify a difference in time travel capabilities between Business Critical and Enterprise for this purpose.

**Reference:** https://docs.snowflake.com/en/user-guide/intro-editions

---

**Question 1.4**
Which feature requires an Enterprise Edition license minimum?

A) Multi-cluster warehouses
B) Time Travel
C) Virtual warehouse auto-suspend
D) Query acceleration service

**Answer:** A

**Explanation:** Multi-cluster warehouses are an Enterprise Edition feature. They allow multiple clusters to run in parallel for better concurrency handling.

- Time Travel: Available in all editions (1 day in Standard)
- Auto-suspend: Available in all editions
- Query acceleration service: Available in all editions

**Reference:** https://docs.snowflake.com/en/user-guide/intro-editions

---

**Question 1.5**
Snowflake uses micro-partitions as the fundamental unit of data organization. What is the typical compressed size range of a single micro-partition?

A) 4MB - 16MB
B) 64MB - 160MB
C) 160MB - 512MB
D) 512MB - 1000MB

**Answer:** B

**Explanation:** Micro-partitions in Snowflake are typically 64MB to 160MB in compressed size. This sizing enables efficient partition pruning and provides a balance between granularity and file management overhead.

**Reference:** https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions

---

**Question 1.6**
A data engineer runs a query with a WHERE clause filtering on `order_date = '2025-01-15'`. The table has 1000 micro-partitions, but only 10 micro-partitions contain data for that date based on min/max statistics. What is this optimization called?

A) Clustering
B) Search optimization
C) Micro-partition pruning
D) Query rewrite

**Answer:** C

**Explanation:** Micro-partition pruning (also called partition elimination) skips reading micro-partitions that cannot contain rows matching the WHERE clause. This is automatic in Snowflake and driven by min/max statistics.

- Clustering (A): Organizes data but doesn't describe the skipping mechanism
- Search optimization (B): Index-based optimization
- Query rewrite (D): Materialized view optimization

**Reference:** https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions

---

**Question 1.7**
Which Snowflake tool is designed for rapid application development and enables running Python code directly within Snowflake?

A) Streamlit in Snowflake
B) Snowpark
C) SnowSQL
D) SQL API

**Answer:** B

**Explanation:** Snowpark is a distributed processing framework that allows Python (and Scala/Java) code to run within Snowflake's compute layer. It's ideal for data transformation and complex operations.

- Streamlit in Snowflake (A): For building interactive web applications
- SnowSQL (C): Command-line interface
- SQL API (D): REST-based query execution

**Reference:** https://docs.snowflake.com/en/developer-guide/snowpark/index

---

**Question 1.8**
A data scientist wants to build an interactive dashboard that executes Snowflake queries and displays real-time visualizations. The solution should require no external infrastructure. Which Snowflake tool is most appropriate?

A) Snowpark
B) Streamlit in Snowflake
C) Cortex
D) Python connector

**Answer:** B

**Explanation:** Streamlit in Snowflake is a Python-based framework for building interactive web applications natively integrated with Snowflake. It requires no external infrastructure and can directly query Snowflake data.

**Reference:** https://docs.snowflake.com/en/developer-guide/streamlit/index

---

**Question 1.9**
Which statement about Snowflake's Cloud Services Layer is correct?

A) Users can directly configure cloud services parameters
B) Cloud services cost is typically 10-20% of compute costs and scales automatically
C) Cloud services consumption can be monitored per-query
D) Cloud services is optional and can be disabled

**Answer:** B

**Explanation:** The Cloud Services Layer (authentication, metadata, query optimization) is automatic and costs approximately 10-20% of compute costs. It's not user-configurable and cannot be disabled.

**Reference:** https://docs.snowflake.com/en/user-guide/cost-understanding-compute

---

**Question 1.10**
A company has tables with different sizes and access patterns. Which table type should be used for non-critical staging data that doesn't need historical recovery?

A) Permanent tables
B) Temporary tables
C) Transient tables
D) External tables

**Answer:** C

**Explanation:** Transient tables are ideal for ephemeral, non-critical data. They don't have Time Travel or Fail-safe overhead, reducing storage costs.

- Permanent: For production data (highest cost)
- Temporary: Session-scoped (auto-drop at session end)
- Transient: Account-level persistence, no Time Travel/Fail-safe
- External: Metadata-only reference to cloud storage

**Reference:** https://docs.snowflake.com/en/user-guide/tables-overview

---

**Question 1.11**
Which view type automatically hides the view definition from non-privileged roles while still enabling query execution?

A) Standard view
B) Materialized view
C) Secure view
D) Dynamic view

**Answer:** C

**Explanation:** Secure views hide the definition (encrypted) from all roles except the defining role, useful for protecting proprietary logic or masking row/column data.

**Reference:** https://docs.snowflake.com/en/user-guide/views-secure

---

**Question 1.12**
Materialized views in Snowflake are only available in which editions? (Select all that apply)

A) Standard Edition
B) Business Critical Edition
C) Enterprise Edition
D) All editions

**Answer:** B, C

**Explanation:** Materialized views require Enterprise or Business Critical editions. They are not available in Standard Edition.

**Reference:** https://docs.snowflake.com/en/user-guide/views-materialized

---

### Domain 2.0 Questions (Security - 9 Questions)

**Question 2.1**
Which built-in role is responsible for user and role management but CANNOT create databases or warehouses?

A) ACCOUNTADMIN
B) SECURITYADMIN
C) SYSADMIN
D) ORGADMIN

**Answer:** B

**Explanation:** SECURITYADMIN manages users and roles, and grants/revokes privileges. Database and warehouse creation are handled by SYSADMIN. ACCOUNTADMIN has all privileges.

**Reference:** https://docs.snowflake.com/en/user-guide/security-access-control-overview

---

**Question 2.2**
A database administrator wants to grant SELECT, INSERT, and UPDATE privileges on a table to a role. Which statements are correct?

Select all that apply.

A) Use: `GRANT SELECT, INSERT, UPDATE ON TABLE my_table TO ROLE analyst_role;`
B) Use three separate GRANT statements
C) Use: `GRANT ALL ON TABLE my_table TO ROLE analyst_role;`
D) Use: `GRANT SELECT ON TABLE my_table TO ROLE analyst_role;` and separately `GRANT INSERT ON TABLE my_table TO ROLE analyst_role;`

**Answers:** A, B, D

**Explanation:** All three approaches work correctly. Privileges can be combined in a single statement (A), granted separately (B), or both. Approach C (ALL) would grant every privilege on the table, which may exceed the principle of least privilege.

**Reference:** https://docs.snowflake.com/en/sql-reference/sql-grant-ownership

---

**Question 2.3**
An analyst is assigned two roles: `analyst_role` and `developer_role`. The analyst_role has SELECT on database `db_a`, and developer_role has SELECT and INSERT on database `db_b`. Which databases can the analyst access?

A) Only db_a
B) Only db_b
C) Both db_a and db_b
D) Neither (privileges are isolated)

**Answer:** C

**Explanation:** Users with multiple roles have the union of all privileges from all roles. The analyst can access both databases.

**Reference:** https://docs.snowflake.com/en/user-guide/security-access-control-overview

---

**Question 2.4**
Which authentication method is ideal for programmatic access from applications (e.g., Python connector, SnowSQL scripts)?

A) Multi-factor authentication (MFA)
B) Federated authentication (SAML/OAuth)
C) Key pair authentication
D) Single sign-on (SSO)

**Answer:** C

**Explanation:** Key pair authentication uses RSA keys for programmatic access without requiring passwords. MFA, federated auth, and SSO are for interactive users.

**Reference:** https://docs.snowflake.com/en/user-guide/key-pair-auth

---

**Question 2.5**
A company wants to implement centralized user management and single sign-on (SSO) across multiple applications. Which Snowflake authentication method is most appropriate?

A) Multi-factor authentication (MFA)
B) Federated authentication (SAML or OAuth)
C) Key pair authentication
D) IP whitelisting

**Answer:** B

**Explanation:** Federated authentication (SAML/OAuth) enables SSO by delegating authentication to an external IdP (e.g., Okta, Azure AD).

**Reference:** https://docs.snowflake.com/en/user-guide/security-federation

---

**Question 2.6**
Which view type is primarily used to enforce row-level masking in data sharing scenarios?

A) Standard view
B) Materialized view
C) Secure view
D) Dynamic view

**Answer:** C

**Explanation:** Secure views hide definitions and can conditionally mask row/column data based on the executing role, making them ideal for data sharing with granular access control.

**Reference:** https://docs.snowflake.com/en/user-guide/views-secure

---

**Question 2.7**
A database has been assigned to a share. A consumer account needs to access the shared database. What must the provider do to add the consumer to the share?

A) Transfer database ownership to the consumer
B) Use `ALTER SHARE my_share ADD ACCOUNTS = 'consumer_account';`
C) Use `GRANT USAGE ON DATABASE shared_db TO SHARE consumer_account;`
D) Create a clone of the database for the consumer

**Answer:** B

**Explanation:** The correct syntax is `ALTER SHARE ... ADD ACCOUNTS = ...` to add consumer accounts to a share.

**Reference:** https://docs.snowflake.com/en/user-guide/data-sharing-intro

---

**Question 2.8**
The SECURITYADMIN role can grant which of the following? (Select all that apply)

A) USAGE privilege on a database
B) ACCOUNTADMIN role to another user
C) USAGE privilege on a virtual warehouse
D) CREATE DATABASE privilege

**Answers:** A, B, C

**Explanation:** SECURITYADMIN can grant any privilege and role. Options A, B, and C are all within SECURITYADMIN's purview. Option D is also technically grantable by SECURITYADMIN (global privilege).

**Reference:** https://docs.snowflake.com/en/user-guide/security-access-control-overview

---

**Question 2.9**
How many privileges must a role have to use a warehouse and execute queries?

A) At least 1 privilege (USAGE on warehouse)
B) At least 2 privileges (USAGE on warehouse AND on database)
C) At least 3 privileges (USAGE on warehouse, database, and schema)
D) At least 4 privileges (warehouse, database, schema, and table)

**Answer:** C

**Explanation:** To execute a query, a role needs:
1. USAGE on the warehouse (compute)
2. USAGE on the database (access)
3. USAGE on the schema (access)
4. SELECT on the table (read access)

However, the question asks minimum for just "use warehouse and execute queries." Technically this requires at least USAGE on the warehouse and database and schema. Let me reconsider: to "execute queries" requires at least:
- USAGE on warehouse
- USAGE on database
- USAGE on schema
- SELECT on table/view

But if asking for just "use warehouse," it's 1 (USAGE on warehouse). The question is ambiguous, but standard exam interpretation: "execute queries" = full stack = C.

**Reference:** https://docs.snowflake.com/en/user-guide/security-access-control-overview

---

### Domain 3.0 Questions (Performance & Cost - 9 Questions)

**Question 3.1**
A slow query is identified in production. Where should you look first to understand which operation is the bottleneck?

A) Query history (ACCOUNT_USAGE)
B) Query profile
C) Explain plan
D) Cost insights

**Answer:** B

**Explanation:** Query Profile shows actual execution metrics (rows produced, bytes scanned, execution time per operator) for identifying bottlenecks. ACCOUNT_USAGE gives high-level metrics, EXPLAIN shows plan without execution, and cost insights show cost attribution.

**Reference:** https://docs.snowflake.com/en/user-guide/ui-query-profile

---

**Question 3.2**
A warehouse is configured with AUTO_SUSPEND = 10. This means the warehouse will:

A) Automatically suspend after 10 minutes of idle time
B) Automatically suspend every 10 minutes
C) Suspend queries running longer than 10 minutes
D) Cannot suspend until 10 minutes have passed since creation

**Answer:** A

**Explanation:** AUTO_SUSPEND specifies the number of minutes of idle time before the warehouse automatically suspends, saving compute costs.

**Reference:** https://docs.snowflake.com/en/sql-reference/sql-ddl-warehouse

---

**Question 3.3**
Which three caching mechanisms in Snowflake are transparent to the user and automatic?

Select THREE.

A) Metadata cache (cluster-level)
B) Query result cache (account-level, 24 hours)
C) Warehouse cache (local SSD)
D) Buffer cache (CPU cache)
E) Disk cache (external storage)

**Answers:** A, B, C

**Explanation:** All three are automatic:
- Metadata cache: Partition min/max metadata (free)
- Query result cache: Exact query matching (free, 24-hour default)
- Warehouse cache: Data files loaded during execution (temporary, cluster-scoped)

D and E are not specific Snowflake caching mechanisms.

**Reference:** https://docs.snowflake.com/en/user-guide/query-performance-query-caching

---

**Question 3.4**
A query is experiencing data spilling (spilled bytes detected in query profile). What are potential solutions?

Select all that apply.

A) Increase virtual warehouse size
B) Optimize the query to reduce data processed
C) Split the query into multiple steps with intermediate results
D) Disable the warehouse cache
E) Add more clusters

**Answers:** A, B, C

**Explanation:** 
- A: More memory to prevent spilling
- B: Reduce data processed (fewer partitions, better filters)
- C: Intermediate results break up memory requirements
- D: Cache disabling won't help
- E: More clusters doesn't add memory per query (unless combined with larger warehouse size per cluster)

**Reference:** https://docs.snowflake.com/en/user-guide/query-performance-spilling

---

**Question 3.5**
A company has a BI dashboard with a heavy aggregation query that runs ~20 times per day. The query scans 100GB of data. Which optimization is most cost-effective?

A) Increase virtual warehouse size (L to XL)
B) Create a materialized view on the aggregation
C) Enable query acceleration service
D) Implement search optimization on the table

**Answer:** B

**Explanation:** A materialized view pre-computes the aggregation, making repeated queries instant. Cost-benefit: (Refresh cost + Storage cost) < (100GB scan × 20 queries/day cost).

- A: Increases per-query cost, not beneficial
- C: Helps scans, but materialized view is more efficient for repeated same query
- D: Not needed for aggregation queries

**Reference:** https://docs.snowflake.com/en/user-guide/views-materialized

---

**Question 3.6**
A company has a large table with 10 billion rows. Queries frequently filter on date ranges (e.g., WHERE order_date BETWEEN '2025-01-01' AND '2025-01-31'). The table currently has no clustering. What would improve query performance and reduce costs?

A) Enable query acceleration service
B) Create a clustering key on order_date
C) Increase virtual warehouse size
D) Create a materialized view for each date range

**Answer:** B

**Explanation:** Clustering on order_date will improve partition pruning for date-range queries, reducing bytes scanned and costs significantly. This is the most direct and cost-effective optimization.

**Reference:** https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions

---

**Question 3.7**
A virtual warehouse costs 8 credits per second (Large warehouse). A query runs for 100 seconds. How much does this single query cost (in credits)?

A) 8 credits
B) 80 credits
C) 800 credits
D) 0.8 credits

**Answer:** C

**Explanation:** Cost = Warehouse size (credits/sec) × Duration (seconds) = 8 × 100 = 800 credits.

**Reference:** https://docs.snowflake.com/en/user-guide/cost-understanding-compute

---

**Question 3.8**
Which monitoring tool provides the most detailed cost attribution breakdown by warehouse, user, and database?

A) Query history (ACCOUNT_USAGE)
B) Cost Insights (Snowsight)
C) Warehouse load history
D) Resource monitors

**Answer:** B

**Explanation:** Cost Insights in Snowsight provides visual, detailed cost attribution by warehouse, user, database, and time period. ACCOUNT_USAGE provides raw data, but Cost Insights is the dedicated analysis tool.

**Reference:** https://docs.snowflake.com/en/user-guide/cost-understanding-compute

---

**Question 3.9**
Which scenario is most appropriate for using a multi-cluster warehouse?

A) A single user running one large query
B) Many concurrent users with variable workload (some idle, some busy)
C) Development environment with minimal usage
D) A single resource-intensive ETL job running daily

**Answer:** B

**Explanation:** Multi-cluster warehouses excel with variable, concurrent workloads. Clusters are added/removed based on queue depth. A single large query (A) and single ETL (D) don't benefit from multi-cluster overhead.

**Reference:** https://docs.snowflake.com/en/user-guide/warehouses-multicluster

---

### Domain 4.0 Questions (Data Loading - 6 Questions)

**Question 4.1**
Which command is used to load data from a staged file into a Snowflake table?

A) LOAD INTO
B) COPY INTO
C) INSERT FROM
D) PUT

**Answer:** B

**Explanation:** `COPY INTO` is the primary load command in Snowflake. PUT is for uploading files to a stage (not loading data into a table).

**Reference:** https://docs.snowflake.com/en/sql-reference/sql-copy-into-table

---

**Question 4.2**
A company wants to load 10GB of CSV files from S3 nightly at 2am. The files should be automatically detected and loaded without manual intervention. Which Snowflake feature is most appropriate?

A) Scheduled COPY INTO (via task)
B) Snowpipe
C) External table
D) Manual COPY INTO with SnowSQL

**Answer:** B

**Explanation:** Snowpipe automatically detects new files via event notifications and loads them without manual intervention. While scheduled COPY (A) could work, Snowpipe is designed for this continuous/event-driven loading pattern.

**Reference:** https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro

---

**Question 4.3**
An organization is loading 50MB files (100 files total = 5GB data). Load performance is poor because files are too small. What is the recommended action?

A) Increase virtual warehouse size
B) Consolidate files to 500MB-1000MB size before loading
C) Load files sequentially instead of parallel
D) Increase stage compression

**Answer:** B

**Explanation:** File size impacts parallelism. Small files create many tasks with overhead. Optimal is 100-1000MB. Consolidating files before loading improves performance.

**Reference:** https://docs.snowflake.com/en/user-guide/data-load-overview

---

**Question 4.4**
Which statement about external tables is correct?

A) External tables copy data into Snowflake
B) External tables are read-only and metadata-based
C) External tables require virtual warehouse compute for queries
D) External tables cache data in warehouse memory

**Answer:** B

**Explanation:** External tables are metadata-only references to external cloud storage. Data is not copied. Queries can run against external tables but use warehouse compute. Data is not pre-cached.

**Reference:** https://docs.snowflake.com/en/user-guide/tables-external-intro

---

**Question 4.5**
A file load is failing due to data format issues in some rows. How can the load continue for valid rows while skipping bad rows?

A) Set `ON_ERROR = 'SKIP_FILE'` in COPY INTO
B) Set `ON_ERROR = 'CONTINUE'` in COPY INTO
C) Set `VALIDATE = TRUE` in COPY INTO
D) Use `TRY_CAST` to handle errors

**Answer:** B

**Explanation:** 
- `ON_ERROR = 'SKIP_FILE'`: Skips entire file if any error
- `ON_ERROR = 'CONTINUE'`: Skips bad rows, continues loading
- `VALIDATE = TRUE`: Pre-flight check, no load
- `TRY_CAST`: SQL function, doesn't affect COPY behavior

**Reference:** https://docs.snowflake.com/en/sql-reference/sql-copy-into-table

---

**Question 4.6**
Which file format provides the best compression for loading data?

A) CSV (text, no compression)
B) Parquet (columnar, native compression)
C) JSON (hierarchical, moderate compression)
D) All have equivalent compression

**Answer:** B

**Explanation:** Parquet is columnar and natively compressed (typically 5-10x smaller than CSV). JSON is larger. CSV is uncompressed text.

**Reference:** https://docs.snowflake.com/en/user-guide/data-load-create-file-format

---

### Domain 5.0 Questions (Data Transformations - 8 Questions)

**Question 5.1**
Which function type returns a single scalar value for each input row?

A) Table function (FLATTEN)
B) User-defined function (UDF)
C) Stored procedure
D) External function

**Answer:** B

**Explanation:** UDFs return a single value per input row. Table functions (FLATTEN) return multiple rows. Stored procedures return sets of results. External functions call HTTP services.

**Reference:** https://docs.snowflake.com/en/sql-reference/user-defined-functions

---

**Question 5.2**
A JSON column contains nested arrays that need to be unpacked into separate rows. Which command accomplishes this?

A) PARSE_JSON
B) FLATTEN with MODE='ARRAY'
C) JSON_EXTRACT
D) ARRAY_CONSTRUCT

**Answer:** B

**Explanation:** `FLATTEN` with `MODE='ARRAY'` unpacks array elements into separate rows.

**Reference:** https://docs.snowflake.com/en/sql-reference/functions/flatten

---

**Question 5.3**
The following query structure is used to process semi-structured data. What is the purpose of the LATERAL keyword?

```sql
SELECT 
  events.event_id,
  f.key,
  f.value
FROM events,
LATERAL FLATTEN(input => events.event_data, mode => 'OBJECT') f
```

A) Join events with the flattened data while preserving context
B) Filter events before flattening
C) Execute the FLATTEN in parallel
D) Cache the flattened results

**Answer:** A

**Explanation:** LATERAL allows the FLATTEN operation to reference columns from the outer query (`events.event_data`), preserving context (event_id) while expanding nested structures.

**Reference:** https://docs.snowflake.com/en/sql-reference/functions/flatten

---

**Question 5.4**
Which UDF type has the best performance?

A) Python UDF
B) JavaScript UDF
C) SQL UDF
D) External UDF

**Answer:** C

**Explanation:** SQL UDFs are fastest (inline execution). Python/JavaScript UDFs have interpreter overhead. External UDFs have HTTP latency.

**Reference:** https://docs.snowflake.com/en/sql-reference/user-defined-functions

---

**Question 5.5**
A stored procedure is needed to process data in transactions (with COMMIT/ROLLBACK). Which statement is correct?

A) Both UDFs and stored procedures support transaction control
B) Only stored procedures support transaction control
C) UDFs and stored procedures have equivalent transaction capabilities
D) Transaction control is not supported in either UDFs or stored procedures

**Answer:** B

**Explanation:** Only stored procedures can manage transactions (COMMIT, ROLLBACK). UDFs cannot control transactions.

**Reference:** https://docs.snowflake.com/en/sql-reference/stored-procedures

---

**Question 5.6**
A Streams object is created on a table to track changes. After one query consumes the stream (reading all changes), what happens if you query the stream again immediately?

A) Stream returns the same changes again
B) Stream returns empty (new changes only after next DML)
C) Stream returns rows from the last 24 hours
D) Stream is locked until manual reset

**Answer:** B

**Explanation:** Streams track a "generation." After consumption, the stream is marked stale and returns empty until new changes occur. This is the ELT pattern design.

**Reference:** https://docs.snowflake.com/en/user-guide/streams

---

**Question 5.7**
A Streams and Tasks combination is used to implement ELT. Which statement is correct?

A) Streams trigger tasks automatically
B) Tasks trigger streams automatically
C) Tasks consume streams (read changes) and execute transformation/merge
D) Streams and tasks are independent and cannot work together

**Answer:** C

**Explanation:** Typical pattern: Stream tracks changes → Task scheduled to run → Task consumes stream changes → Task merges/transforms into target table.

**Reference:** https://docs.snowflake.com/en/user-guide/streams-tasks

---

**Question 5.8**
A company wants to call an external ML model API from Snowflake for each row. Which Snowflake feature is most appropriate?

A) Python UDF with HTTP library
B) External function
C) Stored procedure with API calls
D) Snowpark with external library

**Answer:** B

**Explanation:** External functions are designed for calling HTTP endpoints. They handle asynchronous execution and integration transparently.

**Reference:** https://docs.snowflake.com/en/sql-reference/functions-external

---

### Domain 6.0 Questions (Data Protection & Sharing - 6 Questions)

**Question 6.1**
A table is accidentally deleted at 2pm. Time Travel is set to 7 days. The account is Standard Edition. Can the table be recovered?

A) Yes, via Time Travel (Standard has 1-day default)
B) Yes, via Fail-safe
C) Yes, via UNDROP (if within Time Travel period)
D) No, Standard Edition doesn't support recovery

**Answer:** A (or C, but A is more direct)

**Explanation:** Standard Edition has 1-day Time Travel by default. If deletion occurred <24 hours ago, UNDROP or `CREATE TABLE ... CLONE ... AT (TIMESTAMP => ...)` can recover the table. If >24 hours, Fail-safe might still have it (7 days).

**Reference:** https://docs.snowflake.com/en/user-guide/data-time-travel

---

**Question 6.2**
What is the fixed duration of Fail-safe in all Snowflake editions?

A) 1 day
B) 7 days
C) 30 days
D) 90 days

**Answer:** B

**Explanation:** Fail-safe is always 7 days (fixed, non-configurable) in all editions. It provides automatic recovery beyond Time Travel.

**Reference:** https://docs.snowflake.com/en/user-guide/data-failsafe

---

**Question 6.3**
A company clones a database for development/testing. No changes are made to the cloned database for 1 week. Which statement about costs is correct?

A) Full storage cost for both original and clone (doubled)
B) Minimal/no additional cost for the clone (metadata-only)
C) Clone costs 50% of original
D) Clone cost depends on warehouse size

**Answer:** B

**Explanation:** Zero-copy cloning creates a metadata-only copy initially. Storage cost is incurred only on divergence (when data changes). If no changes, no additional cost.

**Reference:** https://docs.snowflake.com/en/user-guide/object-clone

---

**Question 6.4**
A data provider wants to share a database with a consumer account while ensuring only rows for a specific region are visible. Which approach is most appropriate?

A) Grant SELECT on the database to the consumer
B) Create a secure view that filters by region and grant SELECT on the view
C) Clone the database and remove rows not in the region
D) Create a materialized view and share it

**Answer:** B

**Explanation:** Secure views hide the definition and can conditionally filter rows, making them ideal for row-level data sharing.

**Reference:** https://docs.snowflake.com/en/user-guide/data-sharing-intro

---

**Question 6.5**
A provider creates a share and grants a table to the share. A consumer successfully adds the provider account to their share configuration. What is the next step for the consumer to access the shared data?

A) Data is automatically accessible in the consumer account
B) Consumer must create a reference database: `CREATE DATABASE ref_db FROM SHARE provider.share_name;`
C) Consumer must clone the shared table
D) Consumer must request data from the provider

**Answer:** B

**Explanation:** Shared data is accessed via a reference database, created with `CREATE DATABASE ... FROM SHARE ...`. This creates a logical reference (not a copy).

**Reference:** https://docs.snowflake.com/en/user-guide/data-sharing-intro

---

**Question 6.6**
Replication of a database across regions for disaster recovery is available in which edition(s)?

A) Standard Edition
B) Enterprise Edition
C) Business Critical Edition
D) All editions

**Answer:** C

**Explanation:** Database replication and failover require Business Critical Edition. Standard and Enterprise do not support replication.

**Reference:** https://docs.snowflake.com/en/user-guide/disaster-recovery-intro

---

## Answer Key Summary

| Q | Domain | Answer | Key Concept |
|----|--------|--------|-------------|
| 1.1 | 1.0 | B | Separation of compute/storage |
| 1.2 | 1.0 | A,B,C | Three layers |
| 1.3 | 1.0 | C | Edition requirements for features |
| 1.4 | 1.0 | A | Enterprise edition (multi-cluster) |
| 1.5 | 1.0 | B | Micro-partition size (64-160MB) |
| 1.6 | 1.0 | C | Micro-partition pruning |
| 1.7 | 1.0 | B | Snowpark |
| 1.8 | 1.0 | B | Streamlit |
| 1.9 | 1.0 | B | Cloud Services costs |
| 1.10 | 1.0 | C | Transient tables |
| 1.11 | 1.0 | C | Secure views |
| 1.12 | 1.0 | B,C | Materialized views (Enterprise+) |
| 2.1 | 2.0 | B | SECURITYADMIN |
| 2.2 | 2.0 | A,B,D | GRANT syntax variations |
| 2.3 | 2.0 | C | Multiple roles (union of privileges) |
| 2.4 | 2.0 | C | Key pair authentication (programmatic) |
| 2.5 | 2.0 | B | Federated auth for SSO |
| 2.6 | 2.0 | C | Secure views for masking |
| 2.7 | 2.0 | B | ALTER SHARE ADD ACCOUNTS |
| 2.8 | 2.0 | A,B,C | SECURITYADMIN privileges |
| 2.9 | 2.0 | C | Minimum privileges (warehouse, db, schema) |
| 3.1 | 3.0 | B | Query profile |
| 3.2 | 3.0 | A | AUTO_SUSPEND |
| 3.3 | 3.0 | A,B,C | Three caching layers |
| 3.4 | 3.0 | A,B,C | Spilling mitigation |
| 3.5 | 3.0 | B | Materialized view (cost-effective) |
| 3.6 | 3.0 | B | Clustering |
| 3.7 | 3.0 | C | 800 credits (8 × 100) |
| 3.8 | 3.0 | B | Cost Insights |
| 3.9 | 3.0 | B | Multi-cluster (concurrent workload) |
| 4.1 | 4.0 | B | COPY INTO |
| 4.2 | 4.0 | B | Snowpipe |
| 4.3 | 4.0 | B | Consolidate small files |
| 4.4 | 4.0 | B | External tables (metadata-only) |
| 4.5 | 4.0 | B | ON_ERROR = 'CONTINUE' |
| 4.6 | 4.0 | B | Parquet |
| 5.1 | 5.0 | B | UDF (scalar) |
| 5.2 | 5.0 | B | FLATTEN with ARRAY |
| 5.3 | 5.0 | A | LATERAL FLATTEN |
| 5.4 | 5.0 | C | SQL UDF (fastest) |
| 5.5 | 5.0 | B | Stored procedures (transactions) |
| 5.6 | 5.0 | B | Stream consumed = empty |
| 5.7 | 5.0 | C | Tasks consume streams |
| 5.8 | 5.0 | B | External functions (API) |
| 6.1 | 6.0 | A | Time Travel recovery |
| 6.2 | 6.0 | B | Fail-safe (7 days) |
| 6.3 | 6.0 | B | Zero-copy clone (metadata) |
| 6.4 | 6.0 | B | Secure views for row-level security |
| 6.5 | 6.0 | B | CREATE DATABASE FROM SHARE |
| 6.6 | 6.0 | C | Replication (Business Critical) |

---

## Final Exam Readiness Checklist

Before taking the exam, verify you can:

- [ ] Explain Snowflake's three-layer architecture and why it matters
- [ ] Distinguish between Snowflake editions and feature availability
- [ ] Understand RBAC, role hierarchy, and privilege inheritance
- [ ] Explain partition pruning, clustering, and storage optimization
- [ ] Calculate warehouse costs (size × duration = credits)
- [ ] Design loading strategies for different scenarios (batch vs. real-time)
- [ ] Work with semi-structured and unstructured data (FLATTEN, VARIANT)
- [ ] Implement data protection (Time Travel, cloning, Fail-safe)
- [ ] Set up data sharing (shares, secure views, reference databases)
- [ ] Optimize queries using the Query Profile
- [ ] Configure virtual warehouses and multi-cluster setups
- [ ] Monitor costs and identify optimization opportunities

**Good luck on your exam!**

---

# REFERENCES AND OFFICIAL DOCUMENTATION

All information in this guide is sourced from official Snowflake documentation:

**Core Architecture & Concepts:**
- https://docs.snowflake.com/en/user-guide/intro-key-concepts
- https://docs.snowflake.com/en/user-guide/intro-editions

**Security & Access Control:**
- https://docs.snowflake.com/en/user-guide/security-access-control-overview
- https://docs.snowflake.com/en/user-guide/security-mfa
- https://docs.snowflake.com/en/user-guide/security-federation

**Performance & Optimization:**
- https://docs.snowflake.com/en/user-guide/query-performance
- https://docs.snowflake.com/en/user-guide/query-performance-query-caching
- https://docs.snowflake.com/en/user-guide/cost-understanding-compute

**Data Loading:**
- https://docs.snowflake.com/en/user-guide/data-load-overview
- https://docs.snowflake.com/en/user-guide/data-load-snowpipe-intro

**Data Transformations:**
- https://docs.snowflake.com/en/sql-reference/user-defined-functions
- https://docs.snowflake.com/en/sql-reference/functions/flatten
- https://docs.snowflake.com/en/user-guide/streams

**Data Protection & Sharing:**
- https://docs.snowflake.com/en/user-guide/data-time-travel
- https://docs.snowflake.com/en/user-guide/object-clone
- https://docs.snowflake.com/en/user-guide/data-sharing-intro

**Snowflake University & Practice:**
- https://learn.snowflake.com (Official training and practice exams)
- https://certifications.snowflake.com (Exam registration)

---

**End of Guide**

*This study guide is designed for intensive, daily reading over 4-8 weeks. Use the official Snowflake documentation as your primary reference. Practice with official Snowflake exams for 90%+ confidence before taking the real exam.*

