# Razorpay Setup - Add API Keys to Vercel

## 🔑 Your Razorpay Keys

**Key ID:** `rzp_test_SDULZGoTHytE7D`  
**Key Secret:** `k2NLpFzpBrArHK6ssYzuwnNg`

**Note:** These are **test keys** (start with `rzp_test_`). Perfect for testing!

---

## 📋 Step-by-Step: Add Keys to Vercel

### Step 1: Go to Vercel Environment Variables

1. **Open Vercel Dashboard:**
   https://vercel.com/aditya-bhardwajs-projects-6c3eb06f/coding-mafia-institute/settings/environment-variables

2. **Or navigate manually:**
   - Go to: Vercel Dashboard
   - Select: `coding-mafia-institute` project
   - Click: **Settings** → **Environment Variables**

### Step 2: Add Razorpay Key ID

1. **Click:** "Add New" or "+" button
2. **Fill in:**
   - **Key:** `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - **Value:** `rzp_test_SDULZGoTHytE7D`
   - **Environment:** Select all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. **Click:** "Save"

### Step 3: Add Razorpay Key Secret

1. **Click:** "Add New" or "+" button
2. **Fill in:**
   - **Key:** `RAZORPAY_KEY_SECRET`
   - **Value:** `k2NLpFzpBrArHK6ssYzuwnNg`
   - **Environment:** Select all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. **Click:** "Save"

### Step 4: Redeploy (Automatic)

- Vercel will automatically redeploy when you add environment variables
- Or manually trigger: **Deployments** → Click latest deployment → **Redeploy**

---

## ✅ Verify Setup

### Check Environment Variables:

You should see these in Vercel:
- ✅ `NEXT_PUBLIC_RAZORPAY_KEY_ID` = `rzp_test_SDULZGoTHytE7D`
- ✅ `RAZORPAY_KEY_SECRET` = `k2NLpFzpBrArHK6ssYzuwnNg`

### Test Payment Flow:

1. **Visit your site:**
   - https://www.infinityloop.online
   - Or: https://coding-mafia-institute.vercel.app

2. **Test Enrollment:**
   - Go to: Courses page
   - Click: "Enroll Now" on any course
   - Fill enrollment form
   - Click: "Proceed to Payment"

3. **Test Payment:**
   - Razorpay checkout should open
   - Use test card: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date
   - Name: Any name

4. **Verify:**
   - Payment should complete
   - Redirect to success page
   - Enrollment should appear in dashboard

---

## 🧪 Test Cards (Razorpay Test Mode)

### Success Card:
- **Card Number:** `4111 1111 1111 1111`
- **CVV:** Any 3 digits (e.g., `123`)
- **Expiry:** Any future date (e.g., `12/25`)
- **Name:** Any name

### Failure Card:
- **Card Number:** `4000 0000 0000 0002`
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **Name:** Any name

---

## 🔒 Security Notes

1. **Test Keys:**
   - These are test keys (safe to use)
   - Won't process real payments
   - Perfect for testing

2. **Live Keys (Later):**
   - After testing, get live keys from Razorpay
   - Complete KYC verification
   - Replace test keys with live keys

3. **Key Secret:**
   - `RAZORPAY_KEY_SECRET` is server-side only
   - Never expose in client-side code
   - Already configured correctly ✅

---

## 📋 Quick Checklist

- [ ] Add `NEXT_PUBLIC_RAZORPAY_KEY_ID` to Vercel
- [ ] Add `RAZORPAY_KEY_SECRET` to Vercel
- [ ] Set for all environments (Production, Preview, Development)
- [ ] Wait for redeploy (automatic)
- [ ] Test payment flow
- [ ] Verify enrollment works
- [ ] Check dashboard shows enrolled courses

---

## 🎯 Next Steps After Setup

1. **Test Payment:**
   - Enroll in a course
   - Complete test payment
   - Verify enrollment appears

2. **Test All Features:**
   - Enrollment flow
   - Payment success
   - Payment failure
   - Dashboard updates

3. **Get Live Keys (When Ready):**
   - Complete Razorpay KYC
   - Generate live keys
   - Replace test keys
   - Start accepting real payments

---

## 🆘 Troubleshooting

### Issue: Payment Not Working

**Check:**
1. Environment variables added correctly
2. Redeployed after adding variables
3. Keys are correct (no typos)
4. Using test cards correctly

**Solution:**
- Verify keys in Vercel dashboard
- Check browser console for errors
- Try redeploying manually

### Issue: Keys Not Loading

**Check:**
1. Variable names are exact:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` (with `NEXT_PUBLIC_` prefix)
   - `RAZORPAY_KEY_SECRET` (no prefix)

2. Redeployed after adding

**Solution:**
- Double-check variable names
- Redeploy manually
- Clear browser cache

---

**Status:** Ready to add keys to Vercel!

**Next:** Follow steps above to add keys, then test payment flow.
