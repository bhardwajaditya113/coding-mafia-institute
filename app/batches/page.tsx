'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { batches, courses } from '@/lib/data'
import { Calendar, Clock, Users, User, ArrowRight, Search, Filter, BookOpen } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function BatchesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [courseFilter, setCourseFilter] = useState<string>('all')

  const filteredBatches = useMemo(() => {
    return batches.filter((batch) => {
      const course = courses.find(c => c.id === batch.courseId)
      const matchesSearch = 
        batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        batch.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || batch.status === statusFilter
      const matchesCourse = courseFilter === 'all' || batch.courseId === courseFilter

      return matchesSearch && matchesStatus && matchesCourse
    })
  }, [searchQuery, statusFilter, courseFilter])

  const upcomingBatches = batches.filter(b => b.status === 'upcoming')
  const ongoingBatches = batches.filter(b => b.status === 'ongoing')

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Available <span className="gradient-text">Course Batches</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Enroll in upcoming batches and start your learning journey. Limited seats available!
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-2xl p-6 text-center"
          >
            <div className="text-4xl font-bold gradient-text mb-2">{upcomingBatches.length}</div>
            <div className="text-slate-600 font-medium">Upcoming Batches</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-6 text-center"
          >
            <div className="text-4xl font-bold gradient-text mb-2">{ongoingBatches.length}</div>
            <div className="text-slate-600 font-medium">Ongoing Batches</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-2xl p-6 text-center"
          >
            <div className="text-4xl font-bold gradient-text mb-2">
              {batches.reduce((sum, b) => sum + b.capacity - b.enrolled, 0)}
            </div>
            <div className="text-slate-600 font-medium">Seats Available</div>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search batches by course name, instructor, or batch name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass-effect rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-slate-600" />
              <span className="font-medium text-slate-700">Filters:</span>
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

            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="px-4 py-2 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>

            {(statusFilter !== 'all' || courseFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setStatusFilter('all')
                  setCourseFilter('all')
                  setSearchQuery('')
                }}
                className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-slate-600">
          Found <span className="font-bold text-primary-600">{filteredBatches.length}</span> batches
        </div>

        {/* Batches Grid */}
        {filteredBatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBatches.map((batch, index) => {
              const course = courses.find(c => c.id === batch.courseId)
              const isFull = batch.enrolled >= batch.capacity
              const seatsLeft = batch.capacity - batch.enrolled
              
              return (
                <BatchCard key={batch.id} batch={batch} course={course} index={index} isFull={isFull} seatsLeft={seatsLeft} />
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-600 mb-4">No batches found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('all')
                setCourseFilter('all')
              }}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function BatchCard({ batch, course, index, isFull, seatsLeft }: { 
  batch: any, 
  course: any, 
  index: number,
  isFull: boolean,
  seatsLeft: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-effect rounded-2xl overflow-hidden card-hover"
    >
      {/* Status Badge */}
      <div className="relative h-2">
        <div className={`absolute inset-0 ${
          batch.status === 'upcoming' ? 'bg-green-500' :
          batch.status === 'ongoing' ? 'bg-blue-500' :
          'bg-slate-400'
        }`} />
      </div>

      <div className="p-6">
        {/* Course Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
              {course?.category || 'Course'}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              batch.status === 'upcoming' ? 'bg-green-100 text-green-700' :
              batch.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
              'bg-slate-100 text-slate-700'
            }`}>
              {batch.status}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-1 text-slate-800">{batch.name}</h3>
          <p className="text-sm text-slate-600">{course?.title}</p>
        </div>

        {/* Batch Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(batch.startDate)} - {formatDate(batch.endDate)}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Clock className="h-4 w-4" />
            <span>{batch.schedule}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <User className="h-4 w-4" />
            <span>{batch.instructor}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Users className="h-4 w-4" />
            <span>
              {batch.enrolled}/{batch.capacity} enrolled
              {!isFull && <span className="text-green-600 font-medium ml-2">({seatsLeft} seats left)</span>}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                isFull ? 'bg-red-500' : 'bg-primary-600'
              }`}
              style={{ width: `${(batch.enrolled / batch.capacity) * 100}%` }}
            />
          </div>
        </div>

        {/* Course Price */}
        {course && (
          <div className="mb-4 p-3 bg-slate-50 rounded-lg">
            <div className="text-sm text-slate-600">Course Fee</div>
            <div className="text-2xl font-bold gradient-text">{formatCurrency(course.price)}</div>
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/enroll?batch=${batch.id}&course=${batch.courseId}`}
          className={`block w-full px-4 py-3 rounded-lg font-semibold text-center transition-all ${
            isFull || batch.status === 'completed'
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:shadow-lg'
          } flex items-center justify-center space-x-2`}
          onClick={(e) => {
            if (isFull || batch.status === 'completed') {
              e.preventDefault()
            }
          }}
        >
          {isFull ? (
            <>
              <span>Batch Full</span>
            </>
          ) : batch.status === 'completed' ? (
            <>
              <span>Batch Completed</span>
            </>
          ) : (
            <>
              <span>Enroll Now</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Link>
      </div>
    </motion.div>
  )
}
