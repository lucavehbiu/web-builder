export default function Features() {
  const features = [
    {
      icon: "🎨",
      title: "Custom Design",
      description: "A unique website tailored to your brand and business needs. No cookie-cutter templates."
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description: "Your website looks perfect on all devices - phones, tablets, and desktops."
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized for speed with 99.9% uptime. Your customers won&apos;t wait for slow pages."
    },
    {
      icon: "🔒",
      title: "Secure Hosting",
      description: "SSL certificate included. Your website and customer data are always protected."
    },
    {
      icon: "🔄",
      title: "Monthly Updates",
      description: "Keep your content fresh. We&apos;ll update your website monthly as part of the service."
    },
    {
      icon: "🛟",
      title: "Full Support",
      description: "Direct access to your developer. Get help when you need it, no call centers."
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Everything You Need,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Nothing You Don&apos;t
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
            Our all-inclusive package gives you a professional web presence without the hassle
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative flex flex-col items-start p-8 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 text-2xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-blue-50 px-6 py-3 text-sm font-medium text-blue-700">
            <span className="relative flex h-2 w-2 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            All features included in your $60/month subscription
          </div>
        </div>
      </div>
    </section>
  )
}