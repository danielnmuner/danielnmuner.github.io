const Logo = () => {
  return (
    <div className="relative bg-black rounded-xl overflow-hidden border-2 border-white" style={{ width: '120px', height: '120px' }}>
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black"></div>
      
      {/* Bottom-left: "BLACK BOX" with "DATARCHS" below */}
      <div className="absolute bottom-2 left-2 leading-none">
        <div className="text-white font-bold" style={{ fontSize: '22px', lineHeight: '1.1', letterSpacing: '-0.03em' }}>
          BLACK
        </div>
        <div className="text-white font-bold mb-1" style={{ fontSize: '22px', lineHeight: '1.1', letterSpacing: '-0.03em' }}>
          BOX
        </div>
        <div className="text-white font-normal tracking-wide uppercase" style={{ fontSize: '10px', opacity: 1, fontWeight: 400 }}>
          DATARCHS
        </div>
      </div>
    </div>
  )
}

export default Logo
