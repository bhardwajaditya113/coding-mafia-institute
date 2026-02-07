# 🚀 Quick Deploy - Do This Now!

## ✅ Step 1: Create GitHub Repository (2 minutes)

1. **Go to:** https://github.com/new
2. **Repository name:** `coding-mafia-institute`
3. **Description:** "World-class coding training institute website"
4. **Visibility:** Choose Public or Private
5. **⚠️ IMPORTANT:** Do NOT check:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. **Click:** "Create repository"

---

## ✅ Step 2: Create Personal Access Token (3 minutes)

**⚠️ Security:** Never use your GitHub password directly! Use a token instead.

1. **Go to:** https://github.com/settings/tokens
2. **Click:** "Generate new token" → "Generate new token (classic)"
3. **Note:** "Coding Mafia Deployment"
4. **Expiration:** 90 days (or No expiration)
5. **Select scopes:**
   - ✅ `repo` (Full control of private repositories)
6. **Click:** "Generate token"
7. **📋 COPY THE TOKEN** (you won't see it again!)

---

## ✅ Step 3: Push to GitHub (1 minute)

Run this command in your terminal:

```bash
cd "/home/labs/Desktop/Coding Mafia"

# Add your GitHub username (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/coding-mafia-institute.git

# Push to GitHub
# When asked for password, paste your TOKEN (not password)
git push -u origin main
```

**When prompted:**
- **Username:** `bhardwajaditya113` (or your GitHub username)
- **Password:** Paste your **Personal Access Token** (not your actual password)

---

## ✅ Step 4: Deploy to Vercel (2 minutes)

1. **Go to:** https://vercel.com
2. **Sign up/Login** (use GitHub for easy connection)
3. **Click:** "Add New..." → "Project"
4. **Import:** Your `coding-mafia-institute` repository
5. **Settings:** Vercel auto-detects Next.js (no changes needed)
6. **Click:** "Deploy"
7. **Wait:** 2-3 minutes
8. **🎉 Done!** Your site is live!

---

## 🎯 Your Site Will Be Live At:

- **Vercel URL:** `https://coding-mafia-institute.vercel.app`
- **GitHub:** `https://github.com/YOUR_USERNAME/coding-mafia-institute`

---

## 🔧 Alternative: Use the Helper Script

```bash
cd "/home/labs/Desktop/Coding Mafia"
bash PUSH_TO_GITHUB.sh
```

This script will guide you through the process step-by-step.

---

## ⚠️ Troubleshooting

### "Repository not found"
- Make sure you created the repository on GitHub first
- Check the repository name matches exactly

### "Authentication failed"
- Make sure you're using a **Personal Access Token**, not your password
- Verify the token has `repo` scope
- Check if the token expired

### "Remote already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/coding-mafia-institute.git
```

---

## ✅ Success Checklist

- [ ] GitHub repository created
- [ ] Personal Access Token created
- [ ] Code pushed to GitHub
- [ ] Vercel deployment started
- [ ] Site is live!

---

**You're almost there! Follow the steps above and your site will be live in 5 minutes!** 🚀
