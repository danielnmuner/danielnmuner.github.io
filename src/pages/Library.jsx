import { Link } from 'react-router-dom'
import { documentRegistry } from '../utils/documentRegistry'

const Library = () => {
  const formatLabel = (str) => {
    return str.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const getGitHubUrl = (docId) => {
    return `https://github.com/danielnmuner/danielnmuner/blob/main/src/documents/${docId}.md`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image with Title - Medium Style */}
      <div className="relative w-full overflow-hidden" style={{ height: '400px' }}>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${import.meta.env.BASE_URL}library-header.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
        </div>

        {/* Title and Subtitle inside image */}
        <div className="relative h-full flex items-end">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pb-12 w-full">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              Architecture Library
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl">
              A curated collection of data engineering patterns, design principles, and architectural frameworks for building robust systems
            </p>
          </div>
        </div>
      </div>

      {/* Library Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {documentRegistry.map(doc => (
            <article 
              key={doc.id} 
              className="bg-white border border-primary-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                    {doc.category}
                  </span>
                </div>
                
                {/* Title */}
                <Link to={`/document/${doc.id}`}>
                  <h2 className="text-2xl font-bold text-primary-900 mb-3 hover:text-accent-600 transition-colors leading-tight">
                    {doc.title}
                  </h2>
                </Link>
                
                {/* Description */}
                <p className="text-base text-primary-700 leading-relaxed mb-6">
                  {doc.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {doc.topologies.slice(0, 2).map(topo => (
                    <span key={topo} className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
                      {formatLabel(topo)}
                    </span>
                  ))}
                  {doc.principles.slice(0, 2).map(prin => (
                    <span key={prin} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                      {formatLabel(prin)}
                    </span>
                  ))}
                </div>
                
                {/* Footer with Actions */}
                <div className="pt-6 border-t border-primary-200 flex items-center justify-between">
                  <span className="text-sm text-primary-500 font-medium">{doc.date}</span>
                  <div className="flex items-center gap-3">
                    <a
                      href={getGitHubUrl(doc.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      Source
                    </a>
                    <Link
                      to={`/document/${doc.id}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-900 rounded-lg hover:bg-primary-800 transition-colors"
                    >
                      Read Article
                      <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State Message */}
        {documentRegistry.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-primary-900 mb-2">No architectures yet</h3>
            <p className="text-primary-600">Check back soon for new content</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Library
