# CORS Issue Solution for Production

## ✅ **CONFIGURATION COMPLETE**

### Your Backend URL: `https://quickbasket-swwy.onrender.com`
### Your Frontend URL: `https://quick-basket-one.vercel.app`

## Issues Identified and Fixed:

### 1. Backend CORS Configuration ✅
- Updated `Backend/app.js` to include more flexible CORS settings
- Added support for environment variable `FRONTEND_URL`
- Added proper error logging for blocked origins
- Included all necessary HTTP methods and headers

### 2. Server Configuration ✅
- Updated `Backend/server.js` to use environment variables for PORT
- Added better error handling and logging

### 3. Environment Variables ✅
- Added `FRONTEND_URL` to `Backend/config/config1.env`
- Updated `Frontend/vercel.json` with environment variable support
- Created `Frontend/.env.local` for development
- Created `Frontend/.env.production` for production

## Current Setup:

### Development Mode:
- **Frontend API URL**: `http://localhost:4000`
- **Backend CORS allows**: `http://localhost:5173`, `http://localhost:3000`, `http://localhost:4173`

### Production Mode:
- **Frontend API URL**: `https://quickbasket-swwy.onrender.com`
- **Backend CORS allows**: `https://quick-basket-one.vercel.app`

## Steps to Deploy:

### Backend Deployment (Render):
1. **Your backend is already deployed** at `https://quickbasket-swwy.onrender.com`
2. **Set environment variables** in your Render dashboard:
   ```
   FRONTEND_URL = https://quick-basket-one.vercel.app
   PORT = 4000 (or Render's default)
   MONGO_URI = your_mongodb_connection_string
   JWT_SECRET = your_jwt_secret
   STRIPE_API_KEY = your_stripe_api_key
   STRIPE_SECRET_KEY = your_stripe_secret_key
   ```

### Frontend Deployment (Vercel):
1. **Set environment variable** in your Vercel dashboard:
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://quickbasket-swwy.onrender.com`

2. **Your `Frontend/vercel.json` is already configured**:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/" }
     ],
     "env": {
       "VITE_API_BASE_URL": "https://quickbasket-swwy.onrender.com"
     }
   }
   ```

## Testing the Fix:

### 1. Test Backend API:
```bash
curl https://quickbasket-swwy.onrender.com/api/v1/products
```

### 2. Test CORS with Frontend Origin:
```bash
curl -H "Origin: https://quick-basket-one.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     https://quickbasket-swwy.onrender.com/api/v1/products
```

### 3. Check Browser Console:
- Open your frontend in browser
- Open Developer Tools > Console
- Look for API calls to `https://quickbasket-swwy.onrender.com`
- Should see no CORS errors

## Environment Files Created:

### `Frontend/.env.local` (Development):
```
VITE_API_BASE_URL=http://localhost:4000
```

### `Frontend/.env.production` (Production):
```
VITE_API_BASE_URL=https://quickbasket-swwy.onrender.com
```

## Common Issues and Solutions:

### Issue: Still getting CORS errors
**Solution**: 
- Make sure your backend is actually running on Render
- Verify the `FRONTEND_URL` in your Render environment variables matches exactly: `https://quick-basket-one.vercel.app`
- Check that your frontend is making requests to `https://quickbasket-swwy.onrender.com`

### Issue: Environment variables not loading
**Solution**:
- Rebuild and redeploy your frontend after setting environment variables in Vercel
- Make sure environment variable name is exactly: `VITE_API_BASE_URL`

### Issue: API calls failing
**Solution**:
- Test your backend URL directly: `https://quickbasket-swwy.onrender.com/api/v1/products`
- Check Render logs for any backend errors
- Ensure your database connection is working

## Final Checklist:

- [x] Backend deployed at `https://quickbasket-swwy.onrender.com`
- [ ] Environment variables set in Render dashboard
- [ ] Frontend environment variables configured in Vercel
- [x] CORS origins updated with your actual frontend domain
- [ ] API endpoints tested and working
- [ ] Frontend rebuilt and redeployed
- [ ] No CORS errors in browser console

## Quick Test Commands:

```bash
# Test backend health
curl https://quickbasket-swwy.onrender.com/api/v1/products

# Test CORS
curl -H "Origin: https://quick-basket-one.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     https://quickbasket-swwy.onrender.com/api/v1/products

# Check environment files
cat Frontend/.env.local
cat Frontend/.env.production
``` 