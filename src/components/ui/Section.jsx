const Section = ({ title, subtitle, children }) => {
  return (
    <section className="mb-12">
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-3xl font-semibold text-primary-900 mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-primary-600">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}

export default Section
