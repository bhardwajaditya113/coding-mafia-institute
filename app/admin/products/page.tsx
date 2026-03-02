'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { products, productCategories } from '@/lib/data'
import { Package, DollarSign, Search, ArrowLeft, Eye, BarChart3, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function AdminProductsPage() {
  const { user, productPurchases } = useStore()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!user || user.role !== 'admin') {
    return null
  }

  // Get sales data for each product
  const productsWithData = products.map(product => {
    const productSales = productPurchases.filter(p => p.productId === product.id && p.paymentStatus === 'paid')
    const sold = productSales.length
    const revenue = productSales.reduce((sum, p) => {
      // Get the license multiplier
      const multiplier = p.license === 'commercial' ? 2.5 : p.license === 'agency' ? 5 : 1
      return sum + (product.price * multiplier)
    }, 0)
    
    return {
      ...product,
      sold,
      revenue,
      licenses: productSales.reduce((acc, p) => {
        acc[p.license] = (acc[p.license] || 0) + 1
        return acc
      }, {} as Record<string, number>),
    }
  })

  // Filter products
  let filteredProducts = productsWithData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sort by sales
  filteredProducts.sort((a, b) => b.sold - a.sold)

  // Calculate stats
  const totalProducts = products.length
  const totalSales = productPurchases.filter(p => p.paymentStatus === 'paid').length
  const totalRevenue = productsWithData.reduce((sum, p) => sum + p.revenue, 0)
  const avgRevenuePerProduct = totalProducts > 0 ? totalRevenue / totalProducts : 0

  const stats = [
    { icon: Package, label: 'Total Products', value: totalProducts, color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: TrendingUp, label: 'Total Sales', value: totalSales, color: 'text-purple-600', bg: 'bg-purple-100' },
    { icon: DollarSign, label: 'Total Revenue', value: formatCurrency(totalRevenue), color: 'text-green-600', bg: 'bg-green-100' },
    { icon: BarChart3, label: 'Avg Revenue/Product', value: formatCurrency(avgRevenuePerProduct), color: 'text-orange-600', bg: 'bg-orange-100' },
  ]

  const categories = ['all', ...productCategories.map(c => c.id)]

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
            Product <span className="gradient-text">Management</span>
          </h1>
          <p className="text-xl text-slate-600">
            Monitor and manage your source code products
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
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass-effect rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 glass-effect rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.replace('-', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Products Table */}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Price (Personal)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Sales</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Revenue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Licenses</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">{product.name}</p>
                          <p className="text-sm text-slate-600">{product.category}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {product.sold} sales
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-green-600">
                        {formatCurrency(product.revenue)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="space-y-1">
                          <p>Personal: {product.licenses.personal || 0}</p>
                          <p>Commercial: {product.licenses.commercial || 0}</p>
                          <p>Agency: {product.licenses.agency || 0}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm font-semibold">View</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-600">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
