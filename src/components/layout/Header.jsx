import { Link } from 'react-router-dom'
import FontSelector from '../ui/FontSelector'
import Logo from '../ui/Logo'

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-black font-medium transition-colors">
              Home
            </Link>
            <Link to="/library" className="text-gray-700 hover:text-black font-medium transition-colors">
              Library
            </Link>
            <FontSelector />
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
