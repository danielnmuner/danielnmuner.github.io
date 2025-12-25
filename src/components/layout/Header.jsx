import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white border-b border-primary-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent-600 rounded"></div>
            <span className="text-xl font-semibold text-primary-900">
              Data Engineering Architecture
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
