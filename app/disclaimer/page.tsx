export default function DisclaimerPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto glass-effect rounded-2xl p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Disclaimer</h1>
        <p className="text-slate-600 mb-8">Last updated: March 8, 2026</p>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Educational Purpose</h2>
            <p>
              Content on this website is provided for educational and informational purposes only and should not
              be considered legal, financial, or professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">No Guaranteed Results</h2>
            <p>
              Learning outcomes and career results vary by individual. We do not guarantee employment,
              certification, income, or business outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Affiliate Disclosure</h2>
            <p>
              Some links on this website may be affiliate links. We may earn a commission at no additional cost
              to you when you purchase through those links.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Third-Party Content</h2>
            <p>
              We are not responsible for the accuracy, availability, or practices of external websites,
              products, or services referenced on this platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
