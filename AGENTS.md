# AGENTS.md

## Project Overview
**Data Engineering Architecture Repository**  
A modern web application for presenting Data Engineering architectures, design patterns, network topologies, and design principles in a professional, academic-style format.

---

## Agent Roles and Responsibilities

### 1. Architecture Agent
**Role:** System Architecture and Design Patterns  
**Responsibilities:**
- Define and document data engineering architecture patterns
- Document network topologies (DAG, Pipeline, Fan-out, Fan-in)
- Maintain design principles and best practices
- Ensure architectural consistency across documentation

**Deliverables:**
- Architecture pattern definitions
- Network topology diagrams
- Design principle documentation
- Pattern catalog

---

### 2. Frontend Agent
**Role:** Web Application Development  
**Responsibilities:**
- Implement modern React + Vite application
- Create professional typography system
- Design responsive, academic-style layouts
- Implement component library for diagrams, tables, and content
- Ensure accessibility and performance

**Technology Stack:**
- React 18+ with JSX
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (navigation)
- No external diagram libraries initially (pure CSS/SVG)

**Deliverables:**
- Component library (Layout, Typography, Tables, Diagrams)
- Routing system
- Responsive design system
- Professional theme configuration

---

### 3. Content Agent
**Role:** Data Engineering Content Management  
**Responsibilities:**
- Structure technical content from markdown sources
- Transform existing architecture documentation into web format
- Maintain content organization and categorization
- Ensure technical accuracy

**Content Structure:**
- Architectures (patterns and implementations)
- Design Principles (isolation, observability, idempotency, audit trail)
- Network Topologies (DAG, pipeline, fan-out, fan-in)
- Implementation Examples (with code snippets)

**Deliverables:**
- Structured JSON/JS content files
- Content taxonomy
- Migration of existing markdown content

---

### 4. Quality Assurance Agent
**Role:** Code Quality and Best Practices  
**Responsibilities:**
- Ensure code follows best practices
- Maintain scalability and maintainability
- Review component architecture
- Ensure professional presentation standards

**Standards:**
- Clean, readable code
- Component modularity
- Performance optimization
- Professional typography and spacing
- Semantic HTML

---

### 5. DevOps Agent
**Role:** Build, Deployment, and Environment  
**Responsibilities:**
- Configure Vite build process
- Set up development environment
- Prepare deployment configuration
- Maintain project dependencies

**Deliverables:**
- package.json with dependencies
- Vite configuration
- Build scripts
- Development environment setup

---

## Project Phases

### Phase 1: Foundation (Current)
- [x] Project initialization
- [ ] AGENTS.md creation
- [ ] Memory system setup
- [ ] PROJECT_RULES.md creation
- [ ] Vite + React + Tailwind setup
- [ ] Basic project structure

### Phase 2: Core Components
- [ ] Typography system
- [ ] Layout components
- [ ] Navigation system
- [ ] Table components
- [ ] Diagram components (SVG-based)

### Phase 3: Content Integration
- [ ] Content data structure
- [ ] Migration of existing markdown content
- [ ] Architecture pages
- [ ] Design principles pages
- [ ] Network topology visualizations

### Phase 4: Enhancement
- [ ] Search functionality
- [ ] Content filtering
- [ ] Performance optimization
- [ ] Responsive refinements

---

## Communication Protocol

### Agent Coordination
- All agents follow PROJECT_RULES.md for state tracking
- Updates are logged in memory system
- Each agent focuses on their domain
- Cross-agent dependencies are documented

### Documentation Standards
- No emojis in production content
- Professional, academic tone
- Clear, concise technical writing
- Consistent formatting across all pages

### Code Standards
- Modern ES6+ JavaScript
- Functional React components
- Tailwind utility classes
- Component composition over inheritance
- Clear prop interfaces

---

## Success Criteria

### Technical
- Fast load times (< 2s initial load)
- Responsive across all devices
- Accessible (WCAG AA compliance)
- Clean, maintainable codebase

### Design
- Professional, academic appearance
- Clear information hierarchy
- Excellent typography
- Easy navigation
- No visual clutter

### Content
- Comprehensive architecture documentation
- Clear design patterns
- Well-organized topologies
- Practical examples

---

## Version Control Strategy

### Branch Structure
- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: Feature branches

### Commit Convention
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Formatting changes
- `refactor:` Code refactoring
- `test:` Test additions
- `chore:` Maintenance tasks

---

## Current Status
**Phase:** Foundation  
**Active Agents:** Architecture, Frontend, DevOps  
**Next Steps:** Initialize Vite project, create memory system, establish PROJECT_RULES.md
