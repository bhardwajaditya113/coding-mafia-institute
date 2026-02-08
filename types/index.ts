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
