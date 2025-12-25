# PROJECT_RULES.md

## Project State Tracking

### Current Status
**Last Updated:** 2025-12-25  
**Phase:** Core Implementation Complete  
**Status:** Scalable markdown-based architecture ready

---

## Project Information

### Name
Data Engineering Architecture Repository

### Description
Modern web application for presenting Data Engineering architectures, design patterns, network topologies, and design principles in a professional, academic-style format.

### Technology Stack
- **Frontend:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Language:** JavaScript (JSX)
- **Router:** React Router v6

---

## Design Principles

### Visual Design
1. **Professional Typography**
   - Clear hierarchy (h1, h2, h3)
   - Readable font sizes (16px base minimum)
   - Professional font families (Inter, system fonts)
   - Adequate line spacing (1.5-1.7)

2. **Layout**
   - Clean, spacious layouts
   - Consistent spacing system
   - Grid-based design
   - Responsive breakpoints

3. **Content Presentation**
   - NO emojis in production
   - NO images initially (may add later)
   - Focus on text, diagrams, and tables
   - Academic paper aesthetic

4. **Color Palette**
   - Neutral, professional colors
   - High contrast for readability
   - Minimal use of color accents
   - Dark mode consideration

### Code Principles
1. **Component Structure**
   - Functional components only
   - Single responsibility principle
   - Reusable, composable components
   - Clear prop interfaces

2. **Styling Approach**
   - Tailwind utility classes
   - Consistent spacing scale
   - No inline styles
   - Component-level organization

3. **Performance**
   - Code splitting
   - Lazy loading
   - Optimized builds
   - Minimal dependencies

4. **Maintainability**
   - Clear file structure
   - Descriptive naming
   - JSDoc comments for complex logic
   - Consistent code formatting

---

## File Structure

```
plus/
├── AGENTS.md                    # Agent roles and responsibilities
├── PROJECT_RULES.md             # This file - project guidelines
├── architecture.md              # Source content (legacy)
├── diagram.md                   # Source content (legacy)
├── src/
│   ├── main.jsx                 # Application entry point
│   ├── App.jsx                  # Main app component with routing
│   ├── components/              # Reusable components
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.jsx       # Header with Home/About navigation
│   │   │   ├── Footer.jsx
│   │   │   └── Container.jsx
│   │   └── ui/                  # UI primitives
│   │       ├── Card.jsx
│   │       ├── Section.jsx
│   │       ├── Table.jsx
│   │       ├── MarkdownViewer.jsx    # Dual-mode markdown viewer
│   │       └── MermaidDiagram.jsx    # Mermaid diagram renderer
│   ├── pages/                   # Page components
│   │   ├── Home.jsx             # Landing page with library CTA
│   │   ├── Library.jsx          # Document library with filtering
│   │   ├── DocumentView.jsx     # Individual document viewer
│   │   ├── About.jsx            # About page
│   │   ├── Principles.jsx       # Interactive React component
│   │   └── Topologies.jsx       # Interactive React component
│   ├── data/                    # React component data only
│   │   ├── principles.js
│   │   └── topologies.js
│   ├── documents/               # Legacy markdown storage
│   ├── utils/                   # Utility functions
│   │   └── documentRegistry.js  # Document metadata and filters
│   └── styles/                  # Global styles
│       └── index.css
├── public/                      # Static assets
│   └── documents/               # SCALABLE MARKDOWN LIBRARY
│       └── *.md                 # Markdown docs with frontmatter
├── index.html                   # HTML entry point
├── vite.config.js               # Vite config with MD support
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Dependencies (with markdown libs)
└── README.md                    # Project documentation
```

---

## Development Workflow

### 1. Feature Development
- Create feature branch
- Implement component
- Test functionality
- Update documentation
- Merge to develop

### 2. Component Creation
- Define component purpose
- Create component file
- Implement with Tailwind
- Add prop validation
- Test responsiveness
- Document usage

### 3. Content Addition
- Structure content data
- Create data file
- Integrate with components
- Verify rendering
- Update navigation

---

## Content Structure

### Architectures
- Pattern name
- Description
- Phases/Layers
- Implementation details
- Use cases
- Best practices

### Design Principles
- Principle name
- Definition
- Importance
- Implementation examples
- Related patterns

### Network Topologies
- Topology name
- Description
- Visual representation
- Use cases
- Advantages/Disadvantages

### Patterns
- Pattern name
- Category
- Problem statement
- Solution approach
- Implementation
- Examples

---

## Quality Checklist

### Before Commit
- [ ] Code follows style guidelines
- [ ] Components are properly structured
- [ ] Tailwind classes are organized
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Typography is consistent
- [ ] Content is professional

### Before Deployment
- [ ] All features tested
- [ ] Build successful
- [ ] Performance optimized
- [ ] SEO meta tags added
- [ ] Documentation updated
- [ ] No TODO comments
- [ ] Clean console (no warnings)

---

## Dependencies Guidelines

### Required
- react
- react-dom
- react-router-dom
- vite
- tailwindcss
- postcss
- autoprefixer

### Optional (Add as needed)
- @tailwindcss/typography (for prose styling)
- clsx (for conditional classes)
- lucide-react (for icons, if needed)

### Forbidden
- Heavy diagram libraries (mermaid, etc.) - use SVG/CSS initially
- Unnecessary animation libraries
- Emoji packages
- Image libraries (not needed initially)

---

## Progress Tracking

### Phase 1: Foundation ✓
- [x] AGENTS.md created
- [x] PROJECT_RULES.md created
- [ ] Memory system initialized
- [ ] Vite project initialized
- [ ] Dependencies installed
- [ ] Basic file structure created

### Phase 2: Core Components
- [ ] Typography system
- [ ] Layout components (Header, Footer, Container)
- [ ] Navigation component
- [ ] Card component
- [ ] Table component
- [ ] Section component

### Phase 3: Pages
- [ ] Home page
- [ ] Architectures page
- [ ] Design Principles page
- [ ] Network Topologies page
- [ ] Patterns page

### Phase 4: Content
- [ ] Architecture data structured
- [ ] Black Box Pattern documented
- [ ] Design principles converted
- [ ] Topology data created
- [ ] All content integrated

### Phase 5: Polish
- [ ] Dark mode support
- [ ] Search functionality (optional)
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Documentation complete

---

## Update Log

### 2025-12-25
- Project initialized
- AGENTS.md created
- PROJECT_RULES.md created
- Foundation phase started
