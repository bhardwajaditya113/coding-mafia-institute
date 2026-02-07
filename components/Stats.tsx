'use client'

import { motion } from 'framer-motion'
import { Users, Award, TrendingUp, Globe } from 'lucide-react'

const stats = [
  { icon: Users, value: '10,000+', label: 'Active Students', color: 'text-blue-600' },
  { icon: Award, value: '50+', label: 'Expert Courses', color: 'text-purple-600' },
  { icon: TrendingUp, value: '95%', label: 'Success Rate', color: 'text-green-600' },
  { icon: Globe, value: '120+', label: 'Countries', color: 'text-orange-600' },
]

export default function Stats() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 mb-4`}>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
