# Scalability Guide

## Architecture Overview

This application is designed to scale to hundreds of documents without any code changes. The architecture separates concerns cleanly:

- **React Components**: Only for Network Topologies and Design Principles (interactive visualizations)
- **Markdown Documents**: All architectures, patterns, and technical documentation
- **Metadata System**: Each document has frontmatter tags for filtering

## Adding New Documents

### 1. Create Markdown File

Create a new file in `public/documents/your-document-name.md`:

```markdown
---
title: "Your Document Title"
category: "Architecture" or "Pattern" or "Framework"
date: "YYYY-MM-DD"
topologies: ["dag", "pipeline", "fan-out", "fan-in"]
principles: ["isolation", "observability", "idempotency", "audit-trail"]
tags: ["custom-tag-1", "custom-tag-2"]
description: "Brief description for library preview"
---

# Your Document Title

Your content here with:
- Markdown formatting
- Code blocks with syntax highlighting
- Mermaid diagrams
- Tables
- Lists

## Mermaid Diagram Example

\```mermaid
graph LR
    A[Start] --> B[Process]
    B --> C[End]
\```

## Code Example

\```python
def example():
    return "Hello, World!"
\```
```

### 2. Register Document

Add entry to `src/utils/documentRegistry.js`:

```javascript
export const documentRegistry = [
  // ... existing documents
  {
    id: 'your-document-name',
    title: 'Your Document Title',
    category: 'Architecture',
    path: '/documents/your-document-name.md',
    date: '2025-12-25',
    topologies: ['dag', 'pipeline'],
    principles: ['isolation', 'observability'],
    tags: ['custom-tag-1', 'custom-tag-2'],
    description: 'Brief description for library preview'
  }
]
```

### 3. Done!

The system automatically:
- Renders the markdown with Mermaid diagrams
- Enables dual-view mode (rendered/raw)
- Adds to filterable library
- Enables search
- Provides copy-to-clipboard for raw markdown

## Metadata Schema

### Required Fields
- `id`: Unique identifier (kebab-case)
- `title`: Display title
- `category`: Document category
- `path`: Path to markdown file
- `date`: Publication date (YYYY-MM-DD)
- `description`: Short description

### Optional Fields
- `topologies`: Array of topology tags
  - `dag`, `pipeline`, `fan-out`, `fan-in`
- `principles`: Array of principle tags
  - `isolation`, `observability`, `idempotency`, `audit-trail`
- `tags`: Array of custom tags (lowercase-with-hyphens)

## Filtering System

Users can filter by:
1. **Category**: Architecture, Pattern, Framework, etc.
2. **Network Topology**: DAG, Pipeline, Fan-out, Fan-in
3. **Design Principle**: Isolation, Observability, Idempotency, Audit Trail
4. **Search**: Full-text search across title, description, and tags

Filters combine (AND logic) for precise document discovery.

## Performance

- Documents load on-demand (not all at once)
- Markdown parsing is client-side (no server overhead)
- Mermaid diagrams render progressively
- No limit on number of documents

## Best Practices

### Document Organization
- Use descriptive file names (kebab-case)
- Include comprehensive frontmatter
- Add 3-5 relevant tags minimum
- Write clear descriptions (50-150 chars)

### Content Structure
- Start with overview/abstract
- Use clear heading hierarchy
- Include code examples
- Add diagrams for complex concepts
- Provide use cases and examples

### Metadata Strategy
- Tag with all applicable topologies
- Tag with all applicable principles
- Add domain-specific tags
- Keep tags consistent across documents

## Scaling Beyond 100 Documents

When you have 100+ documents, consider:

1. **Categorization**: Add subcategories
2. **Search Enhancement**: Add fuzzy search
3. **Document Grouping**: Create collection pages
4. **Performance**: Implement pagination or virtual scrolling
5. **Navigation**: Add breadcrumbs and document relationships

## Example: Adding a New Pattern

File: `public/documents/medallion-architecture.md`

```markdown
---
title: "Medallion Architecture Pattern"
category: "Architecture"
date: "2025-12-25"
topologies: ["pipeline", "fan-in"]
principles: ["isolation", "observability"]
tags: ["data-lake", "bronze-silver-gold", "lakehouse"]
description: "Multi-layered data architecture pattern for organizing data lakes"
---

# Medallion Architecture Pattern

Bronze → Silver → Gold data refinement layers...
```

Registry entry in `src/utils/documentRegistry.js`:

```javascript
{
  id: 'medallion-architecture',
  title: 'Medallion Architecture Pattern',
  category: 'Architecture',
  path: '/documents/medallion-architecture.md',
  date: '2025-12-25',
  topologies: ['pipeline', 'fan-in'],
  principles: ['isolation', 'observability'],
  tags: ['data-lake', 'bronze-silver-gold', 'lakehouse'],
  description: 'Multi-layered data architecture pattern for organizing data lakes'
}
```

That's it! The document is now:
- In the library
- Filterable by topology and principles
- Searchable
- Viewable in dual modes
- Copy-pasteable

## Maintenance

### Updating a Document
1. Edit the markdown file in `public/documents/`
2. Update registry metadata if needed
3. Changes appear immediately (hot reload in dev)

### Removing a Document
1. Delete markdown file from `public/documents/`
2. Remove entry from `documentRegistry.js`

### Reorganizing
Documents are independent - move, rename, or restructure freely as long as paths in registry match files.
