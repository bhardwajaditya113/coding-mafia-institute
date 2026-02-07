'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, Users, User } from 'lucide-react'
import { Course, Batch } from '@/types'

interface CreateBatchModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (batch: any) => void
  courses: Course[]
  batch?: Batch
}

export default function CreateBatchModal({
  isOpen,
  onClose,
  onSubmit,
  courses,
  batch,
}: CreateBatchModalProps) {
  const [formData, setFormData] = useState({
    courseId: batch?.courseId || '',
    name: batch?.name || '',
    startDate: batch?.startDate || '',
    endDate: batch?.endDate || '',
    schedule: batch?.schedule || '',
    capacity: batch?.capacity || 50,
    instructor: batch?.instructor || '',
    status: batch?.status || 'upcoming',
  })

  useEffect(() => {
    if (batch) {
      setFormData({
        courseId: batch.courseId,
        name: batch.name,
        startDate: batch.startDate,
        endDate: batch.endDate,
        schedule: batch.schedule,
        capacity: batch.capacity,
        instructor: batch.instructor,
        status: batch.status,
      })
    }
  }, [batch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      id: batch?.id,
    })
    if (!batch) {
      setFormData({
        courseId: '',
        name: '',
        startDate: '',
        endDate: '',
        schedule: '',
        capacity: 50,
        instructor: '',
        status: 'upcoming',
      })
    }
  }

  const selectedCourse = courses.find(c => c.id === formData.courseId)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-effect rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {batch ? 'Edit Batch' : 'Create New Batch'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Course *
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) => {
                    setFormData({ ...formData, courseId: e.target.value })
                    if (!formData.name && selectedCourse) {
                      const batchNumber = Math.floor(Math.random() * 100) + 1
                      setFormData(prev => ({
                        ...prev,
                        courseId: e.target.value,
                        name: `${selectedCourse.title} - Batch ${batchNumber}`,
                      }))
                    }
                  }}
                  className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">Select a course...</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Batch Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Batch Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Full Stack React - Batch 15"
                  className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Schedule *
                </label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  placeholder="e.g., Mon, Wed, Fri - 7:00 PM IST"
                  className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              {/* Capacity and Instructor */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Users className="h-4 w-4 inline mr-2" />
                    Capacity *
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    min="1"
                    className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Instructor *
                  </label>
                  <input
                    type="text"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    placeholder="Instructor name"
                    className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 glass-effect rounded-lg font-semibold hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  {batch ? 'Update Batch' : 'Create Batch'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
