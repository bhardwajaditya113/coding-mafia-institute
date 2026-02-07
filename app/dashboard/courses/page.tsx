'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { courses, batches } from '@/lib/data'
import { BookOpen, Clock, PlayCircle, ArrowRight } from 'lucide-react'

export default function MyCoursesPage() {
  // Mock enrolled courses
  const enrolledCourses = [
    { courseId: 'fullstack-react', batchId: 'batch-001', progress: 45, enrolledAt: '2024-01-15' },
    { courseId: 'python-data-science', batchId: 'batch-002', progress: 78, enrolledAt: '2024-01-10' },
  ]

  const enrolledCoursesData = enrolledCourses.map(ec => {
    const course = courses.find(c => c.id === ec.courseId)
    const batch = batches.find(b => b.id === ec.batchId)
    return { ...ec, course, batch }
  })

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">My Courses</h1>
          <p className="text-xl text-slate-600">Manage and continue your enrolled courses</p>
        </motion.div>

        {enrolledCoursesData.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {enrolledCoursesData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-2xl overflow-hidden card-hover"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary-500 to-accent-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white/20" />
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-600">
                    {item.progress}% Complete
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.course?.title}</h3>
                  {item.batch && (
                    <div className="text-sm text-slate-600 mb-4">
                      <div>Batch: {item.batch.name}</div>
                      <div>{item.batch.schedule}</div>
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-slate-600 mb-6">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{item.course?.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{item.course?.lessons} lessons</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/dashboard/courses/${item.courseId}`}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      <PlayCircle className="h-5 w-5" />
                      <span>Continue Learning</span>
                    </Link>
                    <Link
                      href={`/courses/${item.courseId}`}
                      className="px-4 py-3 glass-effect rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen className="h-20 w-20 text-slate-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-2">No courses enrolled yet</h3>
            <p className="text-slate-600 mb-8">Start your learning journey by enrolling in a course</p>
            <Link
              href="/courses"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
            >
              <span>Browse Courses</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
