import { NextRequest, NextResponse } from 'next/server'

// This is a mock API route
// In production, you should:
// 1. Create order on Razorpay server
// 2. Store order details in database
// 3. Return order ID to client

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, courseId, batchId } = body

    // In production, create order on Razorpay:
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID!,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET!,
    // })
    // const order = await razorpay.orders.create({
    //   amount: amount * 100, // Convert to paise
    //   currency: 'INR',
    //   receipt: `order_${Date.now()}`,
    // })

    // For demo, return mock order
    const mockOrder = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * 100, // in paise
      currency: 'INR',
      status: 'created',
    }

    return NextResponse.json({ order: mockOrder })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
