'use client'

import { useEffect } from 'react'

interface AdSenseAdProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal'
  fullWidthResponsive?: boolean
  className?: string
  style?: React.CSSProperties
}

/**
 * Google AdSense Ad Component
 * 
 * Usage:
 * <AdSenseAd 
 *   adSlot="1234567890"
 *   adFormat="auto"
 *   fullWidthResponsive={true}
 * />
 * 
 * Place this component where you want ads to appear.
 * Remember to add your AdSense client ID to .env.local:
 * NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
 */
export default function AdSenseAd({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className = '',
  style = {}
}: AdSenseAdProps) {
  const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  useEffect(() => {
    if (ADSENSE_CLIENT_ID && typeof window !== 'undefined') {
      try {
        // Push ad to AdSense
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [ADSENSE_CLIENT_ID])

  // Don't render if no client ID is set
  if (!ADSENSE_CLIENT_ID) {
    return null
  }

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  )
}

/**
 * Pre-configured Ad Components for common placements
 */

// Banner ad for top of pages
export function BannerAd({ className = '' }: { className?: string }) {
  return (
    <AdSenseAd
      adSlot="1234567890" // Replace with your ad slot
      adFormat="horizontal"
      fullWidthResponsive={true}
      className={`my-8 ${className}`}
    />
  )
}

// Sidebar ad for desktop layouts
export function SidebarAd({ className = '' }: { className?: string }) {
  return (
    <AdSenseAd
      adSlot="0987654321" // Replace with your ad slot
      adFormat="vertical"
      fullWidthResponsive={false}
      className={`sticky top-24 ${className}`}
      style={{ width: '300px', height: '600px' }}
    />
  )
}

// In-article ad for blog/content pages
export function InArticleAd({ className = '' }: { className?: string }) {
  return (
    <AdSenseAd
      adSlot="1122334455" // Replace with your ad slot
      adFormat="fluid"
      fullWidthResponsive={true}
      className={`my-6 ${className}`}
    />
  )
}

// Square ad for course/product cards
export function SquareAd({ className = '' }: { className?: string }) {
  return (
    <AdSenseAd
      adSlot="5544332211" // Replace with your ad slot
      adFormat="rectangle"
      fullWidthResponsive={false}
      className={className}
      style={{ width: '300px', height: '250px' }}
    />
  )
}

/**
 * Responsive Ad Container
 * Automatically adjusts ad format based on screen size
 */
export function ResponsiveAd({ className = '' }: { className?: string }) {
  return (
    <div className={`responsive-ad-container ${className}`}>
      <div className="hidden lg:block">
        <BannerAd />
      </div>
      <div className="lg:hidden">
        <AdSenseAd
          adSlot="9988776655" // Replace with your ad slot
          adFormat="auto"
          fullWidthResponsive={true}
        />
      </div>
    </div>
  )
}
