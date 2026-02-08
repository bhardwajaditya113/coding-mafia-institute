# 🚀 Vercel Deployment - Complete Guide

## Current Status
- ✅ GitHub Repository: https://github.com/bhardwajaditya113/coding-mafia-institute
- ✅ Code pushed with infinityloop.online domain
- ⏳ Ready to deploy on Vercel

---

## Step 1: Import Project to Vercel

### If you're on the Vercel dashboard:

1. **Click "Add New..."** → **"Project"**
2. **Import Git Repository:**
   - You'll see your GitHub repositories
   - Find: `coding-mafia-institute`
   - Click **"Import"** next to it

3. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected ✅)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto-filled ✅)
   - **Output Directory:** `.next` (auto-filled ✅)
   - **Install Command:** `npm install` (auto-filled ✅)
   - **No changes needed!** Everything is auto-configured

4. **Environment Variables (Optional):**
   - If you need any, add them here
   - For now, you can skip this

5. **Click "Deploy"**
   - Vercel will start building
   - Wait 2-3 minutes
   - You'll see build logs in real-time

---

## Step 2: After Deployment

Once deployment completes:

1. **You'll get a Vercel URL:**
   - Example: `https://coding-mafia-institute.vercel.app`
   - This is your temporary URL

2. **Test your site:**
   - Visit the Vercel URL
   - Test all pages
   - Everything should work!

---

## Step 3: Add Custom Domain (infinityloop.online)

### In Vercel Dashboard:

1. **Go to your project** → **Settings** tab
2. **Click "Domains"** in the left sidebar
3. **Click "Add Domain"**
4. **Enter:** `infinityloop.online`
5. **Click "Add"**

### Vercel will show you DNS configuration:

You'll see something like:

**For Root Domain:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For WWW:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**⚠️ Important:** The IP address may be different. Use the exact values Vercel shows you!

---

## Step 4: Configure DNS at Your Domain Registrar

Go to where you manage `infinityloop.online` DNS (Namecheap, GoDaddy, Cloudflare, etc.):

### Add DNS Records:

**Record 1 - Root Domain:**
```
Type: A
Name: @ (or leave blank, or use "infinityloop.online")
Value: [Use the IP from Vercel - usually 76.76.21.21]
TTL: 3600 (or Auto)
```

**Record 2 - WWW:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### Save the DNS records

---

## Step 5: Wait for DNS Propagation

1. **Wait 5-30 minutes** for DNS to propagate
2. **Check Vercel Dashboard:**
   - Go to Settings → Domains
   - You'll see domain status
   - It will show "Valid Configuration" when ready
3. **SSL Certificate:**
   - Vercel automatically provisions SSL
   - Takes 5-10 minutes after DNS is configured
   - You'll see "Valid Certificate" when ready

---

## Step 6: Verify Everything Works

After DNS propagates:

1. **Visit:** https://infinityloop.online
2. **Check HTTPS:** Should be automatic
3. **Test pages:**
   - Homepage
   - Courses
   - Login/Signup
   - Contact
4. **Check SEO:**
   - https://infinityloop.online/sitemap.xml
   - https://infinityloop.online/robots.txt

---

## 🎯 Your Final URLs

- **Primary:** https://infinityloop.online
- **WWW:** https://www.infinityloop.online (optional)
- **Vercel:** https://coding-mafia-institute.vercel.app (backup)

---

## 🆘 Troubleshooting

### "Domain not found" in Vercel
- Make sure DNS records are added correctly
- Wait 30 minutes for propagation
- Check DNS records match Vercel's requirements

### SSL Certificate Issues
- Wait 10-15 minutes after DNS is configured
- Vercel provisions SSL automatically
- Check Vercel Dashboard for SSL status

### Site Not Loading
- Verify DNS records are correct
- Check Vercel deployment is successful
- Clear browser cache

---

## ✅ Deployment Checklist

- [ ] Project imported to Vercel
- [ ] Deployment successful
- [ ] Domain added in Vercel Dashboard
- [ ] DNS records added at domain registrar
- [ ] DNS propagated (wait 5-30 minutes)
- [ ] SSL certificate active
- [ ] Site accessible at https://infinityloop.online

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Domain Setup:** https://vercel.com/docs/concepts/projects/domains
- **DNS Help:** Check your domain registrar's documentation

---

**Your site will be live at https://infinityloop.online!** 🎉
