'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { courses, batches } from '@/lib/data'
import { BookOpen, Clock, PlayCircle, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function MyCoursesPage() {
  const router = useRouter()
  const { user, enrollments } = useStore()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  // Get user's actual enrollments (only paid ones)
  const userEnrollments = enrollments.filter(e => e.studentId === user.id && e.paymentStatus === 'paid')

  const enrolledCoursesData = userEnrollments.map(enrollment => {
    const course = courses.find(c => c.id === enrollment.courseId)
    const batch = batches.find(b => b.id === enrollment.batchId)
    return {
      enrollmentId: enrollment.id,
      courseId: enrollment.courseId,
      batchId: enrollment.batchId,
      progress: enrollment.progress,
      enrolledAt: enrollment.enrolledAt,
      course,
      batch,
    }
  }).filter(ec => ec.course)

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
                key={item.enrollmentId}
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
                      <div className="text-xs text-slate-500 mt-1">
                        Enrolled: {formatDate(item.enrolledAt)}
                      </div>
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

                  {item.batch && new Date(item.batch.startDate) > new Date() && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800 mb-2">
                        <strong>📧 Note:</strong> Our sales team will contact you when the batch starts. 
                        The meeting link will be shared via email.
                      </p>
                      <Link 
                        href="/contact" 
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium underline"
                      >
                        Contact us for questions
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    {item.batch && new Date(item.batch.startDate) <= new Date() ? (
                      <Link
                        href={`/dashboard/courses/${item.courseId}`}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        <PlayCircle className="h-5 w-5" />
                        <span>Continue Learning</span>
                      </Link>
                    ) : (
                      <div className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 rounded-lg font-medium text-center">
                        Batch starts {item.batch ? formatDate(item.batch.startDate) : 'soon'}
                      </div>
                    )}
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
