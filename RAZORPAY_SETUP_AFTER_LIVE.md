# Razorpay Setup - After Site is Live

## 🎯 Prerequisites

✅ Site must be live at: https://infinityloop.online
✅ HTTPS certificate active
✅ All pages loading correctly

---

## 📋 Step-by-Step Razorpay Setup

### Step 1: Create Razorpay Account

1. **Visit:** https://razorpay.com/
2. **Click:** "Sign Up" or "Get Started"
3. **Fill details:**
   - Business name: Coding Mafia Institute
   - Email: bhardwajaditya113@gmail.com
   - Phone: +91-7727050461
   - Business type: Education/Training
4. **Complete verification** (may take 1-2 days)

---

### Step 2: Get API Keys

1. **Login to Dashboard:**
   https://dashboard.razorpay.com/

2. **Navigate to:**
   Settings → API Keys

3. **Generate Keys:**
   - Click "Generate Key"
   - Copy **Key ID** (starts with `rzp_live_...`)
   - Copy **Key Secret** (only shown once - save it!)

4. **Test Keys (Optional):**
   - Use test keys first to verify integration
   - Test Key ID: `rzp_test_...`
   - Test Key Secret: `...`

---

### Step 3: Add Keys to Vercel

1. **Go to Vercel Environment Variables:**
   https://vercel.com/aditya-bhardwajs-projects-6c3eb06f/coding-mafia-institute/settings/environment-variables

2. **Add Variables:**

   **For Production:**
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID
   RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
   ```

   **For Testing (Optional):**
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID
   RAZORPAY_KEY_SECRET=YOUR_TEST_KEY_SECRET
   ```

3. **Select Environment:**
   - ✅ Production
   - ✅ Preview (optional)
   - ✅ Development (optional)

4. **Save**

---

### Step 4: Redeploy Site

Vercel will auto-redeploy, or:

1. **Go to Deployments:**
   https://vercel.com/aditya-bhardwajs-projects-6c3eb06f/coding-mafia-institute/deployments

2. **Click:** "Redeploy" on latest deployment

3. **Wait for build to complete**

---

### Step 5: Verify Integration

1. **Visit:** https://infinityloop.online
2. **Navigate to:** Any course → Enroll
3. **Fill enrollment form**
4. **Click:** "Proceed to Payment"
5. **Razorpay checkout should open**

---

## 🧪 Testing

### Test Mode (Recommended First):

1. **Use Test Keys:**
   - Add test keys to Vercel
   - Redeploy

2. **Test Payment:**
   - Card: `4111 1111 1111 1111`
   - CVV: Any 3 digits (e.g., `123`)
   - Expiry: Any future date (e.g., `12/25`)
   - Name: Any name

3. **Verify:**
   - Payment goes through
   - Success page shows
   - Enrollment appears in dashboard

### Production Mode:

1. **Switch to Live Keys:**
   - Replace test keys with live keys
   - Redeploy

2. **Test with Real Card:**
   - Use your own card (small amount)
   - Verify payment processes
   - Check Razorpay dashboard for transaction

---

## 🔒 Security Best Practices

### ✅ Do:
- Store keys in environment variables (never in code)
- Use HTTPS (Vercel provides automatically)
- Verify payments on backend (implement later)
- Keep Key Secret secure (never expose in frontend)

### ❌ Don't:
- Commit keys to Git
- Share keys publicly
- Use same keys for test and production
- Store keys in localStorage or client-side code

---

## 📊 Razorpay Dashboard Features

Once set up, you can:

1. **View Transactions:**
   - All payments
   - Payment status
   - Refunds

2. **Analytics:**
   - Revenue tracking
   - Payment methods
   - Success rates

3. **Settings:**
   - Webhooks (for payment notifications)
   - Settlement settings
   - Tax configuration

---

## 🔧 Current Code Status

The code is **already configured** to use environment variables:

**File:** `lib/razorpay.ts`
```typescript
key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_...'
```

**What this means:**
- ✅ Will automatically use `NEXT_PUBLIC_RAZORPAY_KEY_ID` from Vercel
- ✅ Falls back to test key if not set (for development)
- ✅ No code changes needed!

---

## 📝 Checklist

- [ ] Site is live and accessible
- [ ] Razorpay account created
- [ ] Business verification completed
- [ ] API keys generated
- [ ] Keys added to Vercel environment variables
- [ ] Site redeployed
- [ ] Test payment completed successfully
- [ ] Production keys configured (when ready)
- [ ] Real payment tested (when ready)

---

## 🆘 Troubleshooting

### Payment Not Working?

1. **Check Environment Variables:**
   - Verify keys are added in Vercel
   - Ensure correct environment selected
   - Redeploy after adding

2. **Check Browser Console:**
   - Open DevTools (F12)
   - Look for errors
   - Check network tab

3. **Verify Razorpay Script:**
   - Should load from: `https://checkout.razorpay.com/v1/checkout.js`
   - Check if blocked by ad blocker

4. **Test Keys:**
   - Try test keys first
   - Verify test payment works
   - Then switch to live keys

### Keys Not Working?

1. **Verify Key Format:**
   - Key ID: `rzp_live_...` or `rzp_test_...`
   - Key Secret: Long string (keep secure)

2. **Check Account Status:**
   - Ensure Razorpay account is active
   - Complete verification if pending

3. **Contact Razorpay Support:**
   - If keys don't work after verification

---

## 🎉 Next Steps After Setup

1. **Backend Integration (Future):**
   - Create API route for payment verification
   - Store enrollments in database
   - Implement webhooks for payment notifications

2. **Analytics:**
   - Track payment success rates
   - Monitor revenue
   - Analyze user behavior

3. **Features:**
   - Refund handling
   - Invoice generation
   - Payment history for users

---

**Status:** Waiting for site to go live → Then setup Razorpay → Test → Go live! 🚀
