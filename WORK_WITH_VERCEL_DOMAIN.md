# Working with Vercel Domain

## ✅ Current Status

**Vercel Domain:** `coding-mafia-institute.vercel.app`
**Status:** ✅ **LIVE and Working!**

The Vercel domain is already accessible and fully functional. You can use it immediately!

---

## 🌐 Your Available Domains

### 1. Vercel Domain (Currently Live)
- **URL:** https://coding-mafia-institute.vercel.app
- **Status:** ✅ Valid Configuration
- **SSL:** ✅ Active
- **Ready to Use:** ✅ YES

### 2. Custom Domain (Propagating)
- **URL:** https://infinityloop.online
- **Status:** ⏳ Invalid Configuration (DNS propagating)
- **SSL:** ⏳ Pending
- **Ready to Use:** ⏳ Wait 1-2 hours

---

## 🚀 What You Can Do Now

Since the Vercel domain is live, you can:

### 1. Test Your Site
- Visit: https://coding-mafia-institute.vercel.app
- Test all pages:
  - Homepage
  - Courses
  - Login/Signup
  - Dashboard
  - Admin

### 2. Setup Razorpay
- Create Razorpay account
- Generate API keys
- Add to Vercel environment variables
- Test payment flow

### 3. Share Your Site
- Use the Vercel domain for testing
- Switch to custom domain once it's live

---

## 🔧 Update Code for Vercel Domain (Optional)

If you want to use the Vercel domain temporarily, you can update the site URL:

### Option 1: Use Environment Variable (Recommended)

Create `.env.local` or add to Vercel Environment Variables:

```bash
NEXT_PUBLIC_SITE_URL=https://coding-mafia-institute.vercel.app
```

Then update `lib/constants.ts`:

```typescript
export const SITE_CONFIG = {
  name: 'Coding Mafia Institute',
  description: 'World-class coding training institute for IT professionals',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://infinityloop.online',
  // ... rest
}
```

### Option 2: Keep Custom Domain (Recommended)

Keep the code as is (using `infinityloop.online`). Once the custom domain is live, everything will work automatically.

---

## 📋 Razorpay Setup with Vercel Domain

### Step 1: Create Razorpay Account

1. Go to: https://razorpay.com/
2. Sign up / Login
3. Complete KYC (for live mode)

### Step 2: Generate API Keys

1. Go to: Settings → API Keys
2. Generate new key pair
3. Copy:
   - Key ID (starts with `rzp_test_` or `rzp_live_`)
   - Key Secret

### Step 3: Add to Vercel Environment Variables

1. Go to Vercel Dashboard:
   https://vercel.com/aditya-bhardwajs-projects-6c3eb06f/coding-mafia-institute/settings/environment-variables

2. Add these variables:
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
   RAZORPAY_KEY_SECRET=your_key_secret_here
   ```

3. **Important:** Set for:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. **Redeploy:**
   - Vercel will auto-redeploy
   - Or manually trigger: Deployments → Redeploy

### Step 4: Configure Razorpay Webhook (Optional)

1. In Razorpay Dashboard → Settings → Webhooks
2. Add webhook URL:
   ```
   https://coding-mafia-institute.vercel.app/api/payment/webhook
   ```
3. Select events:
   - `payment.captured`
   - `payment.failed`

---

## 🧪 Test Payment Flow

### Test Mode (Recommended First)

1. Use test keys (start with `rzp_test_`)
2. Test payment with Razorpay test cards:
   - Success: `4111 1111 1111 1111`
   - Failure: `4000 0000 0000 0002`
3. Verify enrollment updates in dashboard

### Live Mode (After Testing)

1. Complete Razorpay KYC
2. Generate live keys (start with `rzp_live_`)
3. Update environment variables
4. Test with real payment (small amount)

---

## 🔄 Switching to Custom Domain Later

Once `infinityloop.online` is live:

1. **No code changes needed** - Already configured!
2. **Update Razorpay webhook** (if using):
   - Change from: `coding-mafia-institute.vercel.app`
   - To: `infinityloop.online`
3. **Both domains will work** - Vercel serves both automatically

---

## ✅ Quick Checklist

- [x] Vercel domain is live: `coding-mafia-institute.vercel.app`
- [ ] Test site on Vercel domain
- [ ] Create Razorpay account
- [ ] Generate Razorpay API keys
- [ ] Add keys to Vercel environment variables
- [ ] Test payment flow
- [ ] Wait for custom domain to go live
- [ ] Switch to custom domain (optional)

---

## 🎯 Recommended Approach

**Use Vercel Domain Now:**
1. ✅ Test everything on Vercel domain
2. ✅ Setup Razorpay with Vercel domain
3. ✅ Start testing payments
4. ⏳ Wait for custom domain
5. ✅ Switch webhook to custom domain (optional)

**Both domains will work simultaneously!**

---

## 📞 Next Steps

1. **Test Site:**
   - Visit: https://coding-mafia-institute.vercel.app
   - Verify all pages work

2. **Setup Razorpay:**
   - Create account
   - Get API keys
   - Add to Vercel

3. **Test Payment:**
   - Enroll in a course
   - Complete payment
   - Verify enrollment

**Your site is ready to use on the Vercel domain!** 🚀
