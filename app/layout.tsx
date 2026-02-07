import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import ToastContainer from '@/components/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Coding Mafia Institute - World-Class IT Training',
  description: 'Premier coding training institute offering comprehensive courses in Web Development, Data Science, DevOps, Cloud Computing, and more. Enroll now for expert-led batches.',
  keywords: 'coding bootcamp, programming courses, IT training, software development, data science, devops',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
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
