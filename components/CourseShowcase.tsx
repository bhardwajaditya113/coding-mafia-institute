'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { courses, batches } from '@/lib/data'
import { Star, Clock, Users, BookOpen, ArrowRight, Calendar } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function CourseShowcase() {
  // Get courses with their available batches - show all courses, not just those with batches
  const coursesWithBatches = courses.map(course => {
    const courseBatches = batches.filter(b => 
      b.courseId === course.id && 
      b.status !== 'completed' && 
      b.enrolled < b.capacity
    )
    return { ...course, availableBatches: courseBatches }
  })

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
            Our <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore our comprehensive range of IT and software development courses. 
            Enroll in upcoming batches and start your learning journey today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesWithBatches.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-effect rounded-2xl overflow-hidden card-hover"
            >
              {/* Course Header */}
              <div className="relative h-48 bg-gradient-to-br from-primary-500 to-accent-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">📚</span>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-600">
                  {formatCurrency(course.price)}
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700">
                  {course.level}
                </div>
              </div>

              <div className="p-6">
                {/* Course Info */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                      {course.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-800">{course.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                </div>

                {/* Course Stats */}
                <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.studentsCount.toLocaleString()}+</span>
                  </div>
                </div>

                {/* Available Batches */}
                <div className="mb-4 p-3 bg-primary-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-semibold text-primary-700">
                      {course.availableBatches.length} Batch{course.availableBatches.length !== 1 ? 'es' : ''} Available
                    </span>
                  </div>
                  <div className="space-y-1">
                    {course.availableBatches.slice(0, 2).map((batch) => (
                      <div key={batch.id} className="text-xs text-slate-600">
                        • {batch.name} - {new Date(batch.startDate).toLocaleDateString()}
                      </div>
                    ))}
                    {course.availableBatches.length > 2 && (
                      <div className="text-xs text-primary-600 font-medium">
                        +{course.availableBatches.length - 2} more batches
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/courses/${course.id}`}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {course.availableBatches.length > 0 && (
                    <Link
                      href={`/enroll?course=${course.id}`}
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 glass-effect rounded-lg font-medium hover:bg-slate-100 transition-colors text-center"
                    >
                      <span>Enroll in Batch</span>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/courses"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            <span>View All Courses</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
