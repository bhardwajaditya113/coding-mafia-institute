# Deployment Guide

## 🚀 Quick Deploy Options

### Vercel (Recommended - Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Environment Variables** (if needed)
   - Add any environment variables in Vercel dashboard
   - Settings → Environment Variables

### Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Node Version**: 18.x or higher

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
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

Build and run:
```bash
docker build -t coding-mafia .
docker run -p 3000:3000 coding-mafia
```

## 📋 Pre-Deployment Checklist

- [ ] Update `SITE_CONFIG` in `lib/constants.ts` with your domain
- [ ] Update sitemap URLs in `app/sitemap.ts`
- [ ] Update robots.txt URL in `app/robots.ts`
- [ ] Add environment variables (if needed)
- [ ] Test all pages and functionality
- [ ] Optimize images (if you add real images)
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Configure domain and SSL certificate

## 🔧 Production Optimizations

### 1. Enable Image Optimization
Add real images to `public/` directory and use Next.js Image component

### 2. Add Analytics
```bash
npm install @vercel/analytics
```

### 3. Enable Compression
Already handled by Next.js automatically

### 4. Set Up Monitoring
- Vercel Analytics (built-in)
- Sentry for error tracking
- LogRocket for session replay

## 🌐 Domain Setup

1. **Custom Domain**
   - Add domain in Vercel/Netlify dashboard
   - Update DNS records as instructed
   - SSL certificate auto-provisioned

2. **Update URLs**
   - Update `SITE_CONFIG.url` in `lib/constants.ts`
   - Update sitemap and robots.txt URLs

## 📊 Performance Tips

- Images: Use Next.js Image component
- Fonts: Already optimized with next/font
- Code Splitting: Automatic with Next.js
- Caching: Configured via Next.js headers

## 🔒 Security

- Environment variables: Never commit `.env` files
- API routes: Add rate limiting
- Authentication: Implement proper auth (NextAuth.js recommended)
- HTTPS: Always use HTTPS in production

## 📈 Post-Deployment

1. Test all functionality
2. Monitor performance
3. Set up error tracking
4. Configure backups (if using database)
5. Set up CI/CD pipeline

---

**Need Help?** Check Next.js deployment docs: https://nextjs.org/docs/deployment
