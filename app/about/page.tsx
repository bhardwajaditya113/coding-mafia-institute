'use client'

import { motion } from 'framer-motion'
import { Target, Users, Award, TrendingUp } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower IT professionals with world-class coding skills and transform careers through expert-led training.',
  },
  {
    icon: Users,
    title: 'Expert Instructors',
    description: 'Learn from industry veterans with years of real-world experience at top tech companies.',
  },
  {
    icon: Award,
    title: 'Quality Education',
    description: 'Comprehensive curriculum designed by experts, updated regularly to match industry standards.',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: '95% of our students report career advancement within 6 months of course completion.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">Coding Mafia</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We are a premier coding training institute dedicated to empowering IT professionals 
            with cutting-edge skills and knowledge. Our mission is to bridge the gap between 
            industry requirements and professional capabilities.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-8 text-center"
              >
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-12 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="prose prose-lg max-w-none text-slate-700 space-y-4">
            <p>
              Coding Mafia was founded in 2020 with a vision to democratize quality coding education. 
              We recognized that traditional education often falls short in preparing professionals 
              for the rapidly evolving tech industry.
            </p>
            <p>
              Today, we've trained over 10,000 professionals across 120+ countries, helping them 
              advance their careers and achieve their goals. Our comprehensive curriculum, expert 
              instructors, and hands-on approach have made us a trusted name in IT training.
            </p>
            <p>
              We believe that everyone deserves access to world-class education, regardless of 
              their background or location. That's why we offer flexible learning options, 
              affordable pricing, and comprehensive support to ensure your success.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '10,000+', label: 'Students Trained' },
            { value: '50+', label: 'Expert Courses' },
            { value: '95%', label: 'Success Rate' },
            { value: '120+', label: 'Countries' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
