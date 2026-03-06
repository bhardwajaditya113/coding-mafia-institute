// Analytics and Tracking Utilities
// Handles Google Analytics, Meta Pixel, LinkedIn, Pinterest tracking

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
    fbq?: (...args: any[]) => void
    _linkedin_partner_id?: string
    pintrk?: (...args: any[]) => void
  }
}

// Google Analytics 4 Event Tracking
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// E-commerce Events for Google Analytics
export const trackPurchase = (transactionData: {
  transaction_id: string
  value: number
  currency: string
  items: Array<{
    item_id: string
    item_name: string
    item_category: string
    price: number
    quantity: number
  }>
}) => {
  trackEvent('purchase', transactionData)
  
  // Also track on Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: transactionData.value,
      currency: transactionData.currency,
      content_ids: transactionData.items.map(item => item.item_id),
      content_type: 'product'
    })
  }
}

export const trackCourseEnrollment = (courseData: {
  course_id: string
  course_name: string
  batch_id: string
  price: number
}) => {
  trackEvent('course_enrollment', {
    course_id: courseData.course_id,
    course_name: courseData.course_name,
    batch_id: courseData.batch_id,
    value: courseData.price,
    currency: 'INR'
  })
  
  // Meta Pixel conversion
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Subscribe', {
      value: courseData.price,
      currency: 'INR',
      predicted_ltv: courseData.price * 3 // Estimate lifetime value
    })
  }
}

export const trackProductView = (productData: {
  item_id: string
  item_name: string
  price: number
  item_category: string
}) => {
  trackEvent('view_item', {
    items: [productData]
  })
  
  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_ids: [productData.item_id],
      content_type: 'product',
      value: productData.price,
      currency: 'INR'
    })
  }
}

export const trackAddToCart = (productData: {
  item_id: string
  item_name: string
  price: number
}) => {
  trackEvent('add_to_cart', {
    items: [productData]
  })
  
  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_ids: [productData.item_id],
      content_type: 'product',
      value: productData.price,
      currency: 'INR'
    })
  }
}

export const trackBeginCheckout = (checkoutData: {
  value: number
  items: Array<{
    item_id: string
    item_name: string
    price: number
  }>
}) => {
  trackEvent('begin_checkout', checkoutData)
  
  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: checkoutData.items.map(item => item.item_id),
      value: checkoutData.value,
      currency: 'INR'
    })
  }
}

// Lead Generation Tracking
export const trackLead = (leadData: {
  lead_type: 'contact_form' | 'email_signup' | 'course_interest'
  value?: number
}) => {
  trackEvent('generate_lead', leadData)
  
  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: leadData.lead_type,
      value: leadData.value || 0,
      currency: 'INR'
    })
  }
  
  // LinkedIn Conversion
  if (typeof window !== 'undefined' && (window as any).lintrk) {
    (window as any).lintrk('track', { conversion_id: process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID || '' })
  }
}

// Search Tracking
export const trackSearch = (searchTerm: string) => {
  trackEvent('search', {
    search_term: searchTerm
  })
  
  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Search', {
      search_string: searchTerm
    })
  }
}

// Page View Tracking (automatic with GA4, but useful for custom tracking)
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
      page_path: url,
      page_title: title
    })
  }
}

// Affiliate Link Click Tracking
export const trackAffiliateClick = (affiliateData: {
  program: string
  product: string
  url: string
}) => {
  trackEvent('affiliate_click', {
    affiliate_program: affiliateData.program,
    affiliate_product: affiliateData.product,
    outbound_url: affiliateData.url
  })
}

// Ad Click Tracking (for your own ad network)
export const trackAdClick = (adData: {
  ad_id: string
  advertiser: string
  placement: string
}) => {
  trackEvent('ad_click', {
    ad_id: adData.ad_id,
    advertiser: adData.advertiser,
    ad_placement: adData.placement
  })
}

// Subscription Tracking
export const trackSubscription = (subscriptionData: {
  plan: string
  value: number
  recurring: boolean
}) => {
  trackEvent('subscription_start', subscriptionData)
  
  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'StartTrial', {
      value: subscriptionData.value,
      currency: 'INR',
      predicted_ltv: subscriptionData.value * 12 // Annual value
    })
  }
}

// Video Engagement (for embedded YouTube videos)
export const trackVideoEngagement = (videoData: {
  video_id: string
  video_title: string
  engagement_type: 'start' | 'progress' | 'complete'
  progress?: number
}) => {
  trackEvent('video_engagement', videoData)
}

// Outbound Link Tracking
export const trackOutboundLink = (url: string, linkText: string) => {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: url,
    link_text: linkText
  })
}
