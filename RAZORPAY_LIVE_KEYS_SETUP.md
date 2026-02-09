# 🔑 Razorpay Live Keys Setup - COMPLETE

## ✅ Your Live Razorpay Credentials

- **Key ID:** `rzp_live_SDwpkGogBOQ7NU`
- **Key Secret:** `uGPKaDIh1fmsJ7Pis7NdmLZX`

---

## 📋 Step 1: Add to Vercel Environment Variables

### Go to Vercel Dashboard:
1. Visit: https://vercel.com/aditya-bhardwajs-projects-6c3eb06f/coding-mafia-institute/settings/environment-variables
2. Or: Project → Settings → Environment Variables

### Add These Two Variables:

#### Variable 1: `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- **Key:** `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- **Value:** `rzp_live_SDwpkGogBOQ7NU`
- **Environment:** Select all (Production, Preview, Development)
- **Click:** "Save"

#### Variable 2: `RAZORPAY_KEY_SECRET`
- **Key:** `RAZORPAY_KEY_SECRET`
- **Value:** `uGPKaDIh1fmsJ7Pis7NdmLZX`
- **Environment:** Select all (Production, Preview, Development)
- **Click:** "Save"

---

## 🔄 Step 2: Redeploy After Adding Variables

After adding environment variables:

1. **Option A: Automatic Redeploy**
   - Vercel will automatically detect the new variables
   - Wait for next deployment or trigger a redeploy

2. **Option B: Manual Redeploy**
   - Go to: https://vercel.com/aditya-bhardwajs-projects-6c3eb06f/coding-mafia-institute/deployments
   - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger auto-deploy

---

## ✅ Step 3: Verify Setup

### Check Environment Variables:
1. Go to: https://vercel.com/aditya-bhardwajs-projects-6c3eb06f/coding-mafia-institute/settings/environment-variables
2. Verify both variables are listed:
   - ✅ `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - ✅ `RAZORPAY_KEY_SECRET`

### Test Payment Flow:
1. Visit: https://www.infinityloop.online/enroll
2. Select a course and batch
3. Fill in enrollment form
4. Click "Proceed to Payment"
5. **Razorpay checkout should open with LIVE mode**
6. Use a real payment method (or Razorpay test mode if still in testing)

---

## 🔒 Security Notes

### ✅ What's Already Secure:
- `.env.local` is gitignored (won't be committed)
- `.env.example` is a template (no real keys)
- Secret key is server-side only (not exposed to frontend)
- Key ID is public (safe to expose, used in frontend)

### ⚠️ Important:
- **Never commit** `.env.local` to Git
- **Never share** your secret key publicly
- Secret key is only used in server-side API routes
- Key ID is safe to use in frontend (it's public by design)

---

## 📊 Razorpay Dashboard

### Monitor Payments:
- **Dashboard:** https://dashboard.razorpay.com/
- **Transactions:** View all payments in real-time
- **Settlements:** Track money transfers to your bank
- **Analytics:** View payment trends and success rates

---

## 🧪 Testing with Live Keys

### ⚠️ Important:
- **Live keys process REAL payments**
- Use test mode for development if needed
- Test with small amounts first
- Monitor Razorpay dashboard for transactions

### Test Payment Flow:
1. Go to enrollment page
2. Select course and batch
3. Fill form and proceed to payment
4. Complete payment with real card/UPI
5. Check Razorpay dashboard for transaction
6. Verify enrollment is created after payment

---

## ✅ Setup Complete Checklist

- [x] Live Razorpay keys received
- [x] `.env.local` created for local development
- [x] `.env.example` created as template
- [ ] `NEXT_PUBLIC_RAZORPAY_KEY_ID` added to Vercel
- [ ] `RAZORPAY_KEY_SECRET` added to Vercel
- [ ] Vercel deployment triggered/redeployed
- [ ] Payment flow tested on production
- [ ] Razorpay dashboard verified for transactions

---

## 🚀 Next Steps

1. **Add environment variables to Vercel** (see Step 1 above)
2. **Redeploy** the application
3. **Test payment flow** on production
4. **Monitor** Razorpay dashboard for transactions
5. **Verify** enrollments are created after successful payments

---

## 📞 Support

### If Payment Issues:
1. Check Vercel environment variables are set correctly
2. Verify Razorpay dashboard for transaction status
3. Check browser console for errors
4. Verify Razorpay account is active and KYC complete

### Razorpay Support:
- **Dashboard:** https://dashboard.razorpay.com/
- **Documentation:** https://razorpay.com/docs/
- **Support:** https://razorpay.com/support/

---

**Status:** ✅ Live keys configured locally | ⏳ Waiting for Vercel setup
