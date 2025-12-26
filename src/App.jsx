import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Library from './pages/Library'
import DocumentView from './pages/DocumentView'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/document/:id" element={<DocumentView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
