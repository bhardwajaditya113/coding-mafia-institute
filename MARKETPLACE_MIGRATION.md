# 🚀 Coding Mafia Pivot: Source Code Marketplace Migration Guide

## Overview

The Coding Mafia platform has successfully pivoted from a course-only training institute to a **dual-model platform** that includes:

1. **Source Code Marketplace** - Premium, production-ready source code products
2. **Training Courses** - Existing training batches and courses (unchanged)

## What's New

### 📦 New Products Available

| Product | Category | Price | Downloads |
|---------|----------|-------|-----------|
| Company Website | IT/Software | ₹4,999 | 1,200 |
| Learning Management Marketplace | EdTech | ₹5,999 | 1,850 |
| Multi-Vendor Digital Marketplace | Ecommerce | ₹7,999 | 2,340 |
| Job Portal | Recruitment | ₹4,499 | 950 |
| Directory Listing Platform | Information Services | ₹3,999 | 780 |
| News Portal & Magazine | Digital Media | ₹3,499 | 1,050 |
| Non-Profit Charity Platform | Social Services | ₹2,999 | 620 |
| Point of Sale (POS) System | FinTech | ₹4,999 | 1,420 |
| Hotel Booking & Reservation | TravelTech | ₹5,999 | 1,560 |
| Multi-Restaurant Food Ordering App | FoodTech | ₹6,999 | 1,890 |

### 🎯 Key Features

#### Product Showcase
- **Homepage Integration**: New ProductShowcase component displays featured products
- **Marketplace Page**: Full product catalog with filtering and search
- **Product Details**: Comprehensive product pages with features, tech stack, pricing

#### Pricing Models
- **Personal License**: ₹X - For personal projects and learning (1x multiplier)
- **Commercial License**: ₹2.5X - For commercial projects (2.5x multiplier)
- **Agency License**: ₹5X - Unlimited projects for agencies (5x multiplier)

#### What's Included
- ✅ Complete source code with documentation
- ✅ Video tutorials and setup guides
- ✅ Lifetime access to product + all future updates
- ✅ Professional email support
- ✅ 30-day money-back guarantee
- ✅ Regular quarterly updates

### 💳 Payment Integration

All payments are processed through **Razorpay** with:
- Real-time order creation on Razorpay servers
- Secure payment verification
- Webhook support for payment status updates
- Support for multiple payment methods (UPI, Cards, Wallets, etc.)

## Technical Implementation

### New Pages & Routes

```
/marketplace                    - Marketplace homepage (catalog with filters)
/marketplace/[id]              - Product detail page with purchase option
/api/payment/create-order      - Create Razorpay order for products
/api/payment/verify            - Verify payment signature
/api/products/[id]/download    - Download product (after purchase)
```

### New Components

```
components/ProductShowcase.tsx     - Featured products section
app/marketplace/page.tsx           - Full marketplace catalog
app/marketplace/[id]/page.tsx      - Product detail with purchase
```

### Updated Data Structure

#### Product Interface
```typescript
interface Product {
  id: string
  name: string
  description: string
  resources: string
  category: string
  price: number
  originalPrice?: number
  image: string
  icon: string
  rating: number
  reviews: number
  downloads: number
  tags: string[]
  features: string[]
  tech_stack: string[]
  license: 'MIT' | 'Apache 2.0' | 'GPL' | 'Commercial' | 'Proprietary'
  deliveryFormat: 'source-code' | 'source-code-with-docs' | 'source-code-with-support'
  updateFrequency: string
  support: boolean
  documentation: boolean
  videoTutorials: boolean
  sourceCodeAccess: boolean
  lifetimeAccess: boolean
  competitors?: string
}
```

#### Purchase Records Interface
```typescript
interface ProductPurchase {
  id: string
  userId: string
  productId: string
  purchasedAt: string
  paymentId: string
  amount: number
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  downloadUrl?: string
  expiresAt?: string
  license: 'personal' | 'commercial' | 'agency'
}
```

## Installation & Setup

### 1. Environment Variables

Add these to your `.env.local`:

```env
# Razorpay Configuration (Production Keys)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXX
```

### 2. Install Dependencies

```bash
npm install razorpay
```

Already included in `package.json`.

### 3. Database Setup (TODO)

Create tables for:
- `product_purchases` - Track all product purchases
- `downloads` - Track download activity
- `payment_logs` - Log all payment attempts

### 4. Storage Setup (TODO)

- Configure AWS S3 or similar for source code file storage
- Setup download link generation with expiration
- Configure CDN for faster downloads

## API Endpoints

### Create Order
```
POST /api/payment/create-order
Content-Type: application/json

{
  "amount": 499900,           // in paise
  "productId": "company-website",
  "productName": "Company Website",
  "license": "personal"       // personal | commercial | agency
}

Response:
{
  "success": true,
  "orderId": "order_XXXXX",
  "amount": 499900,
  "currency": "INR"
}
```

### Verify Payment
```
POST /api/payment/verify
Content-Type: application/json

{
  "razorpay_payment_id": "pay_XXXXX",
  "razorpay_order_id": "order_XXXXX",
  "razorpay_signature": "XXXXX",
  "productId": "company-website",
  "license": "personal"
}

Response:
{
  "success": true,
  "message": "Payment verified",
  "paymentId": "pay_XXXXX",
  "orderId": "order_XXXXX",
  "productId": "company-website"
}
```

### Download Product
```
GET /api/products/[id]/download?payment_id=pay_XXXXX

Response:
{
  "success": true,
  "message": "Download initiated",
  "productId": "company-website",
  "downloadUrl": "/storage/products/company-website-source-code.zip",
  "expiresIn": "7 days"
}
```

## Frontend Flow

### Marketplace Page
1. User visits `/marketplace`
2. Browse products with category filters
3. Click on product → Product detail page

### Product Detail Page
1. View product features, tech stack, reviews
2. Select license type (Personal/Commercial/Agency)
3. Price updates based on license
4. Click "Buy Now" → Razorpay payment window
5. Complete payment → Verification
6. Payment success → Download link provided

### Payment Success Page
1. Shows payment confirmation
2. Provides download instructions
3. Shows license details
4. Email sent with download link

## Best Practices

### 🔒 Security
- ✅ Never expose Razorpay secret key in client-side code
- ✅ Always verify signatures on the backend
- ✅ Use HTTPS for all payment-related endpoints
- ✅ Implement rate limiting on payment endpoints
- ✅ Log all payment attempts for auditing

### 💾 Database Optimization
- ✅ Index `userId` and `productId` in purchases table
- ✅ Archive old download records periodically
- ✅ Cache frequently accessed product data

### 🚀 Performance
- ✅ Lazy load product images
- ✅ Cache product catalog
- ✅ Implement CDN for source code downloads
- ✅ Optimize payment verification responses

### 📊 Analytics
- Track purchase by product, license type, user
- Monitor download success rates
- Track payment failure reasons
- Analyze user behavior on marketplace

## TODO - Production Checklist

- [ ] Setup database schema for purchases and downloads
- [ ] Configure S3/storage for source code files
- [ ] Implement file encryption for downloads
- [ ] Setup email service for download notifications
- [ ] Create admin dashboard for purchase management
- [ ] Implement license key generation system
- [ ] Setup webhook handlers for Razorpay events
- [ ] Add support ticket system for customers
- [ ] Create automated backup system
- [ ] Implement analytics tracking
- [ ] Setup monitoring and alerting
- [ ] Create API documentation for partners
- [ ] Add refund management system
- [ ] Implement subscription model (optional)
- [ ] Create affiliate program (optional)

## Performance Metrics

### Target KPIs
- **Page Load Time**: < 2s
- **Checkout Time**: < 30s
- **Payment Success Rate**: > 95%
- **Download Success Rate**: > 99%
- **Customer Support Response**: < 24hrs

## Migration from Courses to Products

### What Stayed the Same
- User authentication system
- Admin dashboard
- Course enrollment (parallel system)
- Training batches

### What Changed
- Homepage now shows products alongside courses
- Navigation includes "Marketplace" link
- Payment system extended for product purchases
- New database tables for purchases

### Parallel Operation
- Courses continue to work as before
- Users can enroll in both courses and buy products
- Separate tracking for each revenue stream
- Independent billing systems

## Troubleshooting

### Payment Creation Fails
- Check Razorpay keys in environment variables
- Verify amount is in paise (amount * 100)
- Check Razorpay account status
- Verify API rate limits

### Payment Verification Fails
- Ensure signature validation logic is correct
- Check timezone settings on server
- Verify payment status in Razorpay dashboard
- Check order exists in Razorpay

### Download Link Expires
- Implement download retry mechanism
- Send reminder email with new link
- Track failed downloads in analytics

## Support

For issues or questions:
- Email: support@codingmafia.com
- Discord: https://discord.gg/codingmafia
- GitHub Issues: https://github.com/codingmafia/platform

## Changelog

### v2.0.0 - Marketplace Launch (March 2026)
- Added source code product marketplace
- Implemented Razorpay payment for products
- Created product showcase components
- Added product detail pages with features
- Implemented license-based pricing model
- Added download management system
- Integrated product categories from Excel data

### v1.0.0 - Course Training Platform (Previous)
- Course management and enrollment
- Batch creation and scheduling
- Admin dashboard
- User authentication
