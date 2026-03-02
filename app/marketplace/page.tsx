'use client'

import { useState } from 'react'
import { products, productCategories } from '@/lib/data'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Filter, Search } from 'lucide-react'

export default function MarketplaceApp() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sticky top-16 z-40 max-w-7xl mx-auto mb-8 premium-panel p-5">
        <div className="px-1 py-1">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Infinity Loop Marketplace</p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Production-Ready Source Code Systems</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products, technologies, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="premium-panel p-6 sticky top-28">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-bold text-slate-900">Categories</h2>
              </div>

              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-all duration-300 ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                All Categories ({products.length})
              </button>

              <div className="space-y-2">
                {productCategories.map((category) => {
                  const categoryCount = products.filter((p) => p.category === category.id).length
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-start justify-between ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span>{category.icon}</span>
                        <div>
                          <div>{category.name}</div>
                          <div className="text-xs opacity-75">{categoryCount} product</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <div className="mb-6 text-sm text-slate-600">
                  Showing {filteredProducts.length} of {products.length} products
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="group premium-panel overflow-hidden hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="p-6 pb-4 border-b border-slate-200/70 bg-gradient-to-r from-white/70 to-blue-50/60">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-5xl">{product.icon}</span>
                          <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-blue-300 text-xs font-bold">
                            {productCategories.find((c) => c.id === product.category)?.name}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-500 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{product.description}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center">
                            {[...Array(Math.floor(product.rating))].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <span className="text-sm text-slate-500">{product.rating} ({product.reviews})</span>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                          <div className="text-xs text-slate-500 mb-2 font-semibold">KEY FEATURES</div>
                          <div className="flex flex-wrap gap-1">
                            {product.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md border border-slate-200">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-4 pb-4 border-b border-slate-200/80">
                          <div className="text-xs text-slate-500 mb-2 font-semibold">INCLUDES</div>
                          <div className="flex flex-wrap gap-1">
                            {product.tech_stack.slice(0, 4).map((tech, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-500/10 text-blue-300 text-xs rounded border border-blue-500/30">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-slate-900">₹{product.price.toLocaleString()}</div>
                            {product.originalPrice && (
                              <div className="text-slate-500 line-through text-sm">₹{product.originalPrice.toLocaleString()}</div>
                            )}
                          </div>
                          <Link
                            href={`/marketplace/${product.id}`}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 inline-flex items-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-600/30"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            <span className="hidden sm:inline">View</span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
