export interface Course {
  id: string
  title: string
  description: string
  category: string
  instructor: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  price: number
  image: string
  rating: number
  studentsCount: number
  lessons: number
  tags: string[]
}

export interface Batch {
  id: string
  courseId: string
  name: string
  startDate: string
  endDate: string
  schedule: string
  capacity: number
  enrolled: number
  instructor: string
  status: 'upcoming' | 'ongoing' | 'completed'
}

export interface Enrollment {
  id: string
  studentId: string
  courseId: string
  batchId: string
  enrolledAt: string
  status: 'active' | 'completed' | 'cancelled'
  progress: number
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentId?: string
  amount: number
}

export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'admin' | 'instructor'
  avatar?: string
  enrolledCourses: string[] // Deprecated - use enrollments array instead
  phone?: string
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  courseCount: number
}

export interface Product {
  id: string
  name: string
  description: string
  resources: string
  category: string
  price: number
  originalPrice?: number
  image: string
  icon: string
  rating: number
  reviews: number
  downloads: number
  tags: string[]
  features: string[]
  tech_stack: string[]
  license: 'MIT' | 'Apache 2.0' | 'GPL' | 'Commercial' | 'Proprietary'
  deliveryFormat: 'source-code' | 'source-code-with-docs' | 'source-code-with-support'
  updateFrequency: string
  support: boolean
  documentation: boolean
  videoTutorials: boolean
  sourceCodeAccess: boolean
  lifetimeAccess: boolean
  competitors?: string
}

export interface ProductPurchase {
  id: string
  userId: string
  productId: string
  purchasedAt: string
  paymentId?: string
  amount: number
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  downloadUrl?: string
  expiresAt?: string
  license: 'personal' | 'commercial' | 'agency'
}

export interface Download {
  id: string
  productId: string
  userId: string
  downloadedAt: string
  ipAddress: string
  userAgent: string
}
