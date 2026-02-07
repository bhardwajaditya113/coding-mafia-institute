'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Single Course',
    price: 'From ₹8,999',
    description: 'Perfect for focused learning',
    features: [
      'Access to one course',
      'Live interactive sessions',
      'Hands-on projects',
      'Certificate of completion',
      'Lifetime course access',
      '24/7 student support',
    ],
    popular: false,
  },
  {
    name: 'Course Bundle',
    price: 'From ₹24,999',
    description: 'Best value for multiple courses',
    features: [
      'Access to 3-5 courses',
      'All single course features',
      'Priority support',
      'Community access',
      'Career guidance',
      'Discount on future courses',
    ],
    popular: true,
  },
  {
    name: 'Full Program',
    price: 'Custom',
    description: 'Complete career transformation',
    features: [
      'Access to all courses',
      '1-on-1 mentorship',
      'Job placement assistance',
      'Portfolio review',
      'Interview preparation',
      'Lifetime access to updates',
    ],
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include access to course batches.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative glass-effect rounded-2xl p-8 ${
                plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold gradient-text mb-2">{plan.price}</div>
                <p className="text-slate-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-xl'
                    : 'glass-effect hover:bg-slate-100'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-slate-600"
        >
          <p>All prices are per batch enrollment. Contact us for custom enterprise pricing.</p>
        </motion.div>
      </div>
    </section>
  )
}
