'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { courses, batches } from '@/lib/data'
import { BarChart3, TrendingUp, DollarSign, Users, BookOpen, Calendar, ArrowLeft } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function AdminAnalyticsPage() {
  const { user, allUsers, enrollments } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!user || user.role !== 'admin') {
    return null
  }

  // Real analytics data
  const paidEnrollments = enrollments.filter(e => e.paymentStatus === 'paid')
  const students = allUsers.filter(u => u.role === 'student')

  // Revenue analytics
  const totalRevenue = paidEnrollments.reduce((sum, e) => sum + e.amount, 0)
  const avgEnrollmentValue = paidEnrollments.length > 0 ? totalRevenue / paidEnrollments.length : 0

  // Course performance
  const coursePerformance = courses.map(course => {
    const courseEnrollments = paidEnrollments.filter(e => e.courseId === course.id)
    return {
      course: course.title,
      enrollments: courseEnrollments.length,
      revenue: courseEnrollments.reduce((sum, e) => sum + e.amount, 0),
    }
  }).sort((a, b) => b.revenue - a.revenue)

  // Monthly revenue (last 6 months)
  const monthlyRevenue = useMemo(() => {
    const months: { [key: string]: number } = {}
    const now = new Date()
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      months[monthKey] = 0
    }

    paidEnrollments.forEach(enrollment => {
      const date = new Date(enrollment.enrolledAt)
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      if (months[monthKey] !== undefined) {
        months[monthKey] += enrollment.amount
      }
    })

    return Object.entries(months).map(([month, revenue]) => ({ month, revenue }))
  }, [paidEnrollments])

  // Enrollment trends
  const enrollmentTrends = useMemo(() => {
    const trends: { [key: string]: number } = {}
    const now = new Date()
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      trends[dateKey] = 0
    }

    paidEnrollments.forEach(enrollment => {
      const date = new Date(enrollment.enrolledAt)
      const dateKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      if (trends[dateKey] !== undefined) {
        trends[dateKey] += 1
      }
    })

    return Object.entries(trends).map(([date, count]) => ({ date, count }))
  }, [paidEnrollments])

  // Batch performance
  const batchPerformance = batches.map(batch => {
    const batchEnrollments = paidEnrollments.filter(e => e.batchId === batch.id)
    const course = courses.find(c => c.id === batch.courseId)
    return {
      batch: batch.name,
      course: course?.title || 'Unknown',
      enrollments: batchEnrollments.length,
      revenue: batchEnrollments.reduce((sum, e) => sum + e.amount, 0),
      capacity: batch.capacity,
      fillRate: batch.capacity > 0 ? (batchEnrollments.length / batch.capacity) * 100 : 0,
    }
  }).sort((a, b) => b.revenue - a.revenue)

  const stats = [
    { icon: Users, label: 'Total Students', value: students.length, color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: BookOpen, label: 'Total Enrollments', value: paidEnrollments.length, color: 'text-purple-600', bg: 'bg-purple-100' },
    { icon: DollarSign, label: 'Total Revenue', value: formatCurrency(totalRevenue), color: 'text-green-600', bg: 'bg-green-100' },
    { icon: TrendingUp, label: 'Avg Enrollment Value', value: formatCurrency(avgEnrollmentValue), color: 'text-orange-600', bg: 'bg-orange-100' },
  ]

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-primary-600 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Analytics & <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-xl text-slate-600">
            Track performance and growth metrics
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

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Monthly Revenue</h2>
            <div className="space-y-4">
              {monthlyRevenue.map((item, index) => {
                const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue), 1)
                const percentage = (item.revenue / maxRevenue) * 100
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{item.month}</span>
                      <span className="text-sm font-semibold text-primary-600">
                        {formatCurrency(item.revenue)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-primary-600 to-accent-600 h-3 rounded-full"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Enrollment Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Enrollment Trends (Last 7 Days)</h2>
            <div className="space-y-4">
              {enrollmentTrends.map((item, index) => {
                const maxCount = Math.max(...enrollmentTrends.map(t => t.count), 1)
                const percentage = (item.count / maxCount) * 100
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{item.date}</span>
                      <span className="text-sm font-semibold text-green-600">
                        {item.count} enrollment{item.count !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-full"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Top Performing Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-effect rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Top Performing Courses</h2>
          <div className="space-y-4">
            {coursePerformance.slice(0, 5).map((item, index) => {
              const maxRevenue = Math.max(...coursePerformance.map(c => c.revenue), 1)
              const percentage = (item.revenue / maxRevenue) * 100
              return (
                <div key={index} className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{item.course}</div>
                        <div className="text-sm text-slate-600">
                          {item.enrollments} enrollment{item.enrollments !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{formatCurrency(item.revenue)}</div>
                      <div className="text-xs text-slate-500">Revenue</div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Batch Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-effect rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-6">Batch Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Batch</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Course</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Enrollments</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Fill Rate</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {batchPerformance.slice(0, 10).map((batch, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium">{batch.batch}</td>
                    <td className="py-4 px-4 text-slate-600">{batch.course}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-primary-600" />
                        <span>{batch.enrollments}/{batch.capacity}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary-600 to-accent-600 h-2 rounded-full"
                            style={{ width: `${Math.min(batch.fillRate, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{batch.fillRate.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-green-600">
                      {formatCurrency(batch.revenue)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
