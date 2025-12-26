import { useState } from 'react'
import { useFont } from '../../contexts/FontContext'

const FontSelector = () => {
  const {
    fontFamily,
    fontSize,
    fontFamilies,
    fontSizes,
    changeFontFamily,
    changeFontSize,
    increaseFontSize,
    decreaseFontSize
  } = useFont()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Font settings"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        <span className="hidden sm:inline">Aa</span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="p-4 space-y-4">
              {/* Font Family Section */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Font Family
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(fontFamilies).map(([key, font]) => (
                    <button
                      key={key}
                      onClick={() => changeFontFamily(key)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        fontFamily === key
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Section */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Font Size
                </label>
                
                {/* Size Buttons */}
                <div className="flex items-center gap-2 mb-3">
                  <button
                    onClick={decreaseFontSize}
                    disabled={fontSize === 'small'}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease font size"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>

                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium text-gray-900">
                      {fontSizes[fontSize].name}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {fontSizes[fontSize].value}px
                    </span>
                  </div>

                  <button
                    onClick={increaseFontSize}
                    disabled={fontSize === 'large'}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Increase font size"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {/* Size Options */}
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(fontSizes).map(([key, size]) => (
                    <button
                      key={key}
                      onClick={() => changeFontSize(key)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        fontSize === key
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Preview
                </p>
                <p className={`${fontFamilies[fontFamily].class} text-gray-800`}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default FontSelector
