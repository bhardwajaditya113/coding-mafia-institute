# 🚀 Production Deployment Checklist - Infinity Loop Marketplace

## Pre-Deployment (Week 1)

### 1. Environment & Infrastructure
- [ ] Create production Razorpay account and get live keys
- [ ] Setup PostgreSQL/MongoDB database for purchases
- [ ] Configure AWS S3 or similar for product file storage
- [ ] Setup CDN for fast downloads (CloudFront/Cloudflare)
- [ ] Configure backup system (daily snapshots)
- [ ] Setup monitoring (Sentry, LogRocket, New Relic)
- [ ] Configure email service (SendGrid/AWS SES)
- [ ] Setup Redis cache for product catalog
- [ ] Configure SSL/TLS certificates
- [ ] Setup domain and DNS records

### 2. Security Hardening
- [ ] Enable HTTPS everywhere
- [ ] Setup WAF (Web Application Firewall)
- [ ] Configure CORS headers properly
- [ ] Implement rate limiting on payment endpoints
- [ ] Setup API key management
- [ ] Enable database encryption
- [ ] Implement file encryption for downloads
- [ ] Setup secrets management (AWS Secrets Manager)
- [ ] Configure security headers (CSP, X-Frame-Options, etc.)
- [ ] Implement CSRF protection

### 3. Database Setup
```sql
-- Create tables
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  category VARCHAR(100),
  license_types JSON,
  tech_stack JSON,
  features JSON,
  downloads INT DEFAULT 0,
  rating DECIMAL(3, 1),
  reviews INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_category (category),
  INDEX idx_slug (slug)
);

CREATE TABLE product_purchases (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID NOT NULL,
  payment_id VARCHAR(255) UNIQUE NOT NULL,
  order_id VARCHAR(255) UNIQUE NOT NULL,
  amount DECIMAL(10, 2),
  license_type VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending',
  purchased_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  download_count INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_user_id (user_id),
  INDEX idx_payment_id (payment_id),
  INDEX idx_status (payment_status)
);

CREATE TABLE downloads (
  id UUID PRIMARY KEY,
  product_id UUID NOT NULL,
  purchase_id UUID NOT NULL,
  user_id UUID NOT NULL,
  downloaded_at TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT,
  file_size BIGINT,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (purchase_id) REFERENCES product_purchases(id),
  INDEX idx_product_id (product_id),
  INDEX idx_user_id (user_id)
);

CREATE TABLE payment_logs (
  id UUID PRIMARY KEY,
  payment_id VARCHAR(255),
  order_id VARCHAR(255),
  status VARCHAR(50),
  amount DECIMAL(10, 2),
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_payment_id (payment_id),
  INDEX idx_status (status)
);
```

## Deployment Phase (Week 2)

### 1. Code Deployment
```bash
# Build optimization
npm run build

# Start production server
npm start

# Or use PM2
pm2 start npm --name "infinity-loop" -- start
pm2 save
```

### 2. Environment Variables (Production)
```env
# Razorpay - LIVE KEYS ONLY
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXX_SECRET_MUST_NOT_EXPOSE

# Database
DATABASE_URL=postgresql://user:password@host:5432/infinity_loop

# Redis Cache
REDIS_URL=redis://host:6379

# AWS S3
AWS_ACCESS_KEY_ID=XXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=XXXXXXXXXXXXX
AWS_S3_BUCKET=infinity-loop-products
AWS_REGION=ap-south-1

# Email Service
SENDGRID_API_KEY=SG.XXXXXXXXXXXXX

# Monitoring
SENTRY_DSN=https://XXXXXXXXXXXXX

# Security
JWT_SECRET=XXXXXXXXXXXXX_MUST_BE_LONG_AND_RANDOM

# App Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://infinityloop.in
```

### 3. Vercel Deployment
```bash
# Connect to Vercel
vercel login

# Deploy to production
vercel --prod

# Or setup automatic deployments from GitHub
# Settings → Git → Production Branch → main
```

### 4. Razorpay Webhook Setup
```javascript
// Setup webhook in Razorpay Dashboard
// Settings → Webhooks
// URL: https://infinityloop.in/api/webhooks/razorpay
// Events: payment.authorized, payment.failed, payment.captured

// Webhook handler will:
// 1. Verify webhook signature
// 2. Update order status
// 3. Trigger email notifications
// 4. Generate download links
```

## Post-Deployment (Week 3)

### 1. Testing
- [ ] Test payment flow with test cards
- [ ] Verify email notifications work
- [ ] Test download functionality
- [ ] Check analytics tracking
- [ ] Verify all products load correctly
- [ ] Test search and filters
- [ ] Verify mobile responsiveness
- [ ] Test error handling
- [ ] Check performance with load testing
- [ ] Verify backup and recovery

### 2. Monitoring Setup
```bash
# Monitor application logs
tail -f /var/log/app.log

# Monitor payment errors specifically
grep "payment" /var/log/app.log | grep "error"

# Check database performance
# SELECT * FROM pg_stat_statements ORDER BY mean_time DESC;

# Monitor server resources
# CPU, Memory, Disk usage, Network
```

### 3. Analytics Dashboard
- [ ] Setup Google Analytics 4
- [ ] Track product views
- [ ] Track purchase completion rate
- [ ] Track download success rate
- [ ] Monitor payment failure reasons
- [ ] Track user journey
- [ ] Setup custom events for business metrics

### 4. Customer Support
- [ ] Setup ticket system (Zendesk/Freshdesk)
- [ ] Create FAQ documentation
- [ ] Setup automated email responses
- [ ] Train support team
- [ ] Create refund policy documentation
- [ ] Setup dispute handling process

## Performance Optimization

### 1. Frontend
```javascript
// Next.js production optimizations
- Image optimization with next/image
- Font loading optimization
- Script optimization with async/defer
- Code splitting
- Static site generation where possible
- Incremental static regeneration
- Cache headers setup
```

### 2. Backend
```javascript
// Database optimization
- Enable query caching
- Setup connection pooling
- Optimize indexes
- Archive old logs
- Regular VACUUM and ANALYZE

// API optimization
- Implement response caching
- Gzip compression
- CDN for static assets
- Rate limiting
- Request throttling
```

### 3. Monitoring Queries
```sql
-- Check slow queries
SELECT query, mean_time FROM pg_stat_statements 
ORDER BY mean_time DESC LIMIT 10;

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan 
FROM pg_stat_user_indexes 
ORDER BY idx_scan ASC;

-- Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## Backup & Recovery

### 1. Daily Backup
```bash
# Automated backup script
#!/bin/bash
BACKUP_DIR="/backups/daily"
DB_NAME="infinity_loop"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Backup database
pg_dump $DB_NAME | gzip > $BACKUP_DIR/db_$TIMESTAMP.sql.gz

# Backup S3 data
aws s3 sync s3://infinity-loop-products /backups/s3_$TIMESTAMP

# Keep only last 30 days
find $BACKUP_DIR -mtime +30 -delete

# Upload to archive storage
aws s3 cp $BACKUP_DIR s3://infinity-loop-backups/ --recursive
```

### 2. Recovery Procedure
```bash
# Restore database from backup
gunzip -c /backups/daily/db_TIMESTAMP.sql.gz | psql infinity_loop

# Restore S3 data
aws s3 sync /backups/s3_TIMESTAMP s3://infinity-loop-products

# Verify data integrity
# SELECT COUNT(*) FROM product_purchases;
```

## Monitoring & Alerting

### 1. Key Metrics to Monitor
```javascript
// Payment Metrics
- Payment success rate (target: >95%)
- Average payment processing time
- Failed payment reasons
- Refund rate

// Product Metrics
- Product views per day
- Downloads per product
- Average rating change
- New reviews count

// System Metrics
- API response time (target: <200ms)
- Error rate (target: <0.1%)
- Database query time (target: <100ms)
- Server uptime (target: 99.99%)

// Business Metrics
- Total revenue by day/week/month
- Average order value
- Customer acquisition cost
- Lifetime value per customer
```

### 2. Alert Rules
```
- Payment API error rate > 1% → Alert
- Database query time > 500ms → Alert
- Server CPU > 80% → Alert
- Server memory > 85% → Alert
- Disk usage > 90% → Alert
- Payment processing time > 5s → Alert
- Download failure rate > 5% → Alert
```

## Security Audit Checklist

- [ ] Run OWASP top 10 security check
- [ ] Perform penetration testing
- [ ] Check for SQL injection vulnerabilities
- [ ] Check for XSS vulnerabilities
- [ ] Verify authentication implementation
- [ ] Audit file upload handling
- [ ] Check API rate limiting
- [ ] Verify sensitive data encryption
- [ ] Check for information disclosure
- [ ] Audit access logs for suspicious activity

## Launch Communication

### Week Before Launch
- [ ] Announce marketplace on social media
- [ ] Send email to existing customers
- [ ] Create landing page with product showcase
- [ ] Setup YouTube tutorial videos
- [ ] Create blog posts about products
- [ ] Prepare press releases

### Launch Day
- [ ] Monitor payment flow in real-time
- [ ] Have support team on standby
- [ ] Monitor error rates and performance
- [ ] Send launch announcement email
- [ ] Post on social media
- [ ] Update website homepage

### Post-Launch
- [ ] Monitor customer feedback
- [ ] Collect testimonials
- [ ] Fix reported bugs immediately
- [ ] Optimize based on usage patterns
- [ ] Plan marketing campaigns
- [ ] Schedule follow-up communications

## Rollback Plan

If critical issues occur:
```bash
# 1. Identify issue
# 2. Create database backup
# 3. Revert to previous version
git revert HEAD
npm run build
vercel --prod

# 4. Notify customers
# Send email explaining the issue

# 5. Investigation
# Review logs in Sentry
# Check payment status in Razorpay dashboard
# Verify database integrity

# 6. Deploy fix
# After confirming fix works
git push
vercel --prod
```

## SLAs

- **Availability**: 99.9% uptime
- **Payment Processing**: < 5 seconds
- **Download Speed**: > 10 Mbps
- **Support Response**: < 24 hours
- **Bug Fix**: < 48 hours for critical bugs
- **Data Recovery**: < 1 hour RTO, < 30 minutes RPO

## Success Metrics (First Month)

- [ ] 100+ products purchased
- [ ] ₹5,00,000+ revenue
- [ ] 95%+ payment success rate
- [ ] 4.5+ average rating
- [ ] < 0.1% error rate
- [ ] 99.95%+ uptime
- [ ] < 200ms average response time
