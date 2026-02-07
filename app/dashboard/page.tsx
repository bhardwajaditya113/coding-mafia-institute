'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { BookOpen, Clock, Award, TrendingUp, PlayCircle, CheckCircle } from 'lucide-react'
import { courses, batches } from '@/lib/data'

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

  // Get user's enrolled courses
  const enrolledCourses = user.enrolledCourses.map(courseId => {
    const course = courses.find(c => c.id === courseId)
    const batch = batches.find(b => b.courseId === courseId)
    return {
      courseId,
      batchId: batch?.id || '',
      progress: Math.floor(Math.random() * 100), // Mock progress
      course,
      batch,
    }
  }).filter(ec => ec.course)

  const enrolledCoursesData = enrolledCourses

  const stats = [
    { icon: BookOpen, label: 'Enrolled Courses', value: enrolledCourses.length, color: 'text-blue-600' },
    { icon: Clock, label: 'Hours Learned', value: '120+', color: 'text-purple-600' },
    { icon: Award, label: 'Certificates', value: '2', color: 'text-green-600' },
    { icon: TrendingUp, label: 'Progress', value: '62%', color: 'text-orange-600' },
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
                <div key={index} className="p-6 bg-slate-50 rounded-xl">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{item.course?.title}</h3>
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
                    <Link
                      href={`/dashboard/courses/${item.courseId}`}
                      className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      <PlayCircle className="h-5 w-5" />
                      <span>Continue</span>
                    </Link>
                    <Link
                      href={`/courses/${item.courseId}`}
                      className="px-6 py-3 glass-effect rounded-lg font-medium hover:bg-slate-100 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
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

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Recent Achievements</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'First Lesson Completed', date: '2 days ago', icon: CheckCircle },
              { title: 'Week 1 Quiz Passed', date: '5 days ago', icon: Award },
              { title: 'Project Submitted', date: '1 week ago', icon: TrendingUp },
            ].map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <div key={index} className="p-6 bg-slate-50 rounded-xl">
                  <div className="inline-flex p-3 rounded-xl bg-primary-100 mb-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-slate-600">{achievement.date}</p>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
