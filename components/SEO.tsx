import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function generateMetadata({
  title = 'Coding Mafia Institute - World-Class IT Training',
  description = 'Premier coding training institute offering comprehensive courses in Web Development, Data Science, DevOps, Cloud Computing, and more.',
  image = '/og-image.jpg',
  url = 'https://codingmafia.com',
}: SEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Coding Mafia Institute',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}
