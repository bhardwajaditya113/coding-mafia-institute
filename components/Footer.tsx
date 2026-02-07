import Link from 'next/link'
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Coding Mafia</span>
            </Link>
            <p className="text-slate-400">
              World-class coding training institute for IT professionals. Transform your career with expert-led courses.
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
