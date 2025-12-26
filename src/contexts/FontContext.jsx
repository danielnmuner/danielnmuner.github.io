import { createContext, useContext, useState, useEffect } from 'react'

const FontContext = createContext()

// Font families available
export const fontFamilies = {
  sans: {
    name: 'Sans Serif',
    class: 'font-sans',
    style: 'Inter, system-ui, -apple-system, sans-serif'
  },
  serif: {
    name: 'Serif',
    class: 'font-serif',
    style: 'Georgia, Cambria, "Times New Roman", Times, serif'
  }
}

// Font sizes available (in pixels for root element)
export const fontSizes = {
  small: { name: 'Small', value: 14, class: 'text-sm' },
  medium: { name: 'Medium', value: 16, class: 'text-base' },
  large: { name: 'Large', value: 18, class: 'text-lg' }
}

const STORAGE_KEYS = {
  FONT_FAMILY: 'app_font_family',
  FONT_SIZE: 'app_font_size'
}

export const FontProvider = ({ children }) => {
  // Initialize from localStorage or defaults
  const [fontFamily, setFontFamily] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.FONT_FAMILY)
    return stored && fontFamilies[stored] ? stored : 'sans'
  })

  const [fontSize, setFontSize] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.FONT_SIZE)
    return stored && fontSizes[stored] ? stored : 'medium'
  })

  // Apply font family to document
  useEffect(() => {
    const fontConfig = fontFamilies[fontFamily]
    if (fontConfig) {
      document.documentElement.style.fontFamily = fontConfig.style
      document.body.className = document.body.className
        .split(' ')
        .filter(c => !c.startsWith('font-'))
        .concat(fontConfig.class)
        .join(' ')
      
      localStorage.setItem(STORAGE_KEYS.FONT_FAMILY, fontFamily)
    }
  }, [fontFamily])

  // Apply font size to document
  useEffect(() => {
    const sizeConfig = fontSizes[fontSize]
    if (sizeConfig) {
      document.documentElement.style.fontSize = `${sizeConfig.value}px`
      localStorage.setItem(STORAGE_KEYS.FONT_SIZE, fontSize)
    }
  }, [fontSize])

  const changeFontFamily = (family) => {
    if (fontFamilies[family]) {
      setFontFamily(family)
    }
  }

  const changeFontSize = (size) => {
    if (fontSizes[size]) {
      setFontSize(size)
    }
  }

  const increaseFontSize = () => {
    const sizes = Object.keys(fontSizes)
    const currentIndex = sizes.indexOf(fontSize)
    if (currentIndex < sizes.length - 1) {
      setFontSize(sizes[currentIndex + 1])
    }
  }

  const decreaseFontSize = () => {
    const sizes = Object.keys(fontSizes)
    const currentIndex = sizes.indexOf(fontSize)
    if (currentIndex > 0) {
      setFontSize(sizes[currentIndex - 1])
    }
  }

  const resetToDefaults = () => {
    setFontFamily('sans')
    setFontSize('medium')
  }

  const value = {
    fontFamily,
    fontSize,
    fontFamilies,
    fontSizes,
    changeFontFamily,
    changeFontSize,
    increaseFontSize,
    decreaseFontSize,
    resetToDefaults
  }

  return (
    <FontContext.Provider value={value}>
      {children}
    </FontContext.Provider>
  )
}

export const useFont = () => {
  const context = useContext(FontContext)
  if (!context) {
    throw new Error('useFont must be used within a FontProvider')
  }
  return context
}
