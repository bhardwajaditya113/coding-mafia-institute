# 🌐 Custom Domain Setup: infinityloop.online

## ✅ Code Updated

I've updated all references in your code to use `infinityloop.online`:
- ✅ Sitemap URL
- ✅ Robots.txt URL
- ✅ Site configuration
- ✅ SEO metadata

---

## 🚀 Step 1: Deploy to Vercel (If Not Done)

1. Go to: https://vercel.com
2. Sign up/Login with GitHub
3. Import `coding-mafia-institute` repository
4. Click "Deploy"
5. Wait for deployment to complete

---

## 🌐 Step 2: Add Custom Domain in Vercel

### In Vercel Dashboard:

1. **Go to your project** → **Settings** → **Domains**
2. **Click:** "Add Domain"
3. **Enter:** `infinityloop.online`
4. **Click:** "Add"
5. **Vercel will show you DNS configuration** - Keep this page open!

---

## 🔧 Step 3: Configure DNS

You need to add DNS records at your domain registrar (where you bought `infinityloop.online`).

### Option A: Root Domain (infinityloop.online)

Add these DNS records:

**Record 1:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Record 2:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Option B: Using CNAME (Recommended by Vercel)

If your DNS provider supports CNAME for root domain (ALIAS/ANAME):

**Record 1:**
```
Type: CNAME (or ALIAS/ANAME)
Name: @
Value: cname.vercel-dns.com
```

**Record 2:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 📋 Step 4: Verify DNS Settings

After adding DNS records:

1. **Wait 5-30 minutes** for DNS propagation
2. **In Vercel Dashboard:**
   - Go to Settings → Domains
   - You'll see the domain status
   - It will show "Valid Configuration" when ready
3. **Vercel automatically provisions SSL** (HTTPS)

---

## ✅ Step 5: Commit and Push Updated Code

The code has been updated with your domain. Push the changes:

```bash
cd "/home/labs/Desktop/Coding Mafia"
git add .
git commit -m "Update domain to infinityloop.online"
git push origin main
```

Vercel will automatically redeploy with the new domain settings.

---

## 🎯 Your Domain Configuration

- **Primary Domain:** `infinityloop.online`
- **WWW Domain:** `www.infinityloop.online` (optional, auto-configured)
- **SSL:** Automatic (HTTPS enabled)
- **CDN:** Global (automatic)

---

## 🔍 Verify Everything Works

After DNS propagates (5-30 minutes):

1. **Visit:** https://infinityloop.online
2. **Check sitemap:** https://infinityloop.online/sitemap.xml
3. **Check robots:** https://infinityloop.online/robots.txt
4. **Test all pages:**
   - Homepage
   - Courses
   - Login/Signup
   - Contact

---

## 🆘 Troubleshooting

### Domain Not Working
- Wait 30 minutes for DNS propagation
- Check DNS records are correct
- Verify in Vercel Dashboard → Domains

### SSL Certificate Issues
- Vercel provisions SSL automatically
- Wait 5-10 minutes after DNS is configured
- Check Vercel Dashboard for SSL status

### DNS Provider Help
Common DNS providers:
- **Namecheap:** https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/
- **GoDaddy:** https://www.godaddy.com/help/add-a-cname-record-19236
- **Cloudflare:** https://developers.cloudflare.com/dns/manage-dns-records/

---

## 📝 DNS Records Summary

Add these at your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Note:** The exact IP address may vary. Check Vercel Dashboard for the correct values.

---

## ✅ Checklist

- [ ] Code updated with infinityloop.online
- [ ] Changes committed and pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Domain added in Vercel Dashboard
- [ ] DNS records added at domain registrar
- [ ] DNS propagated (wait 5-30 minutes)
- [ ] SSL certificate active
- [ ] Site accessible at https://infinityloop.online

---

**Your site will be live at https://infinityloop.online once DNS propagates!** 🎉
