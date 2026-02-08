'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, BookOpen, ArrowRight, Download, Home } from 'lucide-react'
import { useStore } from '@/lib/store'
import { courses, batches } from '@/lib/data'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { enrollments } = useStore()
  const enrollmentId = searchParams.get('enrollment')
  const paymentId = searchParams.get('payment')

  const [enrollment, setEnrollment] = useState<any>(null)

  useEffect(() => {
    if (enrollmentId) {
      const found = enrollments.find(e => e.id === enrollmentId)
      if (found) {
        setEnrollment(found)
      } else {
        // If not found, redirect to dashboard
        setTimeout(() => router.push('/dashboard'), 2000)
      }
    }
  }, [enrollmentId, enrollments, router])

  if (!enrollment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading enrollment details...</p>
        </div>
      </div>
    )
  }

  const course = courses.find(c => c.id === enrollment.courseId)
  const batch = batches.find(b => b.id === enrollment.batchId)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-3xl p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-12 w-12 text-green-600" />
          </motion.div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Your enrollment has been confirmed
          </p>

          {/* Enrollment Details */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left">
            <h2 className="font-bold text-lg mb-4">Enrollment Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Course:</span>
                <span className="font-semibold">{course?.title}</span>
              </div>
              {batch && (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Batch:</span>
                    <span className="font-semibold">{batch.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Start Date:</span>
                    <span className="font-semibold">{formatDate(batch.startDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Schedule:</span>
                    <span className="font-semibold">{batch.schedule}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between pt-3 border-t border-slate-200">
                <span className="text-slate-600">Amount Paid:</span>
                <span className="font-bold text-lg gradient-text">
                  {formatCurrency(enrollment.amount)}
                </span>
              </div>
              {paymentId && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Payment ID:</span>
                  <span className="text-slate-500 font-mono">{paymentId.slice(0, 20)}...</span>
                </div>
              )}
            </div>
          </div>

          {/* Enrollment Confirmation */}
          <div className="bg-primary-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold mb-3 text-lg">You're Successfully Enrolled! 🎓</h3>
            <div className="space-y-3 text-sm text-slate-700">
              <p className="font-medium">
                Our sales team will get in touch with you when the batch starts.
              </p>
              <p>
                If you have any questions or need assistance, please feel free to contact us through our{' '}
                <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium underline">
                  Contact Us
                </Link>{' '}
                page.
              </p>
              <div className="bg-white rounded-lg p-4 mt-4 border border-primary-200">
                <p className="font-semibold text-primary-700 mb-2">📅 Meeting Link</p>
                <p className="text-slate-600">
                  We will share the meeting link with you once the batch starts. You'll receive it via email and it will also be available in your dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center space-x-2"
            >
              <BookOpen className="h-5 w-5" />
              <span>Go to Dashboard</span>
            </Link>
            <Link
              href="/"
              className="flex-1 px-6 py-3 glass-effect rounded-xl font-semibold hover:bg-slate-100 transition-all flex items-center justify-center space-x-2"
            >
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
