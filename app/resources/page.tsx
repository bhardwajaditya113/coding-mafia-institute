'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Star, TrendingUp, Award, Zap, Shield, Code, Cloud, BookOpen, Palette } from 'lucide-react'
import { trackAffiliateClick } from '@/lib/analytics'

interface Resource {
  name: string
  category: string
  description: string
  features: string[]
  pricing: string
  commission: string
  affiliateUrl: string
  icon: React.ReactNode
  recommended?: boolean
}

const resources: Resource[] = [
  // Web Hosting
  {
    name: 'Hostinger',
    category: 'Web Hosting',
    description: 'Premium web hosting with excellent performance and support. Perfect for deploying your projects.',
    features: ['99.9% Uptime', 'Free SSL Certificate', 'WordPress Optimized', '24/7 Support'],
    pricing: 'Starting at ₹149/month',
    commission: '$60-150 per sale',
    affiliateUrl: 'https://hostinger.in?ref=codingmafia', // Replace with your actual affiliate link
    icon: <Cloud className="w-6 h-6" />,
    recommended: true
  },
  {
    name: 'DigitalOcean',
    category: 'Cloud Hosting',
    description: 'Developer-friendly cloud infrastructure. Ideal for scalable applications and APIs.',
    features: ['SSD Storage', 'Global Data Centers', 'API Access', 'Kubernetes Support'],
    pricing: 'Starting at $4/month',
    commission: '$25-100 per signup',
    affiliateUrl: 'https://www.digitalocean.com/?refcode=codingmafia', // Replace with your actual affiliate link
    icon: <Cloud className="w-6 h-6" />,
    recommended: true
  },
  {
    name: 'Cloudways',
    category: 'Managed Cloud Hosting',
    description: 'Managed cloud hosting platform. Simplifies AWS, GCP, and DigitalOcean deployments.',
    features: ['Managed Services', 'Auto Scaling', 'Free SSL', 'Built-in CDN'],
    pricing: 'Starting at $11/month',
    commission: '$50-125 per sale',
    affiliateUrl: 'https://www.cloudways.com/en/?id=codingmafia', // Replace with your actual affiliate link
    icon: <Cloud className="w-6 h-6" />
  },

  // Learning Platforms
  {
    name: 'Udemy',
    category: 'Online Courses',
    description: 'World\'s largest course marketplace. Complement your learning with specialized courses.',
    features: ['130,000+ Courses', 'Lifetime Access', 'Certificate of Completion', 'Mobile App'],
    pricing: 'Courses from ₹399',
    commission: '15-50% per sale',
    affiliateUrl: 'https://www.udemy.com/?ref=codingmafia', // Replace with your actual affiliate link
    icon: <BookOpen className="w-6 h-6" />
  },
  {
    name: 'Coursera',
    category: 'Professional Certificates',
    description: 'University-level courses and professional certificates from top institutions.',
    features: ['University Courses', 'Professional Certificates', 'Specializations', 'Degree Programs'],
    pricing: 'Starting at ₹2,999/month',
    commission: '$15-45 per enrollment',
    affiliateUrl: 'https://www.coursera.org/?ref=codingmafia', // Replace with your actual affiliate link
    icon: <Award className="w-6 h-6" />
  },

  // Design & Productivity Tools
  {
    name: 'Canva Pro',
    category: 'Design Tool',
    description: 'Professional design tool for creating stunning graphics, presentations, and social media content.',
    features: ['100M+ Images', 'Brand Kit', 'Background Remover', 'Team Collaboration'],
    pricing: '₹3,999/year',
    commission: '$36 per sale',
    affiliateUrl: 'https://www.canva.com/join/codingmafia', // Replace with your actual affiliate link
    icon: <Palette className="w-6 h-6" />
  },
  {
    name: 'Grammarly',
    category: 'Writing Assistant',
    description: 'AI-powered writing assistant for error-free documentation, emails, and content.',
    features: ['Grammar Checking', 'Plagiarism Detection', 'Tone Suggestions', 'Browser Extension'],
    pricing: 'Free - ₹999/month',
    commission: '$20-200 per sale',
    affiliateUrl: 'https://www.grammarly.com/?ref=codingmafia', // Replace with your actual affiliate link
    icon: <BookOpen className="w-6 h-6" />
  },

  // Development Tools & Assets
  {
    name: 'Envato Elements',
    category: 'Digital Assets',
    description: 'Unlimited downloads of themes, templates, graphics, and more for your projects.',
    features: ['Unlimited Downloads', 'Commercial License', '60M+ Assets', 'WordPress Themes'],
    pricing: '$16.50/month',
    commission: '30% recurring',
    affiliateUrl: 'https://elements.envato.com/?ref=codingmafia', // Replace with your actual affiliate link
    icon: <Code className="w-6 h-6" />,
    recommended: true
  }
]

const categories = Array.from(new Set(resources.map(r => r.category)))

export default function ResourcesPage() {
  const handleAffiliateClick = (resource: Resource) => {
    trackAffiliateClick({
      program: resource.name,
      product: resource.category,
      url: resource.affiliateUrl
    })
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-primary-100 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary-600">RECOMMENDED TOOLS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Developer Resources We Use & Recommend
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Handpicked tools and services that we actually use to build and deploy projects. 
            Affiliate links support our free content.
          </p>
        </motion.div>

        {/* Resources Grid */}
        <div className="space-y-6">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="h-1 w-12 bg-primary-500 rounded-full" />
                {category}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {resources
                  .filter(r => r.category === category)
                  .map((resource, index) => (
                    <motion.div
                      key={resource.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: catIndex * 0.1 + index * 0.05 }}
                      className={`premium-panel p-6 hover:scale-[1.02] transition-transform duration-300 ${
                        resource.recommended ? 'ring-2 ring-primary-400' : ''
                      }`}
                    >
                      {resource.recommended && (
                        <div className="absolute -top-3 -right-3 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          BEST VALUE
                        </div>
                      )}

                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-primary-100 rounded-xl text-primary-600">
                          {resource.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 mb-1">
                            {resource.name}
                          </h3>
                          <p className="text-sm text-slate-600">{resource.pricing}</p>
                        </div>
                      </div>

                      <p className="text-slate-700 mb-4">{resource.description}</p>

                      <div className="space-y-2 mb-4">
                        {resource.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                            <Zap className="w-4 h-4 text-primary-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <div className="text-xs text-slate-500">
                          <TrendingUp className="w-3 h-3 inline mr-1" />
                          Earn: {resource.commission}
                        </div>
                        <a
                          href={resource.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          onClick={() => handleAffiliateClick(resource)}
                          className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
                        >
                          Try {resource.name}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Affiliate Disclosure */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-6 bg-slate-50 rounded-2xl border border-slate-200"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-slate-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Affiliate Disclosure</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                This page contains affiliate links. When you purchase through these links, we may earn a commission 
                at no additional cost to you. We only recommend tools and services that we genuinely use and trust. 
                Your support helps us create free educational content and maintain this platform. Thank you for your support! 🙏
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center premium-panel p-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Want to List Your Product?
          </h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            We're always looking for quality tools to recommend to our developer community. 
            If you have a product that would benefit our students, let's talk!
          </p>
          <a
            href="/contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Contact Us for Partnership
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  )
}
