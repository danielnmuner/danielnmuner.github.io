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
            backgroundImage: 'url(/architecturesdata/article-header.jpg)',
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
            When migrating complex ETL workflows from Talend to Snowflake, the fundamental challenge isn't rewriting SQL—it's proving that your new transformations produce identical results to the legacy system. The Black Box Intermediate Models pattern solves this by decomposing monolithic queries into transparent, testable components. Instead of treating a 500-line query as an opaque black box where you cross your fingers and hope for matching output, this framework materializes each Common Table Expression as an independent Snowflake VIEW. Each transformation step becomes visible, measurable, and independently verifiable. The result is a five-phase validation pipeline that transforms migration uncertainty into systematic proof of correctness.
          </p>

          <p className="text-xl text-gray-800 leading-relaxed mb-8" style={{ lineHeight: '1.75' }}>
            The architecture operates through five sequential phases that build upon each other. First, static analysis parses your SQL to extract CTE dependencies and construct a directed acyclic graph of data flow. Second, materialization converts each CTE into an isolated VIEW using topological sorting to respect dependencies. Third, observability extracts execution metrics from Snowflake's query profiler, tracking input versus output rows at each operator to detect unexpected data loss or multiplication. Fourth, schema validation uses Pandera to verify data types, constraints, and nullable rules, catching schema drift before it reaches production. Finally, data reconciliation performs row-by-row comparison between Snowflake results and Talend reference output, generating detailed validation reports that highlight any discrepancies with precision.
          </p>

          <p className="text-xl text-gray-800 leading-relaxed mb-12" style={{ lineHeight: '1.75' }}>
            This pattern embodies four critical design principles that make it production-ready. Isolation ensures each transformation exists independently, enabling focused testing and reusable components. Observability provides complete visibility into data flow with metrics captured at every stage. Idempotency guarantees repeatable validation with consistent results across multiple runs and environments. And a comprehensive audit trail logs all executions, stores validation reports, and documents schema changes. The framework is optimized for low-volume migrations—around 100 rows—where comprehensive validation matters more than raw performance. It transforms migration validation from an art of manual spot-checking into a science of systematic proof, giving you confidence that every transformation step produces exactly the results you expect.
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
