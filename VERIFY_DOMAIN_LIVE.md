# Verify Domain is Live - Quick Guide

## 🔍 Check if Site is Live

### Step 1: Visit Your Domain
Open in browser:
- **Main domain:** https://infinityloop.online
- **WWW domain:** https://www.infinityloop.online

### Step 2: What to Look For

**✅ Site is LIVE if:**
- You see the Coding Mafia homepage
- No error messages
- Pages load correctly
- HTTPS padlock shows in browser

**❌ Site NOT live if:**
- "Invalid Configuration" error
- "DNS not found" error
- Blank page or timeout
- Browser can't connect

---

## 📊 Check Vercel Status

1. **Go to Vercel Domains:**
   https://vercel.com/aditya-bhardwajs-projects-6c3eb06f/coding-mafia-institute/settings/domains

2. **Check Status:**
   - ✅ **"Valid Certificate"** = Site is LIVE!
   - ⏳ **"Valid Configuration"** = Almost there, waiting for SSL
   - ❌ **"Invalid Configuration"** = DNS issue, check records

---

## 🔧 If Still "Invalid Configuration"

### Check DNS Records in BigRock:
1. Login to BigRock
2. Go to DNS Management
3. Verify these records exist:

**A Record:**
- Name: `@` or `infinityloop.online`
- Value: `216.198.79.1`
- Status: Active

**CNAME Record:**
- Name: `www`
- Value: `e9959da8e8787c32.vercel-dns-017.com`
- Status: Active

### Wait Time:
- DNS propagation: 10 minutes to 48 hours
- Usually works within 1-2 hours
- Check every 30 minutes

---

## ✅ Once Site is LIVE

### Step 1: Generate Razorpay Keys

1. **Go to Razorpay Dashboard:**
   https://dashboard.razorpay.com/

2. **Sign up / Login**

3. **Get API Keys:**
   - Go to Settings → API Keys
   - Generate new key pair
   - Copy Key ID and Key Secret

### Step 2: Add Keys to Vercel

1. **Go to Vercel Project Settings:**
   https://vercel.com/aditya-bhardwajs-projects-6c3eb06f/coding-mafia-institute/settings/environment-variables

2. **Add Environment Variables:**
   ```
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id_here
   RAZORPAY_KEY_SECRET=your_key_secret_here
   ```

3. **Redeploy:**
   - Vercel will auto-redeploy
   - Or trigger manual redeploy

### Step 3: Update Code (if needed)

The code already uses environment variables:
```typescript
// lib/razorpay.ts
key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_...'
```

Once you add the env vars, it will automatically use them!

---

## 🧪 Test Payment Flow

Once live with Razorpay keys:

1. **Test Mode:**
   - Use test keys first
   - Test card: `4111 1111 1111 1111`

2. **Production Mode:**
   - Switch to live keys
   - Real payments will work

---

## 📝 Quick Checklist

- [ ] Site accessible at https://infinityloop.online
- [ ] Vercel shows "Valid Certificate"
- [ ] HTTPS padlock visible
- [ ] All pages load correctly
- [ ] Razorpay account created
- [ ] API keys generated
- [ ] Keys added to Vercel env vars
- [ ] Site redeployed
- [ ] Payment flow tested

---

## 🆘 Troubleshooting

### Site Not Loading?
1. Check DNS records in BigRock
2. Wait 1-2 hours for propagation
3. Clear browser cache
4. Try different browser/device

### Still "Invalid Configuration"?
1. Double-check DNS records match exactly
2. Remove any conflicting records
3. Wait longer (up to 48 hours)
4. Contact Vercel support if persists

### Payment Not Working?
1. Verify Razorpay keys are correct
2. Check environment variables in Vercel
3. Ensure site is using HTTPS
4. Check browser console for errors

---

**Current Status:** Waiting for DNS propagation and SSL certificate

**Next Step:** Once site is live → Generate Razorpay keys → Add to Vercel → Test!
