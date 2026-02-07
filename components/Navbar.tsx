'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, GraduationCap, User, BookOpen, LayoutDashboard, LogOut, Settings } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'

export default function Navbar() {
  const router = useRouter()
  const { user, setUser } = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleLogout = () => {
    setUser(null)
    setIsUserMenuOpen(false)
    router.push('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg group-hover:scale-110 transition-transform">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Coding Mafia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-700 hover:text-primary-600 transition-colors font-medium whitespace-nowrap">
              Home
            </Link>
            <Link href="/batches" className="text-slate-700 hover:text-primary-600 transition-colors font-medium whitespace-nowrap">
              Batches
            </Link>
            <Link href="/courses" className="text-slate-700 hover:text-primary-600 transition-colors font-medium whitespace-nowrap">
              Courses
            </Link>
            <Link href="/about" className="text-slate-700 hover:text-primary-600 transition-colors font-medium whitespace-nowrap">
              About
            </Link>
            <Link href="/contact" className="text-slate-700 hover:text-primary-600 transition-colors font-medium whitespace-nowrap">
              Contact
            </Link>
            
            {/* User Menu or Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <span className="text-slate-700 font-medium hidden sm:inline">{user.name}</span>
                </button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 glass-effect rounded-lg shadow-xl py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-slate-200">
                        <div className="font-semibold text-slate-800">{user.name}</div>
                        <div className="text-xs text-slate-600">{user.email}</div>
                        <div className="text-xs mt-1">
                          <span className={`px-2 py-1 rounded-full ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {user.role === 'admin' ? 'Admin' : 'Student'}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-100 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      {user.role === 'student' && (
                        <Link
                          href="/dashboard/courses"
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-100 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <BookOpen className="h-4 w-4" />
                          <span>My Courses</span>
                        </Link>
                      )}
                      {user.role === 'admin' && (
                        <>
                          <Link
                            href="/admin/batches"
                            className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-100 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <LayoutDashboard className="h-4 w-4" />
                            <span>Manage Batches</span>
                          </Link>
                          <Link
                            href="/admin/dashboard"
                            className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-100 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4" />
                            <span>Admin Panel</span>
                          </Link>
                        </>
                      )}
                      <div className="border-t border-slate-200 my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-100 transition-colors w-full text-left text-red-600"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-slate-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Link
              href="/enroll"
              className="px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
              Enroll Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect border-t border-slate-200"
          >
            <div className="px-4 py-4 space-y-3">
              <Link href="/" className="block py-2 text-slate-700 hover:text-primary-600 whitespace-nowrap">
                Home
              </Link>
              <Link href="/batches" className="block py-2 text-slate-700 hover:text-primary-600 whitespace-nowrap">
                Batches
              </Link>
              <Link href="/courses" className="block py-2 text-slate-700 hover:text-primary-600 whitespace-nowrap">
                Courses
              </Link>
              <Link href="/about" className="block py-2 text-slate-700 hover:text-primary-600 whitespace-nowrap">
                About
              </Link>
              <Link href="/contact" className="block py-2 text-slate-700 hover:text-primary-600 whitespace-nowrap">
                Contact
              </Link>
              <Link href="/dashboard" className="block py-2 text-slate-700 hover:text-primary-600">
                Dashboard
              </Link>
              <Link
                href="/enroll"
                className="block px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg text-center font-medium"
              >
                Enroll Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
