'use client'

import { motion } from 'framer-motion'
import { Video, Code, Users, Award, Clock, Headphones } from 'lucide-react'

const features = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time learning with expert instructors and interactive sessions',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Code,
    title: 'Hands-On Projects',
    description: 'Build real-world projects to strengthen your portfolio',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of experience',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Award,
    title: 'Industry Certificates',
    description: 'Get recognized certificates upon course completion',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Learn at your own pace with recorded sessions available',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Get help whenever you need it from our support team',
    color: 'from-pink-500 to-rose-500',
  },
]

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">Coding Mafia</span>?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We provide everything you need to succeed in your coding journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-effect rounded-2xl p-8 card-hover"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
