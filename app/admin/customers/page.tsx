'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Users, Mail, DollarSign, Search, ArrowLeft, TrendingUp, Package } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function AdminCustomersPage() {
  const { user, allUsers, productPurchases, enrollments } = useStore()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'product-buyers' | 'course-enrolled'>('all')

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!user || user.role !== 'admin') {
    return null
  }

  // Get customer data
  const customers = allUsers
    .filter(u => u.role === 'student')
    .map(student => {
      const productBuys = productPurchases.filter(p => p.userId === student.id && p.paymentStatus === 'paid')
      const courseEnrollments = enrollments.filter(e => e.userId === student.id && e.paymentStatus === 'paid')
      
      const productRevenue = productBuys.reduce((sum, p) => {
        return sum + (p.amount || 0)
      }, 0)
      
      const courseRevenue = courseEnrollments.reduce((sum, e) => sum + e.amount, 0)
      const totalRevenue = productRevenue + courseRevenue
      const totalPurchases = productBuys.length + courseEnrollments.length
      
      return {
        ...student,
        productBuys: productBuys.length,
        courseEnrollments: courseEnrollments.length,
        productRevenue,
        courseRevenue,
        totalRevenue,
        totalPurchases,
        joinedAt: new Date(),
      }
    })

  // Filter customers
  let filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = 
      filterType === 'all' ? true :
      filterType === 'product-buyers' ? customer.productBuys > 0 :
      filterType === 'course-enrolled' ? customer.courseEnrollments > 0 :
      true
    
    return matchesSearch && matchesFilter
  })

  // Sort by total revenue
  filteredCustomers.sort((a, b) => b.totalRevenue - a.totalRevenue)

  // Calculate stats
  const totalCustomers = allUsers.filter(u => u.role === 'student').length
  const productBuyers = customers.filter(c => c.productBuys > 0).length
  const courseStudents = customers.filter(c => c.courseEnrollments > 0).length
  const totalCustomerRevenue = customers.reduce((sum, c) => sum + c.totalRevenue, 0)
  const avgCustomerValue = totalCustomers > 0 ? totalCustomerRevenue / totalCustomers : 0

  const stats = [
    { icon: Users, label: 'Total Customers', value: totalCustomers, color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: Package, label: 'Product Buyers', value: productBuyers, color: 'text-purple-600', bg: 'bg-purple-100' },
    { icon: TrendingUp, label: 'Course Students', value: courseStudents, color: 'text-green-600', bg: 'bg-green-100' },
    { icon: DollarSign, label: 'Avg Customer Value', value: formatCurrency(avgCustomerValue), color: 'text-orange-600', bg: 'bg-orange-100' },
  ]

  // Top customers
  const topCustomers = customers.slice(0, 5)

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-4 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Customer <span className="gradient-text">Management</span>
          </h1>
          <p className="text-xl text-slate-600">
            View and manage your customer relationships
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-6 border border-white/20 hover:border-white/40 transition"
              >
                <div className={`${stat.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <p className="text-slate-600 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl p-6 border border-white/20 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass-effect rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-3 glass-effect rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Customers</option>
              <option value="product-buyers">Product Buyers Only</option>
              <option value="course-enrolled">Course Students Only</option>
            </select>
          </div>
        </motion.div>

        {/* Customers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl border border-white/20 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Products Bought</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Courses Enrolled</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Total Revenue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Total Purchases</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{customer.name}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span className="text-sm">{customer.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          customer.productBuys > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {customer.productBuys}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          customer.courseEnrollments > 0 ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {customer.courseEnrollments}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">
                        {formatCurrency(customer.totalRevenue)}
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-semibold">
                        {customer.totalPurchases}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-600">
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Customers */}
        {topCustomers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 glass-effect rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Customers</h2>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{customer.name}</p>
                      <p className="text-sm text-slate-600">{customer.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{formatCurrency(customer.totalRevenue)}</p>
                    <p className="text-sm text-slate-600">{customer.totalPurchases} purchases</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
