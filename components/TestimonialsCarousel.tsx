'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Software Engineer at Google',
    image: '/api/placeholder/80/80',
    rating: 5,
    text: 'Coding Mafia transformed my career. The Next.js Full Stack course gave me the skills I needed to land my dream job at Google. The hands-on projects and expert guidance were invaluable.',
    course: 'Next.js 15 Full Stack Development',
    company: 'Google',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Data Scientist at Microsoft',
    image: '/api/placeholder/80/80',
    rating: 5,
    text: 'The AI & Machine Learning course is exceptional. Aditya Bhardwaj is an amazing instructor. The projects are industry-relevant and helped me transition into data science.',
    course: 'AI & Machine Learning with Python',
    company: 'Microsoft',
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'DevOps Engineer at Amazon',
    image: '/api/placeholder/80/80',
    rating: 5,
    text: 'Best investment in my career! The Docker & Kubernetes course helped me become a certified DevOps engineer. The practical approach and real-world scenarios were perfect.',
    course: 'Docker & Kubernetes Mastery',
    company: 'Amazon',
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    role: 'Cloud Architect at TCS',
    image: '/api/placeholder/80/80',
    rating: 5,
    text: 'The AWS Solutions Architect course exceeded my expectations. I got certified and landed a high-paying role. The batch structure and live sessions were incredibly helpful.',
    course: 'AWS Cloud Solutions Architect',
    company: 'TCS',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    role: 'Full Stack Developer at Infosys',
    image: '/api/placeholder/80/80',
    rating: 5,
    text: 'The MERN Stack course is comprehensive and well-structured. I learned everything from basics to advanced concepts. The instructor explains complex topics in a simple way.',
    course: 'MERN Stack Development',
    company: 'Infosys',
  },
  {
    id: 6,
    name: 'Anjali Mehta',
    role: 'React Developer at Wipro',
    image: '/api/placeholder/80/80',
    rating: 5,
    text: 'Advanced React course is outstanding! The hooks, performance optimization, and state management concepts are explained brilliantly. Highly recommended!',
    course: 'Advanced React Development',
    company: 'Wipro',
  },
]

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    // Auto-play
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)

    return () => {
      emblaApi.off('select', onSelect)
      clearInterval(interval)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-accent-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full mb-6">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-primary-600">4.9/5 Average Rating</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join thousands of successful professionals who transformed their careers with us
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="h-full glass-effect rounded-2xl p-8 card-hover relative overflow-hidden group"
                  >
                    {/* Futuristic gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-accent-500/0 to-purple-500/0 group-hover:from-primary-500/5 group-hover:via-accent-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
                    
                    <Quote className="absolute top-6 right-6 h-12 w-12 text-primary-200 group-hover:text-primary-300 transition-colors" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      
                      <p className="text-slate-700 mb-6 leading-relaxed text-lg">
                        "{testimonial.text}"
                      </p>
                      
                      <div className="flex items-center space-x-4 pt-4 border-t border-slate-200">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold text-lg">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-slate-800 text-lg">{testimonial.name}</div>
                          <div className="text-sm text-slate-600">{testimonial.role}</div>
                          <div className="text-xs text-primary-600 mt-1 font-medium">{testimonial.course}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-3 rounded-full glass-effect hover:bg-primary-600 hover:text-white transition-all shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-3 rounded-full glass-effect hover:bg-primary-600 hover:text-white transition-all shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? 'w-8 bg-gradient-to-r from-primary-600 to-accent-600'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
