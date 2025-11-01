# Stripe Redirect Troubleshooting Guide

## Issues Fixed

### 1. **URL Consistency**
- ✅ Fixed inconsistent trailing slashes
- ✅ Created `getBaseUrl()` helper function for consistency
- ✅ Both success and cancel URLs now use the same base URL format

### 2. **Cancel URL**
- ✅ Changed `cancel_url` from `/donate` to `/cancel` 
- ✅ Now uses the dedicated cancel page for better UX

### 3. **Code Improvements**
- ✅ Centralized URL construction logic
- ✅ Both subscription and one-time payment URLs are consistent

---

## Production Checklist

### 🔴 CRITICAL: Environment Variable

Make sure `NEXT_PUBLIC_SITE_URL` is set correctly in your production environment:

**For Vercel:**
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add/Update: `NEXT_PUBLIC_SITE_URL`
4. Value should be: `https://your-actual-domain.com` (NO trailing slash)
5. Make sure it's set for "Production" environment
6. Redeploy your application

**For other platforms:**
- Set the environment variable in your deployment platform
- Value: `https://your-actual-domain.com` (without trailing slash)
- Example: `https://zee-foundation.vercel.app`

### ⚠️ Stripe Dashboard Configuration

1. **Verify Allowed Redirect URLs:**
   - Go to Stripe Dashboard → Settings → API
   - Check "Redirect URLs" section
   - Ensure your domain is listed:
     - `https://your-domain.com/success`
     - `https://your-domain.com/cancel`
   - If using multiple domains (staging/production), add all of them

2. **Check Webhook Endpoints (Optional but Recommended):**
   - Stripe Dashboard → Developers → Webhooks
   - Ensure webhook endpoint is configured (if you're using webhooks)
   - Endpoint URL: `https://your-domain.com/api/webhooks/stripe`

### 🧪 Testing Steps

1. **Test Success Redirect:**
   - Make a test payment using Stripe test card: `4242 4242 4242 4242`
   - After successful payment, should redirect to: `/success?session_id=cs_test_...`
   - Verify the success page loads correctly

2. **Test Cancel Redirect:**
   - Start a payment
   - Click "Cancel" or close the Stripe checkout
   - Should redirect to: `/cancel`
   - Verify the cancel page loads correctly

3. **Check Browser Console:**
   - Open DevTools → Network tab
   - Look for any failed requests
   - Check Console for errors

4. **Verify URLs in Stripe Dashboard:**
   - Go to Stripe Dashboard → Payments
   - Click on a test payment
   - Check "Success URL" and "Cancel URL" values
   - They should match: `https://your-domain.com/success?...` and `https://your-domain.com/cancel`

---

## Common Issues & Solutions

### Issue 1: "Redirect URLs don't match"
**Cause:** Domain mismatch between environment variable and actual domain  
**Solution:** 
- Verify `NEXT_PUBLIC_SITE_URL` matches your actual production domain
- Check Stripe Dashboard for allowed redirect URLs
- Ensure no trailing slashes or protocol mismatches

### Issue 2: "Page not found after payment"
**Cause:** 
- Environment variable not set
- Wrong domain in URL
- Pages not deployed

**Solution:**
- Set `NEXT_PUBLIC_SITE_URL` correctly
- Verify `/success` and `/cancel` pages exist
- Redeploy after setting environment variable

### Issue 3: "Stays on Stripe checkout page"
**Cause:** 
- JavaScript errors preventing redirect
- Stripe configuration issue
- Network/CORS issues

**Solution:**
- Check browser console for errors
- Verify Stripe test/live mode keys match
- Check network tab for failed requests

### Issue 4: "Works in development but not production"
**Cause:** 
- Environment variable not set in production
- Different domains between dev/prod
- Caching issues

**Solution:**
- Set `NEXT_PUBLIC_SITE_URL` in production environment
- Clear build cache and redeploy
- Verify production build uses correct environment variables

---

## Debugging in Production

### Check Current URLs Being Generated

Add temporary logging to see what URLs are being sent to Stripe:

```javascript
// In src/app/api/checkout/route.js (temporary for debugging)
console.log('Success URL:', successUrl);
console.log('Cancel URL:', cancelUrl);
console.log('Base URL:', baseUrl);
console.log('NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);
```

**Remove logging after debugging!**

### Verify Environment Variable

Add a test endpoint to check:

```javascript
// src/app/api/test-env/route.js (temporary)
export async function GET() {
  return Response.json({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, ''),
  });
}
```

Visit `/api/test-env` to verify the variable is set correctly.

---

## Updated Code Structure

The checkout route now:
1. ✅ Uses consistent `getBaseUrl()` function
2. ✅ Removes trailing slashes automatically
3. ✅ Uses `/cancel` page (not `/donate`)
4. ✅ Consistent across both one-time and subscription flows

---

## Still Having Issues?

1. **Check Stripe Logs:**
   - Stripe Dashboard → Developers → Logs
   - Look for checkout session creation errors

2. **Check Server Logs:**
   - Vercel → Your Project → Functions → Logs
   - Look for errors in checkout API route

3. **Test with Stripe CLI:**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Verify Pages Exist:**
   - Ensure `src/app/success/page.tsx` exists
   - Ensure `src/app/cancel/page.tsx` exists

---

*Last Updated: After fixing redirect URL issues*

