# 🌐 BigRock DNS Setup for infinityloop.online

## Step-by-Step Guide for BigRock

---

## 📋 DNS Records to Add

### Record 1 - Root Domain (infinityloop.online):
```
Type: A
Name: @ (or leave blank)
Value: 216.198.79.1
TTL: 3600
```

### Record 2 - WWW (www.infinityloop.online):
```
Type: CNAME
Name: www
Value: e9959da8e8787c32.vercel-dns-017.com.
TTL: 3600
```

---

## 🚀 Step-by-Step: Add DNS in BigRock

### Step 1: Login to BigRock

1. **Go to:** https://www.bigrock.in/
2. **Click:** "Login" (top right)
3. **Enter:** Your BigRock username/email and password
4. **Click:** "Sign In"

### Step 2: Access DNS Management

1. **After login, go to:** "My Account" or "Domain Manager"
2. **Find:** `infinityloop.online` in your domain list
3. **Click:** "Manage" or the domain name
4. **Look for:** "DNS Management" or "DNS Settings" tab
5. **Click:** "DNS Management" or "Advanced DNS"

### Step 3: Add A Record (Root Domain)

1. **Click:** "Add Record" or "+" button
2. **Select Type:** Choose "A" from dropdown
3. **Host/Name:**
   - Enter `@` OR
   - Leave blank OR
   - Enter `infinityloop.online`
4. **Points To/Value:** Enter `216.198.79.1`
5. **TTL:** Enter `3600` (or leave default)
6. **Click:** "Save" or "Add Record"

### Step 4: Add CNAME Record (WWW)

1. **Click:** "Add Record" or "+" button again
2. **Select Type:** Choose "CNAME" from dropdown
3. **Host/Name:** Enter `www`
4. **Points To/Value:** Enter `e9959da8e8787c32.vercel-dns-017.com.`
   - **⚠️ Important:** Include the trailing dot (.)
5. **TTL:** Enter `3600` (or leave default)
6. **Click:** "Save" or "Add Record"

### Step 5: Verify Records

After adding, you should see in your DNS records list:

```
Type    Host    Points To/Value
A       @       216.198.79.1
CNAME   www      e9959da8e8787c32.vercel-dns-017.com.
```

---

## ⏳ Step 6: Wait for DNS Propagation

1. **Return to Vercel:** 
   - Go to: https://vercel.com/aditya-bhardwajs-projects-6c3eb06f/coding-mafia-institute/settings/domains
2. **Refresh the page** periodically
3. **Status will change:**
   - Current: "Invalid Configuration" ❌
   - After 10-15 min: "Valid Configuration" ✅
   - After 5-10 more min: "Valid Certificate" ✅ (SSL)

---

## 🎯 BigRock Interface Tips

### If you see "Name Servers" instead of DNS:
- BigRock might be using default name servers
- You may need to use BigRock's DNS management
- Look for "DNS Zone Editor" or "DNS Records"

### If records already exist:
- You may need to **edit** existing records
- Or **delete** old records and add new ones
- Make sure no conflicting records exist

### Common BigRock Locations:
- **My Account** → **Domain Manager** → **DNS Management**
- **My Products** → **Domains** → **Manage DNS**
- **Domain Settings** → **DNS Records**

---

## ✅ Verification Checklist

- [ ] Logged into BigRock account
- [ ] Found DNS Management for infinityloop.online
- [ ] Added A record: `@` → `216.198.79.1`
- [ ] Added CNAME record: `www` → `e9959da8e8787c32.vercel-dns-017.com.`
- [ ] Both records saved successfully
- [ ] Records visible in DNS list
- [ ] Waiting 10-15 minutes for propagation
- [ ] Checked Vercel status page

---

## 🆘 Troubleshooting for BigRock

### Can't Find DNS Management

1. **Try:** My Account → Domain Manager → Manage
2. **Look for:** "DNS", "DNS Zone", "DNS Records"
3. **Contact:** BigRock support if needed

### Records Not Saving

1. **Check:** All fields are filled correctly
2. **Verify:** No typos in values
3. **Try:** Refresh page and add again
4. **Check:** TTL value is valid (3600 or default)

### Still "Invalid Configuration" After 30 Minutes

1. **Verify records in BigRock:**
   - Records are visible
   - Values match exactly
   - No typos

2. **Check DNS propagation:**
   - Use: https://dnschecker.org/
   - Search: `infinityloop.online`
   - Should show: `216.198.79.1`

3. **Contact BigRock support** if issues persist

---

## 📞 BigRock Support

If you need help:
- **Support:** https://www.bigrock.in/support/
- **Live Chat:** Available in BigRock dashboard
- **Phone:** Check BigRock website for support number

---

## 🎉 After DNS is Configured

Once Vercel shows "Valid Certificate":

1. **Visit:** https://infinityloop.online
2. **Test:** All pages should work
3. **HTTPS:** Automatic and secure
4. **WWW:** https://www.infinityloop.online also works

---

## 📋 Quick Reference

**Exact Values:**
- A Record: `@` → `216.198.79.1`
- CNAME: `www` → `e9959da8e8787c32.vercel-dns-017.com.`

**BigRock Path:**
- Login → My Account → Domain Manager → DNS Management

**Wait Time:**
- 10-15 minutes for DNS propagation
- 5-10 more minutes for SSL certificate

---

**Add these records in BigRock and wait 10-15 minutes. Your site will be live!** 🚀
