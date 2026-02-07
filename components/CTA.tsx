'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-600 to-purple-600" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Limited Time Offer</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already advancing their careers. 
            Enroll in our next batch and start your journey today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/enroll"
              className="group px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <span>Enroll Now</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/courses"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
            >
              Browse Courses
            </Link>
          </div>

          <div className="pt-8 flex items-center justify-center space-x-8 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm">Expert Courses</div>
            </div>
            <div className="w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm">Happy Students</div>
            </div>
            <div className="w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm">Success Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
