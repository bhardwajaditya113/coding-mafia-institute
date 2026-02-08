import { create } from 'zustand'
import { User, Enrollment } from '@/types'

interface AppState {
  user: User | null
  enrollments: Enrollment[]
  setUser: (user: User | null) => void
  addEnrollment: (enrollment: Enrollment) => void
  updateEnrollmentProgress: (enrollmentId: string, progress: number) => void
  updateEnrollmentPayment: (enrollmentId: string, paymentStatus: Enrollment['paymentStatus'], paymentId?: string) => void
  logout: () => void
}

// Simple localStorage persistence
const loadUser = (): User | null => {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem('coding-mafia-user')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

const saveUser = (user: User | null) => {
  if (typeof window === 'undefined') return
  try {
    if (user) {
      localStorage.setItem('coding-mafia-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('coding-mafia-user')
    }
  } catch {
    // Ignore errors
  }
}

const loadEnrollments = (): Enrollment[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('coding-mafia-enrollments')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveEnrollments = (enrollments: Enrollment[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('coding-mafia-enrollments', JSON.stringify(enrollments))
  } catch {
    // Ignore errors
  }
}

export const useStore = create<AppState>((set, get) => ({
  user: loadUser(),
  enrollments: loadEnrollments(),
  setUser: (user) => {
    saveUser(user)
    set({ user })
  },
  addEnrollment: (enrollment) => {
    const newEnrollments = [...get().enrollments, enrollment]
    saveEnrollments(newEnrollments)
    set({ enrollments: newEnrollments })
  },
  updateEnrollmentProgress: (enrollmentId, progress) => {
    const updatedEnrollments = get().enrollments.map((e) =>
      e.id === enrollmentId ? { ...e, progress } : e
    )
    saveEnrollments(updatedEnrollments)
    set({ enrollments: updatedEnrollments })
  },
  updateEnrollmentPayment: (enrollmentId, paymentStatus, paymentId) => {
    const updatedEnrollments = get().enrollments.map((e) =>
      e.id === enrollmentId ? { ...e, paymentStatus, paymentId } : e
    )
    saveEnrollments(updatedEnrollments)
    set({ enrollments: updatedEnrollments })
  },
  logout: () => {
    saveUser(null)
    saveEnrollments([])
    set({ user: null, enrollments: [] })
  },
}))
