'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import { User, Mail, Phone, Calendar, BookOpen, Award, Settings, Edit, Save, X } from 'lucide-react'
import { courses, batches } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export default function AccountPage() {
  const router = useRouter()
  const { user, setUser } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }
    setFormData({
      name: user.name,
      email: user.email,
      phone: '', // Add phone to User type if needed
    })
  }, [user, router])

  if (!user) {
    return null
  }

  const userEnrollments = batches.filter(b => 
    user.enrolledCourses.includes(b.courseId)
  )

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
      })
    }
    setIsEditing(false)
  }

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
            My <span className="gradient-text">Account</span>
          </h1>
          <p className="text-xl text-slate-600">Manage your profile and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 glass-effect rounded-lg">
                      <User className="h-5 w-5 text-slate-400" />
                      <span className="text-slate-800">{user.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 glass-effect rounded-lg">
                      <Mail className="h-5 w-5 text-slate-400" />
                      <span className="text-slate-800">{user.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="+91-XXXXXXXXXX"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 glass-effect rounded-lg">
                      <Phone className="h-5 w-5 text-slate-400" />
                      <span className="text-slate-800">{formData.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Account Type
                  </label>
                  <div className="flex items-center space-x-3 p-3 glass-effect rounded-lg">
                    <Settings className="h-5 w-5 text-slate-400" />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role === 'admin' ? 'Administrator' : 'Student'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enrolled Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Enrolled Courses</h2>
              {userEnrollments.length > 0 ? (
                <div className="space-y-4">
                  {userEnrollments.map((batch) => {
                    const course = courses.find(c => c.id === batch.courseId)
                    return (
                      <div key={batch.id} className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold">{course?.title}</div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            batch.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                            batch.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {batch.status}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600 mb-2">{batch.name}</div>
                        <div className="text-xs text-slate-500">
                          Starts: {formatDate(batch.startDate)} • {batch.schedule}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 mb-4">You haven't enrolled in any courses yet</p>
                  <a
                    href="/courses"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    <span>Browse Courses</span>
                  </a>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Avatar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-2xl p-6 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <h3 className="text-xl font-bold mb-1">{user.name}</h3>
              <p className="text-slate-600 mb-4">{user.email}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {user.role === 'admin' ? 'Administrator' : 'Student'}
              </span>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="font-bold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary-600" />
                    <span className="text-slate-600">Enrolled</span>
                  </div>
                  <span className="font-bold">{userEnrollments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <span className="text-slate-600">Certificates</span>
                  </div>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <span className="text-slate-600">Active</span>
                  </div>
                  <span className="font-bold">
                    {userEnrollments.filter(b => b.status === 'ongoing').length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
