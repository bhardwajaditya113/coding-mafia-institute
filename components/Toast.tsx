'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

let toastId = 0
const toasts: Toast[] = []
const listeners: Array<(toasts: Toast[]) => void> = []

export function addToast(message: string, type: ToastType = 'info') {
  const id = (toastId++).toString()
  toasts.push({ id, message, type })
  listeners.forEach((listener) => listener([...toasts]))
  
  setTimeout(() => {
    removeToast(id)
  }, 5000)
}

export function removeToast(id: string) {
  const index = toasts.findIndex((t) => t.id === id)
  if (index > -1) {
    toasts.splice(index, 1)
    listeners.forEach((listener) => listener([...toasts]))
  }
}

export default function ToastContainer() {
  const [toastList, setToastList] = useState<Toast[]>([])

  useEffect(() => {
    listeners.push(setToastList)
    return () => {
      const index = listeners.indexOf(setToastList)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBgColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
    }
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toastList.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`glass-effect rounded-lg p-4 border-2 ${getBgColor(toast.type)} min-w-[300px] max-w-md shadow-lg`}
          >
            <div className="flex items-start space-x-3">
              {getIcon(toast.type)}
              <p className="flex-1 text-sm font-medium text-slate-800">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
