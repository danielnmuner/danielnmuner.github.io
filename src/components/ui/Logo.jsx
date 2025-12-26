const Logo = () => {
  return (
    <div className="relative w-32 h-32 bg-black rounded-xl overflow-hidden" style={{ width: '120px', height: '120px' }}>
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black"></div>
      
      {/* Top-right: "data" */}
      <div className="absolute top-2 right-2">
        <span className="text-[10px] font-semibold text-white/80 tracking-wider uppercase">
          data
        </span>
      </div>
      
      {/* Bottom-left: "BLACK BOX" */}
      <div className="absolute bottom-2 left-2 leading-none">
        <div className="text-white font-bold" style={{ fontSize: '18px', lineHeight: '1.1', letterSpacing: '-0.03em' }}>
          BLACK
        </div>
        <div className="text-white font-bold" style={{ fontSize: '18px', lineHeight: '1.1', letterSpacing: '-0.03em' }}>
          BOX
        </div>
      </div>
      
      {/* Subtle border for depth */}
      <div className="absolute inset-0 border border-white/10 rounded-xl"></div>
    </div>
  )
}

export default Logo
