'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { batches, courses } from '@/lib/data'
import { Calendar, Clock, Users, User, ArrowRight } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function UpcomingBatches() {
  const upcomingBatches = batches
    .filter(b => b.status === 'upcoming' && b.enrolled < b.capacity)
    .slice(0, 6)

  if (upcomingBatches.length === 0) return null

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Upcoming <span className="gradient-text">Batches</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Enroll now in our upcoming batches. Limited seats available!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {upcomingBatches.map((batch, index) => {
            const course = courses.find(c => c.id === batch.courseId)
            const seatsLeft = batch.capacity - batch.enrolled
            
            return (
              <motion.div
                key={batch.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-effect rounded-2xl overflow-hidden card-hover"
              >
                <div className="relative h-2 bg-green-500" />
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-primary-600 uppercase">
                        {course?.category || 'Course'}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Upcoming
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-slate-800">{batch.name}</h3>
                    <p className="text-sm text-slate-600">{course?.title}</p>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-slate-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Starts: {formatDate(batch.startDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{batch.schedule}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{batch.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>
                        {batch.enrolled}/{batch.capacity} enrolled
                        <span className="text-green-600 font-medium ml-2">({seatsLeft} left)</span>
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(batch.enrolled / batch.capacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  {course && (
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                      <div className="text-sm text-slate-600">Course Fee</div>
                      <div className="text-2xl font-bold gradient-text">{formatCurrency(course.price)}</div>
                    </div>
                  )}

                  <Link
                    href={`/enroll?batch=${batch.id}&course=${batch.courseId}`}
                    className="block w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-center flex items-center justify-center space-x-2"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/batches"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            <span>View All Batches</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
