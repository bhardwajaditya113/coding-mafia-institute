'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'

export default function PaymentFailurePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-3xl p-8 md:p-12 text-center"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <XCircle className="h-12 w-12 text-red-600" />
          </motion.div>

          {/* Error Message */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Payment Failed
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            We couldn't process your payment. Please try again.
          </p>

          {/* Help Text */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold mb-3">What to do next?</h3>
            <ul className="text-left space-y-2 text-sm text-slate-700">
              <li>• Check your payment method and try again</li>
              <li>• Ensure you have sufficient balance</li>
              <li>• Contact your bank if the issue persists</li>
              <li>• Reach out to support if you need assistance</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/enroll"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Try Again</span>
            </Link>
            <Link
              href="/courses"
              className="flex-1 px-6 py-3 glass-effect rounded-xl font-semibold hover:bg-slate-100 transition-all flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Courses</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
