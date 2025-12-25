const Footer = () => {
  return (
    <footer className="bg-white border-t border-primary-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-primary-900 mb-3">
              About
            </h3>
            <p className="text-sm text-primary-600 leading-relaxed">
              Professional repository of Data Engineering architectures, design patterns, 
              and best practices for building scalable data systems.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-primary-900 mb-3">
              Topics
            </h3>
            <ul className="space-y-2 text-sm text-primary-600">
              <li>Architectural Patterns</li>
              <li>Design Principles</li>
              <li>Network Topologies</li>
              <li>Implementation Examples</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-primary-900 mb-3">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-primary-600">
              <li>Documentation</li>
              <li>Best Practices</li>
              <li>Code Examples</li>
              <li>Case Studies</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-primary-200">
          <p className="text-center text-sm text-primary-500">
            Data Engineering Architecture Repository - Professional Documentation
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
