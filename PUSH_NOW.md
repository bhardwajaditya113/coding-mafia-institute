# ✅ Step 1 Complete! Now Push to GitHub

## ✅ Repository Created
Your GitHub repository is ready: https://github.com/bhardwajaditya113/coding-mafia-institute

---

## 🔐 Step 2: Create Personal Access Token (2 minutes)

**⚠️ IMPORTANT:** GitHub no longer accepts passwords for Git operations. You MUST use a Personal Access Token.

### Create Token:
1. **Go to:** https://github.com/settings/tokens
2. **Click:** "Generate new token" → "Generate new token (classic)"
3. **Note:** `Coding Mafia Deployment`
4. **Expiration:** Choose 90 days or No expiration
5. **Select scopes:**
   - ✅ **repo** (Full control of private repositories)
6. **Click:** "Generate token" (at the bottom)
7. **📋 COPY THE TOKEN IMMEDIATELY** - You won't see it again!

---

## 📤 Step 3: Push Your Code (1 minute)

Your repository is already configured! Just run:

```bash
cd "/home/labs/Desktop/Coding Mafia"
git push -u origin main
```

**When prompted:**
- **Username:** `bhardwajaditya113`
- **Password:** Paste your **Personal Access Token** (the one you just created)

---

## ✅ After Pushing

Once the push completes, you'll see:
- ✅ All 76 files uploaded to GitHub
- ✅ Repository URL: https://github.com/bhardwajaditya113/coding-mafia-institute
- ✅ Ready for Vercel deployment!

---

## 🚀 Step 4: Deploy to Vercel (Next)

After pushing to GitHub:
1. Go to: https://vercel.com
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import `coding-mafia-institute` repository
5. Click "Deploy"
6. Your site will be live in 2-3 minutes!

---

## 🆘 Troubleshooting

### "Authentication failed"
- Make sure you're using the **token**, not your password
- Verify the token has `repo` scope
- Check if token expired

### "Repository not found"
- Verify the repository exists at: https://github.com/bhardwajaditya113/coding-mafia-institute
- Check you're logged into GitHub

### "Remote already exists"
The remote is already configured correctly. Just run:
```bash
git push -u origin main
```

---

**Ready? Create your token and push!** 🚀
