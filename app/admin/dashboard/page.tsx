'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { batches, courses } from '@/lib/data'
import { Users, BookOpen, TrendingUp, DollarSign, Calendar, Award, BarChart3, ArrowRight } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function AdminDashboard() {
  const { user } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!user || user.role !== 'admin') {
    return null
  }

  const totalStudents = 10000 // Mock data
  const totalCourses = courses.length
  const totalBatches = batches.length
  const upcomingBatches = batches.filter(b => b.status === 'upcoming').length
  const ongoingBatches = batches.filter(b => b.status === 'ongoing').length
  const totalEnrolled = batches.reduce((sum, b) => sum + b.enrolled, 0)
  const totalRevenue = batches.reduce((sum, b) => {
    const course = courses.find(c => c.id === b.courseId)
    return sum + (course ? course.price * b.enrolled : 0)
  }, 0)

  const stats = [
    { icon: Users, label: 'Total Students', value: totalStudents.toLocaleString(), color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: BookOpen, label: 'Total Courses', value: totalCourses, color: 'text-purple-600', bg: 'bg-purple-100' },
    { icon: Calendar, label: 'Total Batches', value: totalBatches, color: 'text-green-600', bg: 'bg-green-100' },
    { icon: TrendingUp, label: 'Total Revenue', value: formatCurrency(totalRevenue), color: 'text-orange-600', bg: 'bg-orange-100' },
  ]

  const recentBatches = batches.slice(0, 5)
  const topCourses = courses
    .map(course => {
      const courseBatches = batches.filter(b => b.courseId === course.id)
      const enrolled = courseBatches.reduce((sum, b) => sum + b.enrolled, 0)
      return { ...course, enrolled }
    })
    .sort((a, b) => b.enrolled - a.enrolled)
    .slice(0, 5)

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-xl text-slate-600">
            Welcome back, {user.name}! Manage your institute efficiently.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-6 card-hover"
              >
                <div className={`inline-flex p-3 rounded-xl ${stat.bg} mb-4`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/admin/batches"
              className="p-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl text-white hover:shadow-xl transition-all text-center"
            >
              <Calendar className="h-6 w-6 mx-auto mb-2" />
              <div className="font-semibold">Manage Batches</div>
            </Link>
            <Link
              href="/admin/courses"
              className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white hover:shadow-xl transition-all text-center"
            >
              <BookOpen className="h-6 w-6 mx-auto mb-2" />
              <div className="font-semibold">Manage Courses</div>
            </Link>
            <Link
              href="/admin/students"
              className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white hover:shadow-xl transition-all text-center"
            >
              <Users className="h-6 w-6 mx-auto mb-2" />
              <div className="font-semibold">View Students</div>
            </Link>
            <Link
              href="/admin/analytics"
              className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white hover:shadow-xl transition-all text-center"
            >
              <BarChart3 className="h-6 w-6 mx-auto mb-2" />
              <div className="font-semibold">Analytics</div>
            </Link>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Batches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Batches</h2>
              <Link href="/admin/batches" className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1">
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentBatches.map((batch, index) => {
                const course = courses.find(c => c.id === batch.courseId)
                return (
                  <div key={batch.id} className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{batch.name}</div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        batch.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                        batch.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {batch.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 mb-2">{course?.title}</div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">
                        {formatDate(batch.startDate)} • {batch.enrolled}/{batch.capacity} enrolled
                      </span>
                      <span className="font-semibold text-primary-600">
                        {formatCurrency(course?.price || 0)}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Top Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Performing Courses</h2>
              <Award className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={course.id} className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{course.title}</div>
                        <div className="text-xs text-slate-600">{course.category}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm text-slate-600">
                      <Users className="h-4 w-4 inline mr-1" />
                      {course.enrolled} enrolled
                    </div>
                    <div className="font-semibold text-primary-600">
                      {formatCurrency(course.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
