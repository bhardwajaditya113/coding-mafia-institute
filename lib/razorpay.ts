// Razorpay integration utilities
// For production, use environment variables for keys

export interface RazorpayOptions {
  key: string
  amount: number // in paise (smallest currency unit)
  currency: string
  name: string
  description: string
  order_id?: string
  prefill: {
    name: string
    email: string
    contact: string
  }
  theme: {
    color: string
  }
  handler: (response: RazorpayResponse) => void
  modal: {
    ondismiss: () => void
  }
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// Initialize Razorpay payment
export const initiateRazorpayPayment = async (
  options: Omit<RazorpayOptions, 'key' | 'handler' | 'modal'>
): Promise<RazorpayResponse> => {
  // Ensure Razorpay script is loaded
  if (typeof window === 'undefined') {
    throw new Error('Razorpay can only be used in browser environment')
  }

  let Razorpay = (window as any).Razorpay

  if (!Razorpay) {
    const loaded = await loadRazorpayScript()
    if (!loaded) {
      throw new Error('Failed to load Razorpay script')
    }
    Razorpay = (window as any).Razorpay
    if (!Razorpay) {
      throw new Error('Razorpay not available after script load')
    }
  }

  // Get Razorpay key from environment variable
  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  if (!razorpayKey) {
    throw new Error('Razorpay key not configured. Please add NEXT_PUBLIC_RAZORPAY_KEY_ID to environment variables.')
  }

  return new Promise((resolve, reject) => {
    const razorpayOptions: RazorpayOptions = {
      ...options,
      key: razorpayKey,
      handler: (response: RazorpayResponse) => {
        // Verify response has required fields
        if (!response || !response.razorpay_payment_id) {
          reject(new Error('Invalid payment response: Missing payment ID'))
          return
        }
        resolve(response)
      },
      modal: {
        ondismiss: () => {
          reject(new Error('Payment cancelled by user'))
        },
      },
    }

    try {
      const razorpay = new Razorpay(razorpayOptions)
      razorpay.open()
    } catch (error: any) {
      reject(new Error(`Failed to open Razorpay checkout: ${error.message || 'Unknown error'}`))
    }
  })
}

// Verify payment signature (should be done on backend in production)
export const verifyPayment = async (
  paymentId: string,
  orderId: string,
  signature: string
): Promise<boolean> => {
  // In production, this should be done on your backend
  // For now, we'll do a basic check
  try {
    // In real implementation, call your backend API
    // const response = await fetch('/api/verify-payment', {
    //   method: 'POST',
    //   body: JSON.stringify({ paymentId, orderId, signature }),
    // })
    // return response.ok

    // For demo purposes, accept all payments
    return true
  } catch {
    return false
  }
}
