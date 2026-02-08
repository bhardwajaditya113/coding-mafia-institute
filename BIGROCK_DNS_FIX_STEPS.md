# BigRock DNS Fix - Step by Step

## 🎯 Goal
Fix "Invalid Configuration" status on Vercel by ensuring DNS records match exactly.

---

## 📋 Current Status

✅ **DNS is resolving correctly:**
- `infinityloop.online` → `216.198.79.1` ✅
- `www.infinityloop.online` → `e9959da8e8787c32.vercel-dns-017.com.` ✅

❌ **But Vercel shows "Invalid Configuration"**

This usually means:
- DNS records are correct but Vercel hasn't verified yet
- OR there's a subtle mismatch we need to fix

---

## 🔧 Step-by-Step Fix at BigRock

### Step 1: Login to BigRock

1. Go to: https://www.bigrock.in/
2. Click: **Login**
3. Enter your credentials
4. Go to: **My Domains** or **Domain Management**

### Step 2: Access DNS Management

1. Find: **infinityloop.online** in your domain list
2. Click: **Manage** or **DNS Settings** or **DNS Management**
3. You should see a list of DNS records

### Step 3: Verify/Add A Record for Root Domain

**What you need:**
- **Type:** A
- **Name/Host:** `@` or leave blank (depends on BigRock interface)
- **Value/IP Address:** `216.198.79.1`
- **TTL:** 3600 (or default)

**Action:**
1. Look for existing A record for root domain (`@` or blank name)
2. If it exists and shows `216.198.79.1` → ✅ Good, leave it
3. If it exists but shows different IP → **Edit** to `216.198.79.1`
4. If it doesn't exist → **Add** new A record with above values
5. **Save**

### Step 4: Fix CNAME for www (IMPORTANT!)

**What you need:**
- **Type:** CNAME
- **Name/Host:** `www` (NOT `www.infinityloop.online`)
- **Value/Target:** `e9959da8e8787c32.vercel-dns-017.com.`
  - ⚠️ Try **with** trailing dot first
  - If BigRock rejects it, try **without** trailing dot
- **TTL:** 3600 (or default)

**CRITICAL: Remove any A record for www!**

1. **First, DELETE any A record for `www`:**
   - Look for A record with name `www` or `www.infinityloop.online`
   - If found → **Delete** it immediately
   - ⚠️ CNAME and A record cannot coexist!

2. **Then, add/edit CNAME:**
   - Look for existing CNAME with name `www`
   - If it exists:
     - **Edit** it
     - Set value to: `e9959da8e8787c32.vercel-dns-017.com.`
     - Save
   - If it doesn't exist:
     - **Add** new CNAME record
     - Name: `www`
     - Value: `e9959da8e8787c32.vercel-dns-017.com.`
     - Save

### Step 5: Verify Final Configuration

**You should have EXACTLY:**

| Type | Name | Value | Status |
|------|------|-------|--------|
| A | `@` or blank | `216.198.79.1` | ✅ |
| CNAME | `www` | `e9959da8e8787c32.vercel-dns-017.com.` | ✅ |

**You should NOT have:**
- ❌ A record for `www`
- ❌ Any other conflicting records
- ❌ Old IP addresses

---

## ⏱️ After Making Changes

### Wait Time:
- **DNS Propagation:** 5-10 minutes
- **Vercel Verification:** 15-30 minutes
- **Total:** 30-60 minutes

### What to Do:

1. **Wait 15 minutes** after making changes

2. **Verify DNS (I can help with this):**
   ```bash
   dig infinityloop.online +short
   dig www.infinityloop.online +short
   ```

3. **Check Vercel Dashboard:**
   - Go to: Settings → Domains
   - **Refresh** the page (Ctrl+F5 or Cmd+Shift+R)
   - Check status

4. **If Still "Invalid Configuration":**
   - Wait another 15-30 minutes
   - Vercel checks DNS periodically
   - Status updates can be delayed

---

## 🆘 Troubleshooting

### Issue 1: BigRock Interface Confusion

**Problem:** Not sure which field is which.

**Solution:**
- **Name/Host:** Usually just `www` (not full domain)
- **Value/Target:** The CNAME target value
- If unsure, take a screenshot and I can help

### Issue 2: Trailing Dot Rejected

**Problem:** BigRock won't accept trailing dot in CNAME.

**Solution:**
- Try **without** trailing dot: `e9959da8e8787c32.vercel-dns-017.com`
- Most DNS providers auto-add trailing dot
- Vercel should accept both formats

### Issue 3: Can't Delete A Record for www

**Problem:** A record exists but can't delete it.

**Solution:**
- Some providers require you to edit it first
- Or contact BigRock support to remove it
- CNAME won't work if A record exists for same name

### Issue 4: Status Still "Invalid" After 1 Hour

**Possible Causes:**
- DNS records not matching exactly
- Vercel cache issue
- Propagation delay

**Solution:**
1. Double-check all records match exactly
2. Use https://dnschecker.org/ to verify globally
3. Contact Vercel support if DNS is correct

---

## ✅ Success Indicators

You'll know it's working when:

1. **Vercel Dashboard:**
   - Status changes to: **"Valid Configuration"** ✅
   - Then: **"Valid Certificate"** ✅

2. **Site Access:**
   - https://infinityloop.online loads ✅
   - https://www.infinityloop.online loads ✅
   - HTTPS padlock shows ✅

3. **DNS Check:**
   - `dig infinityloop.online` → `216.198.79.1` ✅
   - `dig www.infinityloop.online` → `e9959da8e8787c32.vercel-dns-017.com.` ✅

---

## 📞 Need Help?

If you get stuck:
1. Take screenshots of BigRock DNS management page
2. Share what you see
3. I can help identify the issue

---

**Next Steps:**
1. Login to BigRock
2. Follow steps above
3. Wait 15-30 minutes
4. Check Vercel status again

🚀 Your site should go live soon!
