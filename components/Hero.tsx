'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play, TrendingUp, Users, Award } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-500/10 to-purple-500/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-full text-sm font-medium text-primary-600">
              <TrendingUp className="h-4 w-4" />
              <span>Premium Source Code + Career Accelerators</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Ship Faster with{' '}
              <span className="gradient-text">Battle-Tested</span> Products & Courses
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              Infinity Loop is your dual-engine growth platform: buy deploy-ready source code and
              master implementation with expert-led training. Built for founders, freelancers,
              agencies, and ambitious learners.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/marketplace"
                className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <span>Buy Source Code</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/courses"
                className="px-8 py-4 glass-effect rounded-xl font-semibold text-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <Play className="h-5 w-5 text-primary-600" />
                <span>Join Courses</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="flex items-center space-x-2 text-primary-600 mb-2">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-3xl font-bold">5K+</div>
                <div className="text-slate-600">Builder Installs</div>
              </div>
              <div>
                <div className="flex items-center space-x-2 text-accent-600 mb-2">
                  <Award className="h-5 w-5" />
                </div>
                <div className="text-3xl font-bold">10+</div>
                <div className="text-slate-600">Code Systems</div>
              </div>
              <div>
                <div className="flex items-center space-x-2 text-purple-600 mb-2">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="text-3xl font-bold">4.8★</div>
                <div className="text-slate-600">Learner & Buyer Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-10 -left-10 glass-effect p-6 rounded-2xl shadow-xl"
              >
                <div className="text-3xl font-bold gradient-text">50+</div>
                <div className="text-slate-600">Expert Courses</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-10 -right-10 glass-effect p-6 rounded-2xl shadow-xl"
              >
                <div className="text-3xl font-bold gradient-text">24/7</div>
                <div className="text-slate-600">Support</div>
              </motion.div>

              {/* Main Hero Visual */}
              <div className="relative bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl p-12 shadow-2xl">
                <div className="space-y-6 text-white">
                  <div className="text-6xl font-bold">🚀</div>
                  <h3 className="text-2xl font-bold">From Idea to Revenue</h3>
                  <p className="text-white/90">
                    Launch with ready source code and upscale with guided learning tracks.
                  </p>
                  <div className="flex items-center space-x-4 pt-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-white/20 border-2 border-white"
                        />
                      ))}
                    </div>
                    <span className="text-sm">500+ active builders this month</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
