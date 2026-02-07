#!/bin/bash

# Script to push Coding Mafia Institute to GitHub
# Usage: bash PUSH_TO_GITHUB.sh

echo "🚀 Setting up GitHub repository..."
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username is required!"
    exit 1
fi

# Repository name
REPO_NAME="coding-mafia-institute"

echo ""
echo "📋 Next steps:"
echo "1. Go to https://github.com/new"
echo "2. Repository name: $REPO_NAME"
echo "3. Description: World-class coding training institute website"
echo "4. Choose Public or Private"
echo "5. DO NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""
read -p "Press Enter after you've created the repository..."

# Add remote
echo ""
echo "🔗 Adding GitHub remote..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git 2>/dev/null || git remote set-url origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Verify remote
echo ""
echo "✅ Remote configured:"
git remote -v

echo ""
echo "📤 Ready to push!"
echo ""
echo "⚠️  IMPORTANT: Use a Personal Access Token (not your password)"
echo ""
echo "To create a token:"
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Click 'Generate new token (classic)'"
echo "3. Select 'repo' scope"
echo "4. Copy the token"
echo ""
read -p "Press Enter when you have your token ready..."

echo ""
echo "🚀 Pushing to GitHub..."
echo "When prompted for password, paste your Personal Access Token"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 Your repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo "Next step: Deploy to Vercel"
    echo "Go to: https://vercel.com/new"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "1. Repository exists on GitHub"
    echo "2. You're using a Personal Access Token (not password)"
    echo "3. Token has 'repo' scope"
fi
