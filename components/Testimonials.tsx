'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Software Engineer at Google',
    image: '/api/placeholder/80/80',
    rating: 5,
    text: 'Coding Mafia transformed my career. The Full Stack React course gave me the skills I needed to land my dream job at Google.',
    course: 'Full Stack React Development',
  },
  {
    name: 'Priya Sharma',
    role: 'Data Scientist at Microsoft',
    image: '/api/placeholder/80/80',
    rating: 5,
    text: 'The Python Data Science course is exceptional. The instructors are knowledgeable and the projects are industry-relevant.',
    course: 'Python for Data Science',
  },
  {
    name: 'Amit Patel',
    role: 'DevOps Engineer at Amazon',
    image: '/api/placeholder/80/80',
    rating: 5,
    text: 'Best investment in my career! The Docker & Kubernetes course helped me become a certified DevOps engineer.',
    course: 'Docker & Kubernetes Mastery',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join thousands of successful professionals who transformed their careers with us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-8 card-hover relative"
            >
              <Quote className="absolute top-6 right-6 h-12 w-12 text-primary-200" />
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-400" />
                <div>
                  <div className="font-bold text-slate-800">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                  <div className="text-xs text-primary-600 mt-1">{testimonial.course}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
