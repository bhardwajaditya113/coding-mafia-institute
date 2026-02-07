# Step-by-Step Deployment Instructions

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- [x] Build completes successfully (`npm run build`)
- [x] All features tested locally
- [x] Environment variables documented
- [x] Git repository initialized (optional but recommended)

---

## 🚀 Deployment Steps

### Step 1: Prepare Repository (5 minutes)

```bash
# Initialize Git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Production ready - Coding Mafia Institute"

# Create GitHub repository, then:
git remote add origin https://github.com/YOUR_USERNAME/coding-mafia.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel (3 minutes)

**Option A: Via Dashboard (Easiest)**
1. Visit [vercel.com](https://vercel.com)
2. Sign up/Login (use GitHub for easy integration)
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Vercel auto-detects Next.js settings
6. Click "Deploy"
7. Wait 2-3 minutes
8. Your site is live! 🎉

**Option B: Via CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Step 3: Configure Domain (5 minutes)

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `codingmafia.com`)
4. Follow DNS configuration:
   - Add A record: `@` → Vercel IP
   - Add CNAME: `www` → `cname.vercel-dns.com`
5. Wait for DNS propagation (5-30 minutes)
6. SSL certificate is automatically provisioned

### Step 4: Environment Variables (2 minutes)

If you need environment variables:
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add variables:
   ```
   NODE_ENV = production
   NEXT_PUBLIC_APP_URL = https://yourdomain.com
   ```
3. Redeploy (automatic or manual)

### Step 5: Verify Deployment (5 minutes)

Test these URLs:
- [ ] Homepage: `https://yourdomain.com`
- [ ] Courses: `https://yourdomain.com/courses`
- [ ] Login: `https://yourdomain.com/auth/login`
- [ ] Contact: `https://yourdomain.com/contact`
- [ ] Sitemap: `https://yourdomain.com/sitemap.xml`
- [ ] Robots: `https://yourdomain.com/robots.txt`

Test Features:
- [ ] User registration
- [ ] User login
- [ ] Course browsing
- [ ] Batch enrollment
- [ ] Admin dashboard (if admin account exists)
- [ ] Mobile responsiveness

### Step 6: SEO Setup (10 minutes)

1. **Google Search Console**
   - Add property: `https://yourdomain.com`
   - Verify ownership
   - Submit sitemap: `https://yourdomain.com/sitemap.xml`

2. **Update Sitemap URL** (if needed)
   - Edit `app/sitemap.ts`
   - Change `baseUrl` to your actual domain

3. **Update Robots.txt** (if needed)
   - Edit `app/robots.ts`
   - Update sitemap URL

### Step 7: Analytics & Monitoring (Optional)

1. **Google Analytics**
   - Create GA4 property
   - Add tracking code to `app/layout.tsx` (if needed)

2. **Error Tracking**
   - Set up Sentry or similar
   - Add to `app/error.tsx` and `components/ErrorBoundary.tsx`

---

## 🔧 Post-Deployment

### Performance Check
```bash
# Run Lighthouse audit
# In Chrome DevTools → Lighthouse → Generate Report
```

### Security Check
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Security headers configured (see `vercel.json`)
- [ ] No sensitive data in client code

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error alerts
- [ ] Monitor performance metrics

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Site Not Loading
- Check Vercel deployment logs
- Verify environment variables
- Check domain DNS settings

### Performance Issues
- Enable Next.js Image Optimization
- Check bundle size in Vercel Analytics
- Enable Edge Functions if needed

---

## 📊 Success Metrics

After deployment, monitor:
- ✅ Site uptime (should be 99.9%+)
- ✅ Page load speed (< 3 seconds)
- ✅ Core Web Vitals (Good scores)
- ✅ Error rate (< 0.1%)
- ✅ User registrations
- ✅ Course enrollments

---

## 🎉 You're Live!

Your Coding Mafia Institute is now live and ready for students!

**Next Steps:**
1. Share your website URL
2. Start marketing
3. Monitor analytics
4. Gather user feedback
5. Iterate and improve

---

**Need help?** Check `DEPLOYMENT_GUIDE.md` for detailed instructions.
