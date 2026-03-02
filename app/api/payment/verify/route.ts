import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      productId,
      license,
      courseId,
      batchId,
    } = body

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Configuration missing' },
        { status: 500 }
      )
    }

    // Verify signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const digest = hmac.digest('hex')

    if (digest !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Payment verified successfully
    // TODO: Store purchase record in database
    // TODO: Generate download link
    // TODO: Send email with download details

    return NextResponse.json({
      success: true,
      message: 'Payment verified',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      productId,
      license,
      courseId,
      batchId,
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to verify payment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
