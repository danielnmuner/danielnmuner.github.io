const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-primary-200 p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

export default Card
