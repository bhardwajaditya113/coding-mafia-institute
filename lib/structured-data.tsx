// SEO Structured Data (JSON-LD) for better search engine visibility
// Use these in your page components to enhance SEO

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Coding Mafia',
  alternateName: 'Infinity Loop',
  url: 'https://infinityloop.in',
  logo: 'https://infinityloop.in/logo.png',
  description: 'Premium coding education platform offering source code products and expert-led IT courses for developers worldwide.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@infinityloop.in'
  },
  sameAs: [
    'https://www.facebook.com/bhardwajaditya113/',
    'https://www.instagram.com/bhardwajaditya113/',
    'https://www.linkedin.com/in/aditya-bhardwaj-57a15b119/',
    'https://www.youtube.com/@bhardwajaditya113'
  ]
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Coding Mafia - Infinity Loop',
  url: 'https://infinityloop.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://infinityloop.in/courses?search={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
}

export function generateCourseSchema(course: {
  id: string
  title: string
  description: string
  price: number
  duration: string
  instructor: string
  rating?: number
  reviewCount?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'Coding Mafia',
      sameAs: 'https://infinityloop.in'
    },
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://infinityloop.in/courses/${course.id}`
    },
    educationalLevel: 'Professional',
    timeRequired: course.duration,
    instructor: {
      '@type': 'Person',
      name: course.instructor
    },
    ...(course.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: course.rating,
        reviewCount: course.reviewCount || 0
      }
    })
  }
}

export function generateProductSchema(product: {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  rating?: number
  reviewCount?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: product.name,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://infinityloop.in/marketplace/${product.id}`,
      seller: {
        '@type': 'Organization',
        name: 'Coding Mafia'
      }
    },
    category: product.category,
    ...(product.image && { image: product.image }),
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 0
      }
    })
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Coding Mafia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://infinityloop.in/logo.png'
      }
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    ...(article.image && { image: article.image }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  }
}

export function generateVideoSchema(video: {
  title: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration: string // ISO 8601 duration (e.g., "PT15M33S" for 15:33)
  contentUrl: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.contentUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Coding Mafia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://infinityloop.in/logo.png'
      }
    }
  }
}

// Helper component to inject structured data into page
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      suppressHydrationWarning
    />
  )
}

// Example usage in a page component:
/*
import { StructuredData, organizationSchema, generateCourseSchema } from '@/lib/structured-data'

export default function CoursePage({ course }) {
  const courseSchema = generateCourseSchema(course)
  
  return (
    <>
      <head>
        <StructuredData data={organizationSchema} />
        <StructuredData data={courseSchema} />
      </head>
      <div>Your page content...</div>
    </>
  )
}
*/
