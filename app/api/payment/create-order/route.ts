import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  if (error && typeof error === 'object') {
    const err = error as { error?: { description?: string }; description?: string }
    return err.error?.description || err.description || JSON.stringify(error)
  }
  return 'Unknown error'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, courseId, batchId, productId, productName, license } = body

    const parsedAmount = Number(amount)
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      )
    }

    const isProductPurchase = Boolean(productId)
    const isCoursePurchase = Boolean(courseId && batchId)

    if (!isProductPurchase && !isCoursePurchase) {
      return NextResponse.json(
        { success: false, error: 'Provide either productId or courseId+batchId' },
        { status: 400 }
      )
    }

    if (isProductPurchase && !license) {
      return NextResponse.json(
        { success: false, error: 'License is required for product purchases' },
        { status: 400 }
      )
    }

    // Receipt must be max 40 characters (Razorpay requirement)
    const receiptSeed = isProductPurchase
      ? String(productId)
      : `${String(courseId)}_${String(batchId)}`
    const sanitizedSeed = receiptSeed.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 20)
    const shortTimestamp = Date.now().toString().slice(-10)
    const receipt = `${isProductPurchase ? 'p' : 'c'}_${sanitizedSeed}_${shortTimestamp}`.slice(0, 40)

    const notes: Record<string, string | number> = isProductPurchase
      ? {
          type: 'product_purchase',
          productId: productId as string,
          productName: (productName as string) || 'Product Purchase',
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
        amount: parsedAmount, // in paise
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
      console.log('Amount:', parsedAmount / 100, 'INR')
      console.log('Product:', productId || courseId)
      console.log('License:', license || 'N/A')

      return NextResponse.json({
        success: true,
        orderId: mockOrderId,
        amount: parsedAmount,
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
        details: getErrorMessage(error)
      },
      { status: 500 }
    )
  }
}
