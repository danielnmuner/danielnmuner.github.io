import { Link } from 'react-router-dom'
import Container from '../components/layout/Container'
import Section from '../components/ui/Section'
import Card from '../components/ui/Card'
import { documentRegistry } from '../utils/documentRegistry'

const Library = () => {
  const formatLabel = (str) => {
    return str.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }


  return (
    <Container>
      <Section
        title="Data Engineering Architecture"
        subtitle="Professional collection of architecture patterns and frameworks"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentRegistry.map(doc => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <div>
                  <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded">
                    {doc.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-primary-900">
                  {doc.title}
                </h3>
                
                <p className="text-sm text-primary-700 leading-relaxed">
                  {doc.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {doc.topologies.slice(0, 2).map(topo => (
                    <span key={topo} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      {formatLabel(topo)}
                    </span>
                  ))}
                  {doc.principles.slice(0, 2).map(prin => (
                    <span key={prin} className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {formatLabel(prin)}
                    </span>
                  ))}
                </div>
                
                <div className="pt-3 border-t border-primary-200 flex items-center justify-between">
                  <span className="text-xs text-primary-500">{doc.date}</span>
                  <Link
                    to={`/document/${doc.id}`}
                    className="text-sm text-accent-600 hover:text-accent-700 font-medium"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </Container>
  )
}

export default Library
