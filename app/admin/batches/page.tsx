'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { batches, courses } from '@/lib/data'
import { Plus, Edit, Trash2, Calendar, Clock, Users, User, Search } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import CreateBatchModal from '@/components/CreateBatchModal'

export default function AdminBatchesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingBatch, setEditingBatch] = useState<any>(null)

  // In a real app, this would come from an API or database
  const [batchesList, setBatchesList] = useState(batches)

  const filteredBatches = batchesList.filter((batch) => {
    const course = courses.find(c => c.id === batch.courseId)
    const matchesSearch = 
      batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course?.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDelete = (batchId: string) => {
    if (confirm('Are you sure you want to delete this batch?')) {
      setBatchesList(batchesList.filter(b => b.id !== batchId))
    }
  }

  const handleCreate = (newBatch: any) => {
    // In real app, this would be an API call
    const batch = {
      ...newBatch,
      id: `batch-${Date.now()}`,
      enrolled: 0,
    }
    setBatchesList([...batchesList, batch])
    setIsCreateModalOpen(false)
  }

  const handleUpdate = (updatedBatch: any) => {
    setBatchesList(batchesList.map(b => b.id === updatedBatch.id ? updatedBatch : b))
    setEditingBatch(null)
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Batch <span className="gradient-text">Management</span>
            </h1>
            <p className="text-xl text-slate-600">
              Create and manage course batches
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create Batch</span>
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-effect rounded-2xl p-6">
            <div className="text-3xl font-bold gradient-text mb-2">
              {batchesList.length}
            </div>
            <div className="text-slate-600">Total Batches</div>
          </div>
          <div className="glass-effect rounded-2xl p-6">
            <div className="text-3xl font-bold gradient-text mb-2">
              {batchesList.filter(b => b.status === 'upcoming').length}
            </div>
            <div className="text-slate-600">Upcoming</div>
          </div>
          <div className="glass-effect rounded-2xl p-6">
            <div className="text-3xl font-bold gradient-text mb-2">
              {batchesList.filter(b => b.status === 'ongoing').length}
            </div>
            <div className="text-slate-600">Ongoing</div>
          </div>
          <div className="glass-effect rounded-2xl p-6">
            <div className="text-3xl font-bold gradient-text mb-2">
              {batchesList.reduce((sum, b) => sum + b.enrolled, 0)}
            </div>
            <div className="text-slate-600">Total Enrolled</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search batches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Batches Table */}
        <div className="glass-effect rounded-2xl overflow-hidden">
          <div className="overflow-x-auto max-w-full">
            <table className="w-full min-w-[800px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Batch Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Instructor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Start Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Schedule</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Enrollment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredBatches.map((batch) => {
                  const course = courses.find(c => c.id === batch.courseId)
                  return (
                    <tr key={batch.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{batch.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600">{course?.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600">{batch.instructor}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600">{formatDate(batch.startDate)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600">{batch.schedule}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <span className="font-semibold">{batch.enrolled}</span>
                          <span className="text-slate-500">/{batch.capacity}</span>
                        </div>
                        <div className="w-24 bg-slate-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-primary-600 h-1.5 rounded-full"
                            style={{ width: `${(batch.enrolled / batch.capacity) * 100}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          batch.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                          batch.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {batch.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingBatch(batch)}
                            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(batch.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {isCreateModalOpen && (
          <CreateBatchModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreate}
            courses={courses}
          />
        )}

        {editingBatch && (
          <CreateBatchModal
            isOpen={!!editingBatch}
            onClose={() => setEditingBatch(null)}
            onSubmit={handleUpdate}
            courses={courses}
            batch={editingBatch}
          />
        )}
      </div>
    </div>
  )
}
