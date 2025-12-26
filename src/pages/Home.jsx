import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Medium Style */}
      <div className="border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="py-24 md:py-32">
            <h1 className="text-6xl md:text-7xl font-bold text-black mb-8 leading-tight tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              Data Engineering Architecture Patterns
            </h1>
            <p className="text-2xl text-gray-600 mb-12 leading-relaxed font-normal">
              A collection of architectural patterns, network topologies, and design principles for building resilient data systems
            </p>
            <Link
              to="/library"
              className="inline-flex items-center px-8 py-3 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              Start Reading
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section - Medium Style */}
      <article className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-800 leading-relaxed mb-8" style={{ lineHeight: '1.8' }}>
            Modern data engineering demands more than writing SQL and moving data between systems. It requires understanding how architectural patterns, network topologies, and design principles work together to create systems that are observable, maintainable, and scalable.
          </p>

          <p className="text-xl text-gray-800 leading-relaxed mb-8" style={{ lineHeight: '1.8' }}>
            This library documents proven patterns like the Black Box Intermediate Models for migration validation, explores network topologies including DAG, Pipeline, Fan-out, and Fan-in structures, and examines core design principles such as isolation, observability, idempotency, and audit trail that form the foundation of robust data architectures.
          </p>

          <p className="text-xl text-gray-800 leading-relaxed mb-12" style={{ lineHeight: '1.8' }}>
            Each pattern is presented with clear explanations, real-world context, and practical implementation guidance. Whether you're validating complex transformations, designing data pipelines, or establishing architectural standards, these patterns provide a foundation you can build upon.
          </p>
        </div>

        {/* CTA */}
        <div className="border-t border-gray-200 pt-12 mt-12">
          <Link
            to="/library"
            className="inline-flex items-center text-lg font-medium text-black hover:text-gray-600 transition-colors"
          >
            Explore the architecture library
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </article>
    </div>
  )
}

export default Home
