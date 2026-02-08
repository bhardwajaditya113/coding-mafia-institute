'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { courses, batches } from '@/lib/data'
import { BookOpen, Users, DollarSign, Search, ArrowLeft, Edit, Plus, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function AdminCoursesPage() {
  const { user, enrollments } = useStore()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!user || user.role !== 'admin') {
    return null
  }

  // Get enrollment data for each course
  const coursesWithData = courses.map(course => {
    const courseEnrollments = enrollments.filter(e => e.courseId === course.id && e.paymentStatus === 'paid')
    const enrolled = courseEnrollments.length
    const revenue = courseEnrollments.reduce((sum, e) => sum + e.amount, 0)
    const courseBatches = batches.filter(b => b.courseId === course.id)
    
    return {
      ...course,
      enrolled,
      revenue,
      batches: courseBatches.length,
    }
  })

  // Filter courses
  let filteredCourses = coursesWithData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sort by enrollment count
  filteredCourses.sort((a, b) => b.enrolled - a.enrolled)

  // Calculate stats
  const totalCourses = courses.length
  const totalEnrollments = enrollments.filter(e => e.paymentStatus === 'paid').length
  const totalRevenue = enrollments
    .filter(e => e.paymentStatus === 'paid')
    .reduce((sum, e) => sum + e.amount, 0)
  const avgRevenuePerCourse = totalCourses > 0 ? totalRevenue / totalCourses : 0

  const stats = [
    { icon: BookOpen, label: 'Total Courses', value: totalCourses, color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: Users, label: 'Total Enrollments', value: totalEnrollments, color: 'text-purple-600', bg: 'bg-purple-100' },
    { icon: DollarSign, label: 'Total Revenue', value: formatCurrency(totalRevenue), color: 'text-green-600', bg: 'bg-green-100' },
    { icon: TrendingUp, label: 'Avg Revenue/Course', value: formatCurrency(avgRevenuePerCourse), color: 'text-orange-600', bg: 'bg-orange-100' },
  ]

  const categories = ['all', ...Array.from(new Set(courses.map(c => c.category)))]

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
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Course <span className="gradient-text">Management</span>
              </h1>
              <p className="text-xl text-slate-600">
                Manage all courses and track performance
              </p>
            </div>
            <button
              onClick={() => alert('Course creation feature coming soon!')}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Course</span>
            </button>
          </div>
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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-6 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-effect rounded-2xl overflow-hidden card-hover"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-500 to-accent-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-white/20" />
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-600">
                  {course.enrolled} enrolled
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold flex-1">{course.title}</h3>
                  <button
                    onClick={() => alert('Edit course feature coming soon!')}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
                
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{course.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Category:</span>
                    <span className="font-medium">{course.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Batches:</span>
                    <span className="font-medium">{course.batches}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Price:</span>
                    <span className="font-semibold text-primary-600">{formatCurrency(course.price)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Revenue:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(course.revenue)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                      <Users className="h-4 w-4 inline mr-1" />
                      {course.enrolled} students
                    </div>
                    <Link
                      href={`/courses/${course.id}`}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl p-12 text-center"
          >
            <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-slate-600">
              {searchTerm || selectedCategory !== 'all' ? 'Try adjusting your filters' : 'No courses available'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
