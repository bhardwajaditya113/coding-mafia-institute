import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, courseId, batchId, productId, productName, license } = body

    // Receipt must be max 40 characters (Razorpay requirement)
    const timestamp = Math.random().toString(36).substr(2, 9)
    const receipt = productId 
      ? `p_${productId}_${timestamp}`
      : `c_${courseId}_${timestamp}`

    const notes: Record<string, string | number> = productId
      ? {
          type: 'product_purchase',
          productId: productId as string,
          productName: productName as string,
          license: license as string,
        }
      : {
          type: 'course_enrollment',
          courseId: courseId as string,
          batchId: batchId as string,
        }

    // Use Razorpay if keys are configured, otherwise use mock for development
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      })

      const order = await razorpay.orders.create({
        amount: amount, // Already in paise
        currency: 'INR',
        receipt,
        notes,
      })

      return NextResponse.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      })
    } else {
      // Mock mode for development/testing
      const mockOrderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      console.log('📝 Mock Order Created (Development Mode)')
      console.log('Order ID:', mockOrderId)
      console.log('Amount:', amount / 100, 'INR')
      console.log('Product:', productId || courseId)
      console.log('License:', license || 'N/A')

      return NextResponse.json({
        success: true,
        orderId: mockOrderId,
        amount: amount,
        currency: 'INR',
        isDevelopment: true,
        message: 'Development mode - Use test card 4111 1111 1111 1111'
      })
    }
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create order',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
