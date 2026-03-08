import Link from 'next/link'
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(168,85,247,0.2),transparent_45%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative z-10 mb-8 premium-panel p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500 uppercase tracking-[0.2em] mb-1">Infinity Loop</p>
            <h3 className="text-2xl font-bold text-slate-900">Source Code Marketplace + Skill Academy</h3>
            <p className="text-slate-600 text-sm mt-1">Buy, launch, learn, and scale with one unified platform.</p>
          </div>
          <Link href="/marketplace" className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold hover:shadow-xl transition-all">
            Explore Marketplace
          </Link>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Infinity Loop</span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">by Coding Mafia</p>
              </div>
            </Link>
            <p className="text-slate-400">
              Premium source code products and world-class tech courses crafted for founders, developers, agencies, and job seekers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-primary-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-primary-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-primary-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-primary-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-primary-400 transition-colors">Marketplace</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary-400 transition-colors">Courses</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors">Contact</Link>
              </li>
              <li>
                <Link href="/enroll" className="hover:text-primary-400 transition-colors">Enroll Now</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-400 transition-colors">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-primary-400 transition-colors">Disclaimer</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses?category=web-dev" className="hover:text-primary-400 transition-colors">Web Development</Link>
              </li>
              <li>
                <Link href="/courses?category=data-science" className="hover:text-primary-400 transition-colors">Data Science</Link>
              </li>
              <li>
                <Link href="/courses?category=devops" className="hover:text-primary-400 transition-colors">DevOps</Link>
              </li>
              <li>
                <Link href="/courses?category=cloud" className="hover:text-primary-400 transition-colors">Cloud Computing</Link>
              </li>
              <li>
                <Link href="/courses?category=mobile" className="hover:text-primary-400 transition-colors">Mobile Development</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary-400 mt-0.5" />
                <a href="mailto:bhardwajaditya113@gmail.com" className="hover:text-primary-400 transition-colors">
                  bhardwajaditya113@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary-400 mt-0.5" />
                <a href="tel:+917727050461" className="hover:text-primary-400 transition-colors">
                  +91-7727050461
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5" />
                <span>RWA Gali No. 8, D-9, Shiv Ram Park, Nangloi, New Delhi - 110041</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Coding Mafia Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
