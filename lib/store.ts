import { create } from 'zustand'
import { User, Enrollment, ProductPurchase } from '@/types'

interface AppState {
  user: User | null
  enrollments: Enrollment[]
  productPurchases: ProductPurchase[]
  allUsers: User[] // Track all users for admin
  setUser: (user: User | null) => void
  addUser: (user: User) => void // Add new user to allUsers
  updateUser: (userId: string, updates: Partial<User>) => void
  deleteUser: (userId: string) => void
  addEnrollment: (enrollment: Enrollment) => void
  updateEnrollmentProgress: (enrollmentId: string, progress: number) => void
  updateEnrollmentPayment: (enrollmentId: string, paymentStatus: Enrollment['paymentStatus'], paymentId?: string) => void
  deleteEnrollment: (enrollmentId: string) => void
  addProductPurchase: (purchase: ProductPurchase) => void
  updateProductPurchasePayment: (purchaseId: string, paymentStatus: ProductPurchase['paymentStatus'], paymentId?: string) => void
  getAllUsers: () => User[]
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

const loadAllUsers = (): User[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('coding-mafia-all-users')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveAllUsers = (users: User[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('coding-mafia-all-users', JSON.stringify(users))
  } catch {
    // Ignore errors
  }
}

const loadProductPurchases = (): ProductPurchase[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('coding-mafia-product-purchases')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveProductPurchases = (purchases: ProductPurchase[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('coding-mafia-product-purchases', JSON.stringify(purchases))
  } catch {
    // Ignore errors
  }
}

export const useStore = create<AppState>((set, get) => ({
  user: loadUser(),
  enrollments: loadEnrollments(),
  productPurchases: loadProductPurchases(),
  allUsers: loadAllUsers(),
  setUser: (user) => {
    saveUser(user)
    set({ user })
    // Also add to allUsers if not already there
    if (user) {
      const allUsers = get().allUsers
      const exists = allUsers.find(u => u.id === user.id || u.email === user.email)
      if (!exists) {
        const newAllUsers = [...allUsers, user]
        saveAllUsers(newAllUsers)
        set({ allUsers: newAllUsers })
      } else {
        // Update existing user
        const updatedUsers = allUsers.map(u => 
          (u.id === user.id || u.email === user.email) ? user : u
        )
        saveAllUsers(updatedUsers)
        set({ allUsers: updatedUsers })
      }
    }
  },
  addUser: (user) => {
    const allUsers = get().allUsers
    const exists = allUsers.find(u => u.id === user.id || u.email === user.email)
    if (!exists) {
      const newAllUsers = [...allUsers, user]
      saveAllUsers(newAllUsers)
      set({ allUsers: newAllUsers })
    }
  },
  updateUser: (userId, updates) => {
    const allUsers = get().allUsers
    const updatedUsers = allUsers.map(u => 
      u.id === userId ? { ...u, ...updates } : u
    )
    saveAllUsers(updatedUsers)
    set({ allUsers: updatedUsers })
    // Also update current user if it's the same user
    const currentUser = get().user
    if (currentUser && currentUser.id === userId) {
      const updatedUser = { ...currentUser, ...updates }
      saveUser(updatedUser)
      set({ user: updatedUser })
    }
  },
  deleteUser: (userId) => {
    const allUsers = get().allUsers
    const updatedUsers = allUsers.filter(u => u.id !== userId)
    saveAllUsers(updatedUsers)
    set({ allUsers: updatedUsers })
    // Also delete all enrollments for this user
    const enrollments = get().enrollments
    const updatedEnrollments = enrollments.filter(e => e.studentId !== userId)
    saveEnrollments(updatedEnrollments)
    set({ enrollments: updatedEnrollments })
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
  deleteEnrollment: (enrollmentId) => {
    const updatedEnrollments = get().enrollments.filter(e => e.id !== enrollmentId)
    saveEnrollments(updatedEnrollments)
    set({ enrollments: updatedEnrollments })
  },
  addProductPurchase: (purchase) => {
    const newPurchases = [...get().productPurchases, purchase]
    saveProductPurchases(newPurchases)
    set({ productPurchases: newPurchases })
  },
  updateProductPurchasePayment: (purchaseId, paymentStatus, paymentId) => {
    const updatedPurchases = get().productPurchases.map((p) =>
      p.id === purchaseId ? { ...p, paymentStatus, paymentId } : p
    )
    saveProductPurchases(updatedPurchases)
    set({ productPurchases: updatedPurchases })
  },
  getAllUsers: () => {
    return get().allUsers
  },
  logout: () => {
    saveUser(null)
    // Don't clear enrollments or allUsers on logout
    set({ user: null })
  },
}))
