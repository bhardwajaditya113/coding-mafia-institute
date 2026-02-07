# Quick Deployment Guide 🚀

## Fastest Way to Deploy (5 minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Ready for production"
git remote add origin https://github.com/YOUR_USERNAME/coding-mafia.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy" (Vercel auto-detects Next.js)
5. Done! Your site is live 🎉

### Step 3: Add Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add your domain
3. Follow DNS instructions
4. SSL is automatic

---

## Environment Variables (If Needed)

In Vercel Dashboard → Settings → Environment Variables:
- `NODE_ENV` = `production`
- `NEXT_PUBLIC_APP_URL` = `https://yourdomain.com`

---

## Test Production Build Locally

```bash
npm run build
npm start
# Visit http://localhost:3000
```

---

## Need Help?

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

**That's it! Your site is production-ready.** ✅
