'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useStore } from '@/lib/store'
import { courses, batches } from '@/lib/data'
import { 
  BookOpen, 
  Clock, 
  PlayCircle, 
  CheckCircle, 
  Video, 
  FileText, 
  Download,
  Calendar,
  Users,
  ArrowLeft,
  ExternalLink,
  MessageCircle,
  Mail,
  Award
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function CourseLearningPage() {
  const router = useRouter()
  const params = useParams()
  const courseId = params.id as string
  const { user, enrollments } = useStore()

  const [enrollment, setEnrollment] = useState<any>(null)
  const [course, setCourse] = useState<any>(null)
  const [batch, setBatch] = useState<any>(null)

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    // Find course
    const foundCourse = courses.find(c => c.id === courseId)
    if (!foundCourse) {
      router.push('/dashboard')
      return
    }
    setCourse(foundCourse)

    // Find user's enrollment for this course
    const userEnrollments = enrollments.filter(
      e => e.studentId === user.id && 
      e.courseId === courseId && 
      e.paymentStatus === 'paid'
    )

    if (userEnrollments.length === 0) {
      // User not enrolled, redirect to course page
      router.push(`/courses/${courseId}`)
      return
    }

    const foundEnrollment = userEnrollments[0]
    setEnrollment(foundEnrollment)

    // Find batch
    if (foundEnrollment.batchId) {
      const foundBatch = batches.find(b => b.id === foundEnrollment.batchId)
      setBatch(foundBatch)
    }
  }, [user, courseId, enrollments, router])

  if (!user || !course || !enrollment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading course...</p>
        </div>
      </div>
    )
  }

  const isBatchStarted = batch && new Date(batch.startDate) <= new Date()
  const meetingLink = batch?.meetingLink || null // This would come from your backend/API

  // Mock lessons/modules - in production, this would come from your backend
  const modules = [
    { id: 1, title: 'Introduction to Course', lessons: 5, duration: '2 hours', completed: enrollment.progress > 0 },
    { id: 2, title: 'Core Concepts', lessons: 8, duration: '4 hours', completed: enrollment.progress > 25 },
    { id: 3, title: 'Hands-on Practice', lessons: 10, duration: '6 hours', completed: enrollment.progress > 50 },
    { id: 4, title: 'Advanced Topics', lessons: 7, duration: '5 hours', completed: enrollment.progress > 75 },
    { id: 5, title: 'Final Project', lessons: 3, duration: '8 hours', completed: enrollment.progress === 100 },
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
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-primary-600 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{course.title}</h1>
              <p className="text-xl text-slate-600 mb-4">{course.description}</p>
              
              {batch && (
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Batch: <span className="font-semibold">{batch.name}</span></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{batch.schedule}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{batch.enrolled}/{batch.capacity} students</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {enrollment.progress}%
              </div>
              <div className="text-sm text-slate-600">Complete</div>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Course Progress</span>
              <span className="text-sm font-semibold text-primary-600">{enrollment.progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${enrollment.progress}%` }}
                transition={{ duration: 1 }}
                className="bg-gradient-to-r from-primary-600 to-accent-600 h-4 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Course Modules */}
          <div className="lg:col-span-2 space-y-6">
            {/* Batch Status Card */}
            {batch && !isBatchStarted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-effect rounded-2xl p-6 bg-blue-50 border-2 border-blue-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Batch Starting Soon</h3>
                    <p className="text-slate-700 mb-3">
                      Your batch <span className="font-semibold">{batch.name}</span> starts on{' '}
                      <span className="font-semibold">{formatDate(batch.startDate)}</span>.
                    </p>
                    <p className="text-sm text-slate-600 mb-4">
                      Our sales team will contact you when the batch starts. The meeting link will be shared via email and will also be available here.
                    </p>
                    <div className="flex items-center space-x-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Contact Us</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Meeting Link Card */}
            {batch && isBatchStarted && meetingLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-effect rounded-2xl p-6 bg-green-50 border-2 border-green-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Video className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Live Session</h3>
                    <p className="text-slate-700 mb-4">
                      Join your batch live session using the link below.
                    </p>
                    <a
                      href={meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>Join Live Session</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Course Modules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold mb-6">Course Modules</h2>
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`p-5 rounded-xl border-2 transition-all ${
                      module.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-slate-50 border-slate-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-3 rounded-lg ${
                          module.completed ? 'bg-green-100' : 'bg-slate-100'
                        }`}>
                          {module.completed ? (
                            <CheckCircle className={`h-6 w-6 ${
                              module.completed ? 'text-green-600' : 'text-slate-400'
                            }`} />
                          ) : (
                            <PlayCircle className="h-6 w-6 text-slate-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{module.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <div className="flex items-center space-x-1">
                              <FileText className="h-4 w-4" />
                              <span>{module.lessons} lessons</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{module.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {module.completed && (
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Course Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-2xl p-6 sticky top-24"
            >
              <h3 className="font-bold text-lg mb-4">Course Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-600 mb-1">Duration</div>
                  <div className="font-semibold">{course.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Lessons</div>
                  <div className="font-semibold">{course.lessons} lessons</div>
                </div>
                <div>
                  <div className="text-sm text-slate-600 mb-1">Level</div>
                  <div className="font-semibold">{course.level}</div>
                </div>
                {batch && (
                  <>
                    <div className="pt-4 border-t border-slate-200">
                      <div className="text-sm text-slate-600 mb-1">Batch</div>
                      <div className="font-semibold">{batch.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 mb-1">Instructor</div>
                      <div className="font-semibold">{batch.instructor}</div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Support Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="font-bold text-lg mb-4">Need Help?</h3>
              <p className="text-sm text-slate-600 mb-4">
                Our support team is here to help you succeed in your learning journey.
              </p>
              <div className="space-y-3">
                <Link
                  href="/contact"
                  className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-primary-600" />
                  <span className="font-medium">Contact Support</span>
                </Link>
                <a
                  href="mailto:bhardwajaditya113@gmail.com"
                  className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary-600" />
                  <span className="font-medium">Email Us</span>
                </a>
              </div>
            </motion.div>

            {/* Certificate Card */}
            {enrollment.progress === 100 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-effect rounded-2xl p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200"
              >
                <div className="text-center">
                  <Award className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Course Completed!</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Congratulations on completing the course!
                  </p>
                  <button
                    onClick={() => alert('Certificate download will be available soon!')}
                    className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Certificate</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
