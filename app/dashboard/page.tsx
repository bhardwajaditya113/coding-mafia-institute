'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { BookOpen, Clock, Award, TrendingUp, PlayCircle, CheckCircle } from 'lucide-react'
import { courses, batches } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useStore()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  // Get user's actual enrollments (only paid ones)
  const { enrollments } = useStore()
  const userEnrollments = enrollments.filter(e => e.studentId === user.id && e.paymentStatus === 'paid')

  // Map enrollments to course data
  const enrolledCoursesData = userEnrollments.map(enrollment => {
    const course = courses.find(c => c.id === enrollment.courseId)
    const batch = batches.find(b => b.id === enrollment.batchId)
    return {
      enrollmentId: enrollment.id,
      courseId: enrollment.courseId,
      batchId: enrollment.batchId,
      progress: enrollment.progress,
      course,
      batch,
      enrolledAt: enrollment.enrolledAt,
      paymentStatus: enrollment.paymentStatus,
    }
  }).filter(ec => ec.course)

  // Calculate stats from actual enrollments
  const totalHours = enrolledCoursesData.reduce((sum, ec) => {
    const duration = ec.course?.duration || '0 weeks'
    const weeks = parseInt(duration) || 0
    return sum + (weeks * 10) // Approximate 10 hours per week
  }, 0)

  const completedCourses = enrolledCoursesData.filter(ec => ec.progress === 100).length
  const avgProgress = enrolledCoursesData.length > 0
    ? Math.round(enrolledCoursesData.reduce((sum, ec) => sum + ec.progress, 0) / enrolledCoursesData.length)
    : 0

  const stats = [
    { icon: BookOpen, label: 'Enrolled Courses', value: enrolledCoursesData.length, color: 'text-blue-600' },
    { icon: Clock, label: 'Hours Learned', value: `${totalHours}+`, color: 'text-purple-600' },
    { icon: Award, label: 'Certificates', value: completedCourses, color: 'text-green-600' },
    { icon: TrendingUp, label: 'Avg Progress', value: `${avgProgress}%`, color: 'text-orange-600' },
  ]

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Welcome Back, {user.name}! 👋
          </h1>
          <p className="text-xl text-slate-600">
            Continue your learning journey
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-6"
              >
                <div className={`inline-flex p-3 rounded-xl bg-slate-100 mb-4`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Continue Learning</h2>
            <Link href="/dashboard/courses" className="text-primary-600 hover:text-primary-700 font-medium">
              View All
            </Link>
          </div>

          {enrolledCoursesData.length > 0 ? (
            <div className="space-y-6">
              {enrolledCoursesData.map((item, index) => (
                <div key={item.enrollmentId} className="p-6 bg-slate-50 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold">{item.course?.title}</h3>
                        {item.paymentStatus === 'paid' && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            Paid
                          </span>
                        )}
                      </div>
                      {item.batch && (
                        <div className="text-sm text-slate-600 mb-2">
                          Batch: {item.batch.name} • {item.batch.schedule}
                        </div>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{item.course?.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{item.course?.lessons} lessons</span>
                        </div>
                        {item.enrolledAt && (
                          <div className="text-xs text-slate-500">
                            Enrolled: {new Date(item.enrolledAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600 mb-1">
                        {item.progress}%
                      </div>
                      <div className="text-sm text-slate-600">Complete</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="bg-gradient-to-r from-primary-600 to-accent-600 h-3 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {item.batch && new Date(item.batch.startDate) <= new Date() ? (
                      <Link
                        href={`/dashboard/courses/${item.courseId}`}
                        className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                      >
                        <PlayCircle className="h-5 w-5" />
                        <span>Continue Learning</span>
                      </Link>
                    ) : (
                      <div className="px-6 py-3 bg-slate-100 text-slate-600 rounded-lg font-medium">
                        Batch starts {item.batch ? formatDate(item.batch.startDate) : 'soon'}
                      </div>
                    )}
                    <Link
                      href={`/courses/${item.courseId}`}
                      className="px-6 py-3 glass-effect rounded-lg font-medium hover:bg-slate-100 transition-colors"
                    >
                      View Details
                    </Link>
                    <Link
                      href="/contact"
                      className="px-6 py-3 glass-effect rounded-lg font-medium hover:bg-slate-100 transition-colors text-sm"
                    >
                      Contact Us
                    </Link>
                  </div>
                  {item.batch && new Date(item.batch.startDate) > new Date() && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> Our sales team will contact you when the batch starts. 
                        The meeting link will be shared via email and will be available in your dashboard.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No enrolled courses yet</h3>
              <p className="text-slate-600 mb-6">Start your learning journey by enrolling in a course</p>
              <Link
                href="/courses"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <span>Browse Courses</span>
              </Link>
            </div>
          )}
        </motion.div>

        {/* Enrollment Status - Only show if user has enrollments */}
        {enrolledCoursesData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Your Enrollments</h2>
            <div className="space-y-4">
              {enrolledCoursesData.map((item) => (
                <div key={item.enrollmentId} className="p-6 bg-slate-50 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{item.course?.title}</h3>
                      {item.batch && (
                        <div className="space-y-1 text-sm text-slate-600">
                          <div>Batch: <span className="font-medium">{item.batch.name}</span></div>
                          <div>Start Date: <span className="font-medium">{formatDate(item.batch.startDate)}</span></div>
                          <div>Schedule: <span className="font-medium">{item.batch.schedule}</span></div>
                          {item.enrolledAt && (
                            <div className="text-xs text-slate-500 mt-2">
                              Enrolled on: {formatDate(item.enrolledAt)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      {item.batch && new Date(item.batch.startDate) > new Date() ? (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                          Upcoming
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                  {item.batch && new Date(item.batch.startDate) > new Date() && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>📧 What's Next:</strong> Our sales team will contact you when the batch starts. 
                        The meeting link will be shared via email and will be available in your dashboard.
                      </p>
                      <Link 
                        href="/contact" 
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium underline mt-2 inline-block"
                      >
                        Contact us for any questions
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
