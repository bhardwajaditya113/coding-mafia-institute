# Deployment Guide 🚀

Complete guide to deploy Coding Mafia Institute to production.

---

## Quick Start - Vercel (Recommended) ⚡

Vercel is the easiest and fastest way to deploy Next.js applications.

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/coding-mafia.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Configure Environment Variables** (if needed)
   - Go to Project Settings → Environment Variables
   - Add variables from `.env.example`
   - Redeploy

4. **Done!** Your site is live at `yourproject.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts
```

---

## Alternative Deployment Options

### Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

3. **Or use Netlify Dashboard**
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `.next`

### AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your Git repository
   - Amplify auto-detects Next.js

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS base
   
   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci
   
   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build
   
   # Production image, copy all the files and run next
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Build and Run**
   ```bash
   docker build -t coding-mafia .
   docker run -p 3000:3000 coding-mafia
   ```

---

## Environment Variables Setup

### For Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable:
   - `NODE_ENV` = `production`
   - `NEXT_PUBLIC_APP_URL` = `https://yourdomain.com`
   - Add others as needed from `.env.example`

### For Other Platforms

Create `.env.production` file:
```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
# Add other variables
```

---

## Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. SSL is automatically provisioned

### General DNS Configuration

Add these DNS records:

**For Root Domain:**
```
Type: A
Name: @
Value: [Your hosting IP]
```

**For Subdomain (www):**
```
Type: CNAME
Name: www
Value: yourdomain.com
```

---

## Post-Deployment Checklist

### Immediate Actions

- [ ] Verify site is accessible
- [ ] Test all pages load correctly
- [ ] Check mobile responsiveness
- [ ] Verify authentication works
- [ ] Test enrollment flow
- [ ] Check admin dashboard access

### Performance

- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify image optimization
- [ ] Test page load speeds

### SEO

- [ ] Verify sitemap is accessible: `yourdomain.com/sitemap.xml`
- [ ] Check robots.txt: `yourdomain.com/robots.txt`
- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta tags in page source

### Security

- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Check security headers
- [ ] Verify authentication security
- [ ] Test input validation

### Monitoring

- [ ] Set up error tracking (Sentry, etc.)
- [ ] Configure analytics (Google Analytics)
- [ ] Set up uptime monitoring
- [ ] Configure alerts

---

## Troubleshooting

### Build Fails

1. Check Node.js version (requires 18+)
2. Clear `.next` folder: `rm -rf .next`
3. Clear node_modules: `rm -rf node_modules && npm install`
4. Check for TypeScript errors: `npm run build`

### Runtime Errors

1. Check browser console
2. Check server logs
3. Verify environment variables
4. Check API endpoints (if any)

### Performance Issues

1. Enable Next.js Image Optimization
2. Check bundle size
3. Enable compression
4. Use CDN for static assets

---

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Backup Strategy

- Regular database backups (when integrated)
- Version control (Git)
- Environment variable backups
- Asset backups

---

## Support & Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Deployment Best Practices:** See `PRODUCTION_READINESS_REPORT.md`

---

## Quick Reference

```bash
# Local development
npm run dev

# Production build
npm run build

# Test production locally
npm start

# Deploy to Vercel
vercel --prod

# Check build
npm run build
```

---

**Ready to deploy?** Follow the Quick Start section above! 🚀
