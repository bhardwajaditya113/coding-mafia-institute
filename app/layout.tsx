import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ToastContainer from '@/components/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Infinity Loop by Coding Mafia — Premium Source Code + Career Courses',
  description: 'Buy production-ready source code and enroll in expert-led IT courses. Infinity Loop combines instant digital products with job-focused learning paths for Indian and global builders.',
  keywords: 'source code marketplace, coding courses, nextjs templates, razorpay checkout, indian edtech, digital products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 noise-overlay" />
          <div className="absolute -top-44 left-1/3 h-96 w-96 rounded-full bg-primary-500/20 blur-[120px]" />
          <div className="absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-[120px]" />
          <div className="absolute -bottom-28 right-0 h-[28rem] w-[28rem] rounded-full bg-purple-500/20 blur-[140px]" />
        </div>
        <Navbar />
        <main className="min-h-screen overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <ToastContainer />
      </body>
    </html>
  )
}
