'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, Clock, Users, BookOpen, ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { courses, batches } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'
import useEmblaCarousel from 'embla-carousel-react'

export default function CourseCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
  })
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

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  // Get featured courses (first 9 courses)
  const featuredCourses = courses.slice(0, 9).map(course => {
    const courseBatches = batches.filter(b => 
      b.courseId === course.id && 
      b.status !== 'completed' && 
      b.enrolled < b.capacity
    )
    return { ...course, availableBatches: courseBatches }
  })

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full mb-6">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-primary-600">Featured Courses</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Explore Our <span className="gradient-text">Premium Courses</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Hand-picked courses designed to accelerate your career in 2026
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
            <div className="flex">
              {featuredCourses.map((course, index) => {
                const courseBatches = batches.filter(b => b.courseId === course.id)
                return (
                  <div
                    key={course.id}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="h-full glass-effect rounded-2xl overflow-hidden card-hover group"
                    >
                      {/* Course Header with Futuristic Gradient */}
                      <div className="relative h-48 bg-gradient-to-br from-primary-500 via-accent-500 to-purple-500 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl group-hover:scale-110 transition-transform">📚</span>
                        </div>
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-primary-600 shadow-lg">
                          {formatCurrency(course.price)}
                        </div>
                        <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700">
                          {course.level}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
                            {course.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{course.rating}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2 text-slate-800 line-clamp-2">{course.title}</h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                        <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{course.lessons} lessons</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{course.studentsCount.toLocaleString()}+</span>
                          </div>
                        </div>

                        {courseBatches.length > 0 && (
                          <div className="mb-4 p-3 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg border border-primary-100">
                            <div className="flex items-center space-x-2 mb-1">
                              <Calendar className="h-4 w-4 text-primary-600" />
                              <span className="text-sm font-semibold text-primary-700">
                                {courseBatches.length} Batch{courseBatches.length !== 1 ? 'es' : ''} Available
                              </span>
                            </div>
                            <div className="text-xs text-slate-600">
                              Next batch: {new Date(courseBatches[0].startDate).toLocaleDateString()}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/courses/${course.id}`}
                            className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all group"
                          >
                            <span>View Details</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                          {courseBatches.length > 0 && (
                            <Link
                              href={`/enroll?course=${course.id}`}
                              className="flex items-center justify-center space-x-2 w-full px-4 py-3 glass-effect rounded-lg font-medium hover:bg-slate-100 transition-colors text-center"
                            >
                              <span>Enroll Now</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-3 rounded-full glass-effect hover:bg-primary-600 hover:text-white transition-all shadow-lg hidden md:flex items-center justify-center"
            aria-label="Previous course"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-3 rounded-full glass-effect hover:bg-primary-600 hover:text-white transition-all shadow-lg hidden md:flex items-center justify-center"
            aria-label="Next course"
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/courses"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            <span>View All Courses</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
