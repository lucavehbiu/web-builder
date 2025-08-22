export default function FeaturesCompact() {
  const features = [
    {
      title: "Custom Design",
      description: "Unique to your brand"
    },
    {
      title: "Fast Hosting",
      description: "99.9% uptime guarantee"
    },
    {
      title: "Monthly Updates",
      description: "Keep content fresh"
    },
    {
      title: "Full Support",
      description: "Direct developer access"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What You Get for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              €49.9/month
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center group"
            >
              {/* Feature */}
              <div className="bg-white rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-300 group-hover:scale-105">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-medium text-gray-700 shadow-xs border border-gray-200">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Everything included • No hidden fees • Cancel anytime
          </div>
        </div>
      </div>
    </section>
  )
}