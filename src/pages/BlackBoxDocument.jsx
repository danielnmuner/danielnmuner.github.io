const BlackBoxDocument = () => {
  const viewOnGitHub = () => {
    window.open('https://github.com/danielnmuner/danielnmuner/blob/main/src/documents/black-box-intermediate-models.md', '_blank')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image with Title - Medium Style */}
      <div className="relative w-full overflow-hidden" style={{ height: '400px' }}>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${import.meta.env.BASE_URL}article-header.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
        </div>

        {/* Title and Subtitle inside image */}
        <div className="relative h-full flex items-end">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pb-12 w-full">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              Black Box Intermediate Models Pattern
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              A systematic framework for validating SQL transformations in Talend to Snowflake migrations
            </p>
          </div>
        </div>
      </div>

      {/* Metadata and Tags - Outside Image */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
          <span className="font-medium">Architecture Pattern</span>
          <span>•</span>
          <span>3 min read</span>
          <span>•</span>
          <span>Dec 25, 2025</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">DAG</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Pipeline</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Fan-out</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Fan-in</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Isolation</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Observability</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Idempotency</span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Audit Trail</span>
        </div>
      </div>

      {/* Main Content - Medium Style */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-800 leading-relaxed mb-8" style={{ lineHeight: '1.75' }}>
            When migrating Talend ETL jobs to Snowflake, the fundamental challenge isn't rewriting SQL—it's proving your transformations produce identical results while maintaining full observability. The Black Box Intermediate Models pattern decomposes monolithic CTE chains into isolated, testable VIEWs. Each transformation step becomes transparent: SYSTEM$EXPLAIN_PLAN_JSON creates an immutable execution plan registry for change detection, CREATE OR REPLACE VIEW materializes each CTE as an independent VIEW, GET_QUERY_OPERATOR_STATS captures INPUT_ROWS and OUTPUT_ROWS at every operator to trace data flow point-to-point, Pandera's DataFrameModel validates schemas in cascade, and Pandas DataFrame.compare() reconciles row-level differences. This architecture transforms opaque SQL into a fully observable, auditable validation pipeline orchestrated through Airflow.
          </p>

          <p className="text-xl text-gray-800 leading-relaxed mb-8" style={{ lineHeight: '1.75' }}>
            The framework operates across three Snowflake layers—LANDING for raw Talend output, INT_VALIDATION for intermediate VIEWs, and DWH for final validated tables. Six Airflow tasks execute sequentially, passing artifacts via XCom: parse CTEs with sqlglot's Abstract Syntax Tree to build dependency DAG, create execution plan registry with SYSTEM$EXPLAIN_PLAN_JSON for baseline comparison, materialize VIEWs in topological order, extract operator-level metrics with GET_QUERY_OPERATOR_STATS to detect data loss, validate schemas in cascade with Pandera to catch type mismatches, and reconcile row-by-row with Pandas to generate final PASS/FAIL reports. Stats documents persist across task boundaries—REGISTRY.EXPLAIN_PLANS stores versioned execution plans, STATS.OPERATOR_METRICS captures INPUT_ROWS/OUTPUT_ROWS per operator, STATS.SCHEMA_VALIDATIONS logs type violations, and STATS.RECONCILIATION_REPORTS contains row-level diffs.
          </p>

          <p className="text-xl text-gray-800 leading-relaxed mb-12" style={{ lineHeight: '1.75' }}>
            Observability is the core design principle. Metrics are captured at every layer: VIEW creation timestamps, operator-level INPUT_ROWS vs OUTPUT_ROWS tracking, schema constraint violations, and row count deltas. Alerting triggers on row loss exceeding 50%, schema validation failures, column mismatches, or value comparison errors. The audit trail is immutable: all query IDs logged with timestamps, all EXPLAIN_PLAN_JSON baselines versioned, all VIEW DDL statements captured in Airflow logs, and all validation reports stored with DAG run metadata. This enables full lineage from source CTE through VIEW creation, operator metrics, schema validation, to final reconciliation. VIEWs are dynamic—they query underlying tables at runtime without copying data. Idempotent execution via CREATE OR REPLACE VIEW allows Airflow task retries without side effects. Optimized for low-volume migrations (~100 rows) where comprehensive validation matters more than raw performance.
          </p>
        </div>

        {/* CTA Section */}
        <div className="border-t border-primary-200 pt-12 mt-12">
          <div className="bg-primary-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-primary-900 mb-4">
              Explore the Complete Implementation
            </h3>
            <p className="text-lg text-primary-700 mb-6">
              View the full technical documentation with code examples, detailed diagrams, and step-by-step implementation guide
            </p>
            <button
              onClick={viewOnGitHub}
              className="inline-flex items-center justify-center px-8 py-3 bg-primary-900 text-white rounded-lg font-medium hover:bg-primary-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View Full Documentation on GitHub
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-primary-200">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">SQL Validation</span>
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">Snowflake</span>
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">Talend Migration</span>
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">Data Quality</span>
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">ETL</span>
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">Data Engineering</span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BlackBoxDocument
