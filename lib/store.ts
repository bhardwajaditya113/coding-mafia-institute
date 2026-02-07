import { create } from 'zustand'
import { User, Enrollment } from '@/types'

interface AppState {
  user: User | null
  enrollments: Enrollment[]
  setUser: (user: User | null) => void
  addEnrollment: (enrollment: Enrollment) => void
  updateEnrollmentProgress: (enrollmentId: string, progress: number) => void
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

export const useStore = create<AppState>((set) => ({
  user: loadUser(),
  enrollments: [],
  setUser: (user) => {
    saveUser(user)
    set({ user })
  },
  addEnrollment: (enrollment) =>
    set((state) => ({
      enrollments: [...state.enrollments, enrollment],
    })),
  updateEnrollmentProgress: (enrollmentId, progress) =>
    set((state) => ({
      enrollments: state.enrollments.map((e) =>
        e.id === enrollmentId ? { ...e, progress } : e
      ),
    })),
  logout: () => {
    saveUser(null)
    set({ user: null, enrollments: [] })
  },
}))
