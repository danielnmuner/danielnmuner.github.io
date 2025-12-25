// Document registry with metadata

export const documentRegistry = [
  {
    id: 'black-box-intermediate-models',
    title: 'Black Box Intermediate Models Pattern',
    category: 'Architecture',
    path: '/documents/black-box-intermediate-models.md',
    date: '2025-12-25',
    topologies: ['dag', 'pipeline', 'fan-out', 'fan-in'],
    principles: ['isolation', 'observability', 'idempotency', 'audit-trail'],
    tags: ['sql-validation', 'snowflake', 'talend-migration', 'data-quality'],
    description: 'Framework for SQL transformation validation with intermediate models for Talend to Snowflake migrations'
  }
  // More documents will be added here as markdown files
]

// Helper functions for filtering
export const filterByTopology = (documents, topology) => {
  if (!topology) return documents
  return documents.filter(doc => doc.topologies.includes(topology))
}

export const filterByPrinciple = (documents, principle) => {
  if (!principle) return documents
  return documents.filter(doc => doc.principles.includes(principle))
}

export const filterByTag = (documents, tag) => {
  if (!tag) return documents
  return documents.filter(doc => doc.tags.includes(tag))
}

export const filterByCategory = (documents, category) => {
  if (!category) return documents
  return documents.filter(doc => doc.category === category)
}

export const searchDocuments = (documents, query) => {
  if (!query) return documents
  const lowerQuery = query.toLowerCase()
  return documents.filter(doc => 
    doc.title.toLowerCase().includes(lowerQuery) ||
    doc.description.toLowerCase().includes(lowerQuery) ||
    doc.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}
