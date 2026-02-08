'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { courses, batches } from '@/lib/data'
import { CheckCircle, ArrowRight, Calendar, Clock, User, Users, CreditCard, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { Batch, Course } from '@/types'
import { useStore } from '@/lib/store'
import { initiateRazorpayPayment, loadRazorpayScript } from '@/lib/razorpay'

export default function EnrollPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, setUser } = useStore()
  const courseId = searchParams.get('course')
  const batchId = searchParams.get('batch')

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    experience: '',
    goals: '',
  })
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState('')

  // Batch-first approach: if batch is selected, get course from batch
  const initialBatch: Batch | null = batchId ? batches.find(b => b.id === batchId) || null : null
  const initialCourse: Course | null = initialBatch 
    ? courses.find(c => c.id === initialBatch.courseId) || null
    : courseId 
      ? courses.find(c => c.id === courseId) || null
      : null

  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(initialBatch)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(initialCourse)

  // If batch is selected, show only that batch. Otherwise show all available batches for the course
  const availableBatches = selectedBatch
    ? [selectedBatch]
    : selectedCourse
      ? batches.filter(b => b.courseId === selectedCourse.id && b.status !== 'completed')
      : batches.filter(b => b.status !== 'completed')

  useEffect(() => {
    // Load Razorpay script when component mounts
    loadRazorpayScript()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentError('')
    
    if (!selectedCourse || !selectedBatch) {
      setPaymentError('Please select a course and a batch to enroll.')
      return
    }

    if (!user) {
      if (confirm('Please sign in to enroll. Would you like to sign in now?')) {
        router.push(`/auth/login?redirect=/enroll?course=${selectedCourse.id}&batch=${selectedBatch.id}`)
      }
      return
    }

    if (!formData.phone) {
      setPaymentError('Phone number is required for payment.')
      return
    }

    // Ensure course has a price (payment required)
    if (!selectedCourse.price || selectedCourse.price <= 0) {
      setPaymentError('This course requires payment. Please contact support if you believe this is an error.')
      return
    }

    setIsProcessingPayment(true)

    try {
      // Generate enrollment ID (will be used only after successful payment)
      const enrollmentId = `enroll-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      
      // Initiate Razorpay payment - this will open the payment modal
      // The promise only resolves when payment is successfully completed
      // If user cancels or payment fails, promise will reject and go to catch block
      const paymentResponse = await initiateRazorpayPayment({
        amount: selectedCourse.price * 100, // Convert to paise
        currency: 'INR',
        name: 'Coding Mafia Institute',
        description: `Enrollment for ${selectedCourse.title} - ${selectedBatch.name}`,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#3b82f6',
        },
      })

      // Verify payment response is valid
      if (!paymentResponse) {
        throw new Error('Payment failed: No response received')
      }

      if (!paymentResponse.razorpay_payment_id) {
        throw new Error('Payment failed: No payment ID received')
      }

      // Payment successful - NOW create enrollment
      // This code only executes if payment was completed successfully
      const { addEnrollment } = useStore.getState()
      
      const enrollment = {
        id: enrollmentId,
        studentId: user.id,
        courseId: selectedCourse.id,
        batchId: selectedBatch.id,
        enrolledAt: new Date().toISOString(),
        status: 'active' as const,
        progress: 0,
        paymentStatus: 'paid' as const,
        paymentId: paymentResponse.razorpay_payment_id,
        amount: selectedCourse.price,
      }

      addEnrollment(enrollment)

      // Update user's enrolled courses
      if (!user.enrolledCourses.includes(selectedCourse.id)) {
        setUser({
          ...user,
          enrolledCourses: [...user.enrolledCourses, selectedCourse.id],
          phone: formData.phone,
        })
      }

      // Redirect to payment success page
      router.push(`/payment/success?enrollment=${enrollmentId}&payment=${paymentResponse.razorpay_payment_id}`)
    } catch (error: any) {
      console.error('Payment error:', error)
      setIsProcessingPayment(false)
      
      // Handle different error types
      if (error.message === 'Payment cancelled by user') {
        setPaymentError('Payment was cancelled. Please try again if you want to complete enrollment.')
      } else if (error.message?.includes('Razorpay key not configured')) {
        setPaymentError('Payment gateway not configured. Please contact support.')
      } else if (error.message?.includes('Failed to load')) {
        setPaymentError('Failed to load payment gateway. Please refresh the page and try again.')
      } else {
        setPaymentError(error.message || 'Payment failed. Please try again or contact support.')
      }
    }
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Enroll in a <span className="gradient-text">Batch</span>
          </h1>
          <p className="text-xl text-slate-600">
            Fill out the form below to enroll in your chosen batch
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enrollment Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="glass-effect rounded-2xl p-8 space-y-6"
            >
              {/* Batch Selection - Primary */}
              {!selectedBatch && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Select Batch *
                  </label>
                  <select
                    value=""
                    onChange={(e) => {
                      const batch = batches.find(b => b.id === e.target.value)
                      setSelectedBatch(batch || null)
                      if (batch) {
                        const course = courses.find(c => c.id === batch.courseId)
                        setSelectedCourse(course || null)
                      }
                    }}
                    className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Choose a batch...</option>
                    {batches
                      .filter(b => b.status !== 'completed' && b.enrolled < b.capacity)
                      .map((batch) => {
                        const course = courses.find(c => c.id === batch.courseId)
                        return (
                          <option key={batch.id} value={batch.id}>
                            {batch.name} - {course?.title} ({formatCurrency(course?.price || 0)})
                          </option>
                        )
                      })}
                  </select>
                </div>
              )}

              {/* Show Selected Batch and Course */}
              {selectedBatch && selectedCourse && (
                <div className="space-y-4">
                  <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-semibold text-slate-800">{selectedBatch.name}</div>
                        <div className="text-sm text-slate-600">{selectedCourse.title}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBatch(null)
                          setSelectedCourse(null)
                        }}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Change
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                      <div>
                        <span className="text-slate-600">Start Date:</span>
                        <span className="ml-2 font-medium">{new Date(selectedBatch.startDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Schedule:</span>
                        <span className="ml-2 font-medium">{selectedBatch.schedule}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Instructor:</span>
                        <span className="ml-2 font-medium">{selectedBatch.instructor}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">Seats:</span>
                        <span className="ml-2 font-medium">{selectedBatch.enrolled}/{selectedBatch.capacity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Alternative: Show batches if course is selected but no batch */}
              {selectedCourse && !selectedBatch && availableBatches.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Select Batch *
                  </label>
                  <div className="space-y-3">
                    {availableBatches.map((batch) => {
                      const isSelected = selectedBatch !== null && (selectedBatch as Batch).id === batch.id
                      return (
                        <div
                          key={batch.id}
                          onClick={() => {
                            setSelectedBatch(batch)
                            const course = courses.find(c => c.id === batch.courseId)
                            setSelectedCourse(course || null)
                          }}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-slate-200 hover:border-primary-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold">{batch.name}</div>
                            <div className={`px-2 py-1 rounded text-xs font-medium ${
                              batch.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {batch.status}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(batch.startDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{batch.schedule}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1 text-slate-600">
                              <Users className="h-4 w-4" />
                              <span>{batch.enrolled}/{batch.capacity} enrolled</span>
                            </div>
                            {isSelected && (
                              <CheckCircle className="h-5 w-5 text-primary-600" />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select your experience level...</option>
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-3 years)</option>
                  <option value="advanced">Advanced (3+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Learning Goals
                </label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  rows={4}
                  placeholder="Tell us about your learning goals and what you hope to achieve..."
                  className="w-full px-4 py-3 glass-effect rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {paymentError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {paymentError}
                </div>
              )}

              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={!selectedCourse || !selectedBatch || isProcessingPayment}
                  className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Proceed to Payment</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-slate-500">
                  ⚠️ Payment is required to complete enrollment. Enrollment will only be confirmed after successful payment.
                </p>
              </div>
            </motion.form>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 space-y-6"
            >
              {selectedCourse && (
                <div className="glass-effect rounded-2xl p-6">
                  <h3 className="font-bold mb-4">Enrollment Summary</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-600 mb-1">Course</div>
                      <div className="font-semibold">{selectedCourse.title}</div>
                    </div>
                    {selectedBatch && (
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Batch</div>
                        <div className="font-semibold">{selectedBatch.name}</div>
                        <div className="text-sm text-slate-600 mt-1">
                          Starts: {new Date(selectedBatch.startDate).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-600">Total Amount</span>
                        <span className="text-2xl font-bold gradient-text">
                          {formatCurrency(selectedCourse.price)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Payment via Razorpay (Secure) - Required for Enrollment
                      </div>
                      <div className="text-xs text-red-600 mt-2 font-medium">
                        ⚠️ Enrollment will only be confirmed after successful payment
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="glass-effect rounded-2xl p-6">
                <h3 className="font-bold mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {[
                    'Lifetime course access',
                    'Live interactive sessions',
                    'Hands-on projects',
                    'Certificate of completion',
                    '24/7 student support',
                    'Community access',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
