# GitHub Setup Instructions

## ⚠️ Important Security Note

**Never share your GitHub password directly!** Use a Personal Access Token instead.

---

## Step 1: Create GitHub Personal Access Token

1. Go to GitHub.com and sign in
2. Click your profile → **Settings**
3. Scroll down → **Developer settings**
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token (classic)**
6. Give it a name: "Coding Mafia Deployment"
7. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (if using GitHub Actions)
8. Click **Generate token**
9. **Copy the token immediately** (you won't see it again!)

---

## Step 2: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `coding-mafia-institute`
3. Description: "World-class coding training institute website"
4. Choose: **Public** or **Private**
5. **Don't** initialize with README, .gitignore, or license
6. Click **Create repository**

---

## Step 3: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
cd "/home/labs/Desktop/Coding Mafia"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/coding-mafia-institute.git

# Push to GitHub (use your token as password when prompted)
git branch -M main
git push -u origin main
```

**When prompted for password:** Use your **Personal Access Token** (not your GitHub password)

---

## Alternative: Use SSH (More Secure)

### Generate SSH Key:
```bash
ssh-keygen -t ed25519 -C "bhardwajaditya113@gmail.com"
# Press Enter to accept default location
# Enter a passphrase (optional but recommended)
```

### Add SSH Key to GitHub:
1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. Go to GitHub → Settings → SSH and GPG keys
3. Click "New SSH key"
4. Paste your public key
5. Click "Add SSH key"

### Use SSH URL:
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/coding-mafia-institute.git
git push -u origin main
```

---

## Quick Commands

```bash
# Check git status
git status

# See what will be committed
git status

# Add all files
git add .

# Commit
git commit -m "Your message"

# Push
git push origin main
```

---

## Need Help?

- GitHub Docs: https://docs.github.com
- Git Tutorial: https://git-scm.com/docs
