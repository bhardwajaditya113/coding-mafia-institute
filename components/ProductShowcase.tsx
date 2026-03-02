'use client'

import { products, productCategories } from '@/lib/data'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Download, ShoppingCart, TrendingUp } from 'lucide-react'

export default function ProductShowcase() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-semibold">Trending Source Code Marketplace</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Premium Source Code Products
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Get production-ready source code with full documentation, lifetime access, and professional support. 
            Launch your project faster with proven architectures.
          </p>
        </motion.div>

        {/* Featured Product */}
        <motion.div
          className="mb-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 border border-blue-500/30 overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml')] opacity-5" />
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-4">
                FEATURED DEAL
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">{products[0].name}</h3>
              <p className="text-blue-100 mb-6">{products[0].description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-blue-100">{products[0].reviews} reviews • {products[0].downloads.toLocaleString()} downloads</span>
              </div>

              <div className="flex items-end gap-3 mb-6">
                <div>
                  <div className="text-3xl font-bold text-white">₹{products[0].price.toLocaleString()}</div>
                  <div className="text-blue-200 line-through">₹{products[0].originalPrice?.toLocaleString()}</div>
                </div>
                <div className="text-amber-300 font-bold">50% OFF</div>
              </div>

              <Link
                href={`/marketplace/${products[0].id}`}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 group/btn"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>View & Purchase</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {products[0].features.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                  <div className="text-white font-semibold text-sm line-clamp-2">{feature}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {products.slice(1).map((product) => (
            <motion.div
              key={product.id}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header with icon */}
              <div className="p-6 pb-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-800 to-slate-800/50">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{product.icon}</span>
                  <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/50 rounded text-blue-300 text-xs font-bold">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(Math.floor(product.rating))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm text-slate-400">{product.rating} ({product.reviews})</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="bg-slate-700/30 p-2 rounded">
                    <div className="text-slate-400 text-xs">Downloads</div>
                    <div className="text-white font-bold">{(product.downloads / 1000).toFixed(1)}k</div>
                  </div>
                  <div className="bg-slate-700/30 p-2 rounded">
                    <div className="text-slate-400 text-xs">Tech Stack</div>
                    <div className="text-white font-bold">{product.tech_stack.length} techs</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4 flex flex-wrap gap-1">
                  {product.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-white">₹{product.price.toLocaleString()}</div>
                    {product.originalPrice && (
                      <div className="text-slate-400 line-through text-sm">₹{product.originalPrice.toLocaleString()}</div>
                    )}
                  </div>
                  <Link
                    href={`/marketplace/${product.id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-blue-600/30"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
          >
            Explore All Products
            <TrendingUp className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
