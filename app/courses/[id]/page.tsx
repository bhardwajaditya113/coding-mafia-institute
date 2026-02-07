'use client'

import Link from 'next/link'
import { courses, batches } from '@/lib/data'
import { Star, Clock, Users, BookOpen, CheckCircle, ArrowLeft, Calendar, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/utils'

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const course = courses.find(c => c.id === id)
  const courseBatches = batches.filter(b => b.courseId === id)

  if (!course) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
        <Link href="/courses" className="text-primary-600 hover:underline">
          Back to Courses
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/courses"
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Courses</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-2xl p-8"
            >
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                  {course.level}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-slate-600 mb-6">{course.description}</p>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-slate-600">({course.studentsCount.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <BookOpen className="h-5 w-5" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* What You'll Learn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Master core concepts and best practices',
                  'Build real-world projects for your portfolio',
                  'Get hands-on experience with industry tools',
                  'Learn from industry experts with years of experience',
                  'Receive personalized feedback and support',
                  'Get certified upon course completion',
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Course Curriculum */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {[
                  { week: 'Week 1-2', title: 'Introduction & Fundamentals', lessons: 8 },
                  { week: 'Week 3-4', title: 'Core Concepts & Practice', lessons: 10 },
                  { week: 'Week 5-6', title: 'Advanced Topics', lessons: 12 },
                  { week: 'Week 7-8', title: 'Projects & Real-World Applications', lessons: 10 },
                ].map((module, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-800">{module.title}</div>
                        <div className="text-sm text-slate-600">{module.week} • {module.lessons} lessons</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 space-y-6"
            >
              {/* Pricing Card */}
              <div className="glass-effect rounded-2xl p-6 border-2 border-primary-200">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold gradient-text mb-2">{formatCurrency(course.price)}</div>
                  <div className="text-slate-600">One-time payment</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-slate-700">Lifetime access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-slate-700">Certificate of completion</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-slate-700">24/7 support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-slate-700">Project-based learning</span>
                  </div>
                </div>

                <Link
                  href={`/enroll?course=${course.id}`}
                  className="block w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold text-center hover:shadow-xl transition-all mb-4"
                >
                  Enroll Now
                </Link>

                <div className="text-center text-sm text-slate-600">
                  30-day money-back guarantee
                </div>
              </div>

              {/* Instructor */}
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="font-bold mb-4">Instructor</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-xl">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{course.instructor}</div>
                    <div className="text-sm text-slate-600">Expert Instructor</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Available Batches */}
        {courseBatches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 glass-effect rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Available Batches</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {courseBatches.map((batch) => (
                <div key={batch.id} className="p-6 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">{batch.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      batch.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                      batch.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {batch.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(batch.startDate).toLocaleDateString()} - {new Date(batch.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{batch.schedule}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{batch.instructor}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-600">Enrollment</span>
                      <span className="font-semibold">{batch.enrolled}/{batch.capacity}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(batch.enrolled / batch.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                  <Link
                    href={`/enroll?course=${course.id}&batch=${batch.id}`}
                    className="block w-full px-4 py-2 bg-primary-600 text-white rounded-lg text-center font-medium hover:bg-primary-700 transition-colors"
                  >
                    Enroll in This Batch
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
