# 🌐 Exact DNS Records for infinityloop.online

## ✅ DNS Configuration from Vercel

Here are the **exact DNS records** you need to add at your domain registrar:

---

## 📋 DNS Records to Add

### Record 1 - Root Domain (infinityloop.online):

```
Type: A
Name: @ (or leave blank, or "infinityloop.online")
Value: 216.198.79.1
TTL: 3600 (or Auto/Default)
```

### Record 2 - WWW (www.infinityloop.online):

```
Type: CNAME
Name: www
Value: e9959da8e8787c32.vercel-dns-017.com.
TTL: 3600 (or Auto/Default)
```

**⚠️ Important:** 
- Use the EXACT values above
- Include the trailing dot (.) in the CNAME value
- The IP address is: `216.198.79.1`

---

## 🌐 Step-by-Step: Add DNS at Your Registrar

### Step 1: Login to Your Domain Registrar

Go to where you manage `infinityloop.online`:

**Common Registrars:**
- **Namecheap:** https://www.namecheap.com/myaccount/login/
- **GoDaddy:** https://sso.godaddy.com/
- **Cloudflare:** https://dash.cloudflare.com/
- **Google Domains:** https://domains.google.com/
- **Others:** Check your email for where you bought the domain

### Step 2: Find DNS Management

Look for:
- "DNS Management"
- "DNS Settings"
- "Advanced DNS"
- "DNS Records"
- "Name Servers" or "DNS"

### Step 3: Add Record 1 (A Record)

1. Click "Add Record" or "+"
2. Select **Type: A**
3. **Name/Host:** Enter `@` (or leave blank, or "infinityloop.online")
4. **Value/Points to:** Enter `216.198.79.1`
5. **TTL:** 3600 (or Auto/Default)
6. **Save**

### Step 4: Add Record 2 (CNAME Record)

1. Click "Add Record" or "+"
2. Select **Type: CNAME**
3. **Name/Host:** Enter `www`
4. **Value/Points to:** Enter `e9959da8e8787c32.vercel-dns-017.com.` (with the dot at the end)
5. **TTL:** 3600 (or Auto/Default)
6. **Save**

### Step 5: Verify Records

After adding, you should see:
- ✅ A record: `@` → `216.198.79.1`
- ✅ CNAME record: `www` → `e9959da8e8787c32.vercel-dns-017.com.`

---

## ⏳ Step 6: Wait for DNS Propagation

1. **Return to Vercel:** https://vercel.com/aditya-bhardwajs-projects-6c3eb06f/coding-mafia-institute/settings/domains
2. **Status will change:**
   - Current: "Invalid Configuration" ❌
   - After 10-15 min: "Valid Configuration" ✅
   - After 5-10 more min: "Valid Certificate" ✅ (SSL)
3. **Refresh the page** periodically to check

---

## ✅ What You'll See

**Before DNS:**
```
infinityloop.online
Status: Invalid Configuration ❌
```

**After DNS propagates (10-15 minutes):**
```
infinityloop.online
Status: Valid Configuration ✅
SSL: Provisioning...
```

**After SSL (5-10 more minutes):**
```
infinityloop.online
Status: Valid Certificate ✅
SSL: Automatic (Let's Encrypt) ✅
```

---

## 🎯 Quick Reference

**Exact Values to Use:**

| Type | Name | Value |
|------|------|-------|
| A | @ | 216.198.79.1 |
| CNAME | www | e9959da8e8787c32.vercel-dns-017.com. |

---

## 🆘 Troubleshooting

### Still "Invalid Configuration" After 30 Minutes?

1. **Double-check values:**
   - A record: `216.198.79.1` (exact)
   - CNAME: `e9959da8e8787c32.vercel-dns-017.com.` (with trailing dot)

2. **Verify at registrar:**
   - Records are saved
   - No typos
   - TTL is set (3600 or Auto)

3. **Check DNS propagation:**
   - Use: https://dnschecker.org/
   - Search: `infinityloop.online`
   - Should show: `216.198.79.1`

### CNAME Value Issues

- Make sure to include the trailing dot (.)
- Some registrars add it automatically, some don't
- If it doesn't work, try without the dot

---

## 📞 Need Help?

**Vercel Support:**
- Vercel Dashboard → Help
- Docs: https://vercel.com/docs/concepts/projects/domains

**DNS Provider:**
- Check your registrar's documentation
- Look for "How to add DNS records"

---

## 🎉 After DNS is Configured

Once status shows "Valid Certificate":

1. **Visit:** https://infinityloop.online
2. **Test:** All pages should work
3. **HTTPS:** Automatic and secure
4. **WWW:** https://www.infinityloop.online also works

---

**Add these exact DNS records and wait 10-15 minutes. Your site will be live!** 🚀
