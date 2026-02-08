# 🌐 Add Domain: infinityloop.online

## You're on the Right Page! ✅

You're at: **Vercel → Settings → Domains**

---

## Step 1: Add Your Domain

On the Domains page:

1. **Click the "Add Domain" button** (usually at the top)
2. **Enter your domain:** `infinityloop.online`
3. **Click "Add" or "Continue"**

---

## Step 2: Vercel Will Show DNS Configuration

After adding the domain, Vercel will display DNS records you need to add.

### You'll see something like:

**For Root Domain (infinityloop.online):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For WWW (www.infinityloop.online):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**⚠️ Important:** Use the EXACT values Vercel shows you (the IP address may be different)!

---

## Step 3: Add DNS Records at Your Domain Registrar

Go to where you manage `infinityloop.online` DNS:

### Common Domain Registrars:
- **Namecheap:** https://www.namecheap.com/myaccount/login/
- **GoDaddy:** https://sso.godaddy.com/
- **Cloudflare:** https://dash.cloudflare.com/
- **Google Domains:** https://domains.google.com/
- **Others:** Check your email for where you bought the domain

### Add These DNS Records:

**Record 1 - Root Domain:**
```
Type: A
Name: @ (or leave blank, or "infinityloop.online")
Value: [Use the IP from Vercel - copy exactly]
TTL: 3600 (or Auto/Default)
```

**Record 2 - WWW:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto/Default)
```

### Save the DNS records

---

## Step 4: Wait for DNS Propagation

1. **Return to Vercel Domains page**
2. **You'll see domain status:**
   - Initially: "Pending" or "Invalid Configuration"
   - After DNS propagates: "Valid Configuration"
3. **Wait time:** 5-30 minutes (usually 10-15 minutes)
4. **SSL Certificate:** Vercel will automatically provision HTTPS (takes 5-10 minutes after DNS is valid)

---

## Step 5: Verify Domain Status

On the Vercel Domains page, you'll see:

- ✅ **Valid Configuration** - DNS is correct, waiting for SSL
- ✅ **Valid Certificate** - Domain is fully configured and live!
- ⚠️ **Invalid Configuration** - Check DNS records match exactly

---

## Step 6: Test Your Site

Once status shows "Valid Certificate":

1. **Visit:** https://infinityloop.online
2. **Check HTTPS:** Should work automatically
3. **Test pages:**
   - Homepage
   - Courses
   - Login/Signup
   - Contact

---

## 🎯 What You'll See on Vercel

After adding the domain, the page will show:

```
infinityloop.online
Status: Valid Configuration / Valid Certificate
SSL: Automatic (Let's Encrypt)
```

---

## 🆘 Troubleshooting

### "Invalid Configuration"
- Double-check DNS records match Vercel's requirements exactly
- Wait 30 minutes for DNS propagation
- Verify records are saved at your registrar

### "Pending"
- DNS is propagating (normal, wait 5-30 minutes)
- Check back in 15 minutes

### SSL Certificate Taking Time
- Normal - takes 5-10 minutes after DNS is valid
- Vercel provisions automatically
- No action needed

---

## ✅ Quick Checklist

- [ ] Domain added in Vercel: `infinityloop.online`
- [ ] DNS records copied from Vercel
- [ ] DNS records added at domain registrar
- [ ] DNS records saved
- [ ] Waiting for DNS propagation (5-30 min)
- [ ] Status shows "Valid Configuration"
- [ ] SSL certificate active
- [ ] Site accessible at https://infinityloop.online

---

## 📞 Need Help?

- **Vercel Domain Docs:** https://vercel.com/docs/concepts/projects/domains
- **DNS Provider Help:** Check your registrar's documentation
- **Vercel Support:** Available in dashboard

---

**Follow the steps above and your site will be live at https://infinityloop.online!** 🎉
