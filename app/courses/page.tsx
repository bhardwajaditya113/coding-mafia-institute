'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { courses, categories } from '@/lib/data'
import { Course } from '@/types'
import { Search, Filter, Star, Clock, Users, ArrowRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = !selectedCategory || course.category === selectedCategory
      const matchesLevel = !selectedLevel || course.level === selectedLevel

      return matchesSearch && matchesCategory && matchesLevel
    })
  }, [searchQuery, selectedCategory, selectedLevel])

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Explore Our <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose from 50+ expert-led courses designed for IT professionals
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass-effect rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-slate-600" />
              <span className="font-medium text-slate-700">Filters:</span>
            </div>
            
            {/* Category Filter */}
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-4 py-2 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel || ''}
              onChange={(e) => setSelectedLevel(e.target.value || null)}
              className="px-4 py-2 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {(selectedCategory || selectedLevel) && (
              <button
                onClick={() => {
                  setSelectedCategory(null)
                  setSelectedLevel(null)
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
          Found <span className="font-bold text-primary-600">{filteredCourses.length}</span> courses
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-slate-600 mb-4">No courses found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
                setSelectedLevel(null)
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

function CourseCard({ course, index }: { course: Course; index: number }) {
  const category = categories.find(c => c.id === course.category)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-effect rounded-2xl overflow-hidden card-hover"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary-500 to-accent-500">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">{category?.icon || '📚'}</span>
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-600">
          {formatCurrency(course.price)}
        </div>
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700">
          {course.level}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
            {category?.name || course.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{course.rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-slate-800">{course.title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>

        <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{course.studentsCount.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/courses/${course.id}`}
          className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}
