#!/bin/bash
# Setup Razorpay Live Keys for Local Development

echo "🔑 Setting up Razorpay Live API Credentials..."

# Create .env.local file
cat > .env.local << 'ENVFILE'
# Razorpay Live API Credentials
# These are LIVE credentials - keep secure!

# Razorpay Key ID (Public - used in frontend)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_SDwpkGogBOQ7NU

# Razorpay Key Secret (Private - server-side only)
RAZORPAY_KEY_SECRET=uGPKaDIh1fmsJ7Pis7NdmLZX
ENVFILE

echo "✅ Created .env.local file with Razorpay live keys"
echo ""
echo "📋 Next Steps:"
echo "1. Add these same keys to Vercel Environment Variables"
echo "2. See: RAZORPAY_LIVE_KEYS_SETUP.md for detailed instructions"
echo ""
echo "⚠️  Remember: .env.local is gitignored and won't be committed"
