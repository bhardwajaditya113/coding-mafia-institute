'use client'

import { products, productCategories } from '@/lib/data'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Star,
  ShoppingCart,
  Download,
  Check,
  Lock,
  FileText,
  Video,
  Github,
  ChevronRight,
  AlertCircle,
  Clock,
  User,
} from 'lucide-react'
import Link from 'next/link'

interface ProductDetailProps {
  params: { id: string }
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  const product = products.find((p) => p.id === params.id)
  const [selectedLicense, setSelectedLicense] = useState<'personal' | 'commercial' | 'agency'>('personal')
  const [isProcessing, setIsProcessing] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h1 className="text-2xl font-bold text-white">Product not found</h1>
          <Link href="/marketplace" className="mt-4 inline-block text-blue-400 hover:text-blue-300">
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    )
  }

  const category = productCategories.find((c) => c.id === product.category)
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0
  
  const licenseOptions = [
    {
      id: 'personal' as const,
      name: 'Personal License',
      description: 'For personal projects and learning',
      priceMultiplier: 1,
    },
    {
      id: 'commercial' as const,
      name: 'Commercial License',
      description: 'For commercial projects and businesses',
      priceMultiplier: 2.5,
    },
    {
      id: 'agency' as const,
      name: 'Agency License',
      description: 'Unlimited projects for agencies',
      priceMultiplier: 5,
    },
  ]

  const currentLicensePrice = Math.round(product.price * (licenseOptions.find((l) => l.id === selectedLicense)?.priceMultiplier || 1))

  const handlePurchase = async () => {
    try {
      setIsProcessing(true)
      
      // Create order on backend
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: currentLicensePrice * 100, // Convert to paise
          productId: product.id,
          productName: product.name,
          license: selectedLicense,
        }),
      })

      const orderData = await orderResponse.json()
      if (!orderData.success) throw new Error('Failed to create order')

      // Open Razorpay checkout
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: currentLicensePrice * 100,
          currency: 'INR',
          name: 'Infinity Loop',
          description: `${product.name} - ${selectedLicense} License`,
          order_id: orderData.orderId,
          prefill: {
            name: '',
            email: '',
            contact: '',
          },
          theme: {
            color: '#2563eb',
          },
          handler: async (response: any) => {
            // Verify payment
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                productId: product.id,
                license: selectedLicense,
              }),
            })

            const verifyData = await verifyResponse.json()
            if (verifyData.success) {
              window.location.href = '/payment/success?payment=' + response.razorpay_payment_id
            } else {
              window.location.href = '/payment/failure'
            }
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false)
            },
          },
        }

        const rzp = new (window as any).Razorpay(options)
        rzp.open()
      }
      document.body.appendChild(script)
    } catch (error) {
      console.error('Payment error:', error)
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
      {/* Breadcrumb */}
      <div className="bg-slate-950/50 border-b border-slate-800 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/marketplace" className="hover:text-blue-400">Marketplace</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left Column - Product Info */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-6xl">{product.icon}</span>
                    <div>
                      <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-300 text-sm font-bold">
                        {category?.name}
                      </span>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold text-white">{product.name}</h1>
                </div>
              </div>

              <p className="text-lg text-slate-300 mb-6">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-300">{product.rating} ({product.reviews} reviews)</span>
                <span className="text-slate-500">•</span>
                <div className="flex items-center gap-1 text-slate-400">
                  <Download className="w-4 h-4" />
                  {product.downloads.toLocaleString()} downloads
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Technology Stack</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {product.tech_stack.map((tech, idx) => (
                  <div key={idx} className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-200 text-sm flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Check className="w-6 h-6 text-green-400" />
                What's Included
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Complete Source Code</div>
                    <div className="text-sm text-slate-400 mt-1">Full, production-ready source code with all modules and components</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Video className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Video Tutorials</div>
                    <div className="text-sm text-slate-400 mt-1">Step-by-step video guides and documentation</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Comprehensive Docs</div>
                    <div className="text-sm text-slate-400 mt-1">Detailed API documentation and setup guides</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Lifetime Access</div>
                    <div className="text-sm text-slate-400 mt-1">One-time purchase, permanent access to all updates</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Professional Support</div>
                    <div className="text-sm text-slate-400 mt-1">Email support and community assistance</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Regular Updates</div>
                    <div className="text-sm text-slate-400 mt-1">Receive quarterly updates and improvements</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Purchase Card */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="sticky top-24 bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-xl p-8 backdrop-blur-sm">
              {/* Pricing */}
              <div className="mb-8">
                {discount > 0 && (
                  <div className="inline-block px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full text-red-300 text-sm font-bold mb-4">
                    {discount}% OFF - Limited Time
                  </div>
                )}

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">₹{currentLicensePrice.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-slate-400 line-through">₹{Math.round(product.originalPrice * (licenseOptions.find((l) => l.id === selectedLicense)?.priceMultiplier || 1)).toLocaleString()}</span>
                  )}
                </div>
                <p className="text-sm text-slate-400">One-time purchase • Lifetime access</p>
              </div>

              {/* License Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-white mb-4">Select License Type</label>
                <div className="space-y-3">
                  {licenseOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedLicense(option.id)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedLicense === option.id
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-slate-800/30 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-semibold">{option.name}</div>
                      <div className="text-sm opacity-75">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Warning */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-8 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-300">
                  Make sure to choose the correct license type for your use case.
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-500 disabled:to-slate-600 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
              >
                <ShoppingCart className="w-5 h-5" />
                {isProcessing ? 'Processing...' : 'Buy Now'}
              </button>

              <button className="w-full mt-3 py-2 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 font-semibold rounded-lg transition-all duration-300">
                Add to Wishlist
              </button>

              {/* Trust Badges */}
              <div className="mt-8 space-y-3 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Secure payment with Razorpay</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Instant download after purchase</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-20 pt-20 border-t border-slate-800">
          <h2 className="text-3xl font-bold text-white mb-8">You Might Also Like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {products
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/marketplace/${relatedProduct.id}`}
                  className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{relatedProduct.icon}</div>
                  <h3 className="font-bold text-white group-hover:text-blue-400 mb-2">{relatedProduct.name}</h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{relatedProduct.description}</p>
                  <div className="text-lg font-bold text-white">₹{relatedProduct.price.toLocaleString()}</div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
