'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { courses, batches } from '@/lib/data'
import { Users, Mail, Phone, BookOpen, DollarSign, Search, ArrowLeft, Calendar, CheckCircle, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function AdminStudentsPage() {
  const { user, allUsers, enrollments, deleteEnrollment } = useStore()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!user || user.role !== 'admin') {
    return null
  }

  // Filter students (exclude admin)
  const students = allUsers.filter(u => u.role === 'student')
  
  // Get enrollment data for each student
  const studentsWithData = students.map(student => {
    const studentEnrollments = enrollments.filter(e => e.studentId === student.id && e.paymentStatus === 'paid')
    const totalSpent = studentEnrollments.reduce((sum, e) => sum + e.amount, 0)
    const enrolledCourses = studentEnrollments.length
    
    return {
      ...student,
      enrollments: studentEnrollments,
      totalSpent,
      enrolledCourses,
    }
  })

  // Filter by search term
  const filteredStudents = studentsWithData.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.phone && s.phone.includes(searchTerm))
  )

  // Calculate stats
  const totalStudents = students.length
  const totalEnrollments = enrollments.filter(e => e.paymentStatus === 'paid').length
  const totalRevenue = enrollments
    .filter(e => e.paymentStatus === 'paid')
    .reduce((sum, e) => sum + e.amount, 0)
  const avgSpentPerStudent = totalStudents > 0 ? totalRevenue / totalStudents : 0

  // Handle delete enrollment
  const handleDeleteEnrollment = (enrollmentId: string, courseTitle: string) => {
    if (confirm(`Delete enrollment for ${courseTitle}? This action cannot be undone.`)) {
      deleteEnrollment(enrollmentId)
    }
  }

  const stats = [
    { icon: Users, label: 'Total Students', value: totalStudents, color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: BookOpen, label: 'Total Enrollments', value: totalEnrollments, color: 'text-purple-600', bg: 'bg-purple-100' },
    { icon: DollarSign, label: 'Total Revenue', value: formatCurrency(totalRevenue), color: 'text-green-600', bg: 'bg-green-100' },
    { icon: DollarSign, label: 'Avg per Student', value: formatCurrency(avgSpentPerStudent), color: 'text-orange-600', bg: 'bg-orange-100' },
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
            Student <span className="gradient-text">Management</span>
          </h1>
          <p className="text-xl text-slate-600">
            View and manage all registered students
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

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-6 mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </motion.div>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-2xl p-6 overflow-x-auto"
        >
          <h2 className="text-2xl font-bold mb-6">All Students ({filteredStudents.length})</h2>
          
          {filteredStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Enrollments</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Total Spent</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="font-semibold">{student.name}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Mail className="h-4 w-4" />
                          <span>{student.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {student.phone ? (
                          <div className="flex items-center space-x-2 text-slate-600">
                            <Phone className="h-4 w-4" />
                            <span>{student.phone}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-4 w-4 text-primary-600" />
                          <span className="font-medium">{student.enrolledCourses}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-green-600">
                          {formatCurrency(student.totalSpent)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => {
                            // Show student details modal or navigate to student detail page
                            alert(`Student Details:\n\nName: ${student.name}\nEmail: ${student.email}\nPhone: ${student.phone || 'N/A'}\nEnrollments: ${student.enrolledCourses}\nTotal Spent: ${formatCurrency(student.totalSpent)}`)
                          }}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No students found</h3>
              <p className="text-slate-600">
                {searchTerm ? 'Try a different search term' : 'No students have signed up yet'}
              </p>
            </div>
          )}
        </motion.div>

        {/* Student Enrollments Detail */}
        {filteredStudents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-effect rounded-2xl p-6 mt-8"
          >
            <h2 className="text-2xl font-bold mb-6">Student Enrollments</h2>
            <div className="space-y-4">
              {filteredStudents.slice(0, 5).map((student) => (
                <div key={student.id} className="p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-lg">{student.name}</div>
                      <div className="text-sm text-slate-600">{student.email}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary-600">
                        {student.enrolledCourses} course{student.enrolledCourses !== 1 ? 's' : ''}
                      </div>
                      <div className="text-sm text-slate-600">
                        {formatCurrency(student.totalSpent)} spent
                      </div>
                    </div>
                  </div>
                  {student.enrollments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {student.enrollments.map((enrollment) => {
                        const course = courses.find(c => c.id === enrollment.courseId)
                        const batch = batches.find(b => b.id === enrollment.batchId)
                        return (
                          <div key={enrollment.id} className="flex items-center justify-between p-2 bg-white rounded-lg text-sm">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="font-medium">{course?.title}</span>
                              {batch && (
                                <span className="text-slate-500">• {batch.name}</span>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-slate-600">
                              <span>{formatDate(enrollment.enrolledAt)}</span>
                              <span className="font-semibold text-green-600">
                                {formatCurrency(enrollment.amount)}
                              </span>
                              <button
                                onClick={() => handleDeleteEnrollment(enrollment.id, course?.title || 'Course')}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete enrollment"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
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
