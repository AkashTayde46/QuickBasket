# Environment Setup Guide

## Your Backend URL: `https://quickbasket-swwy.onrender.com`

## Development Mode Setup

### 1. Create Frontend Environment File
Create a file named `.env.local` in your `Frontend/` directory:

```bash
# Frontend/.env.local
VITE_API_BASE_URL=http://localhost:4000
```

### 2. Backend Environment (Already Configured)
Your backend is already configured in `Backend/config/config1.env` with:
```
FRONTEND_URL = https://quick-basket-one.vercel.app
```

## Production Mode Setup

### 1. Vercel Environment Variables
In your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   ```
   Name: VITE_API_BASE_URL
   Value: https://quickbasket-swwy.onrender.com
   Environment: Production
   ```

### 2. Render Environment Variables
In your Render dashboard for the backend:
1. Go to your service settings
2. Navigate to "Environment"
3. Add:
   ```
   Key: FRONTEND_URL
   Value: https://quick-basket-one.vercel.app
   ```

## Testing Your Setup

### Development Testing:
1. Start your backend: `cd Backend && npm start`
2. Start your frontend: `cd Frontend && npm run dev`
3. Check browser console for API calls to `http://localhost:4000`

### Production Testing:
1. Deploy both frontend and backend
2. Check browser console for API calls to `https://quickbasket-swwy.onrender.com`
3. Verify no CORS errors

## Environment File Structure

```
Frontend/
├── .env.local          # Development (gitignored)
├── .env.production     # Production (gitignored)
└── vercel.json         # Vercel config

Backend/
└── config/
    └── config1.env     # Backend environment
```

## Quick Commands

### Create Environment Files:
```bash
# Frontend development
echo "VITE_API_BASE_URL=http://localhost:4000" > Frontend/.env.local

# Frontend production
echo "VITE_API_BASE_URL=https://quickbasket-swwy.onrender.com" > Frontend/.env.production
```

### Test API Connection:
```bash
# Test backend directly
curl https://quickbasket-swwy.onrender.com/api/v1/products

# Test with CORS headers
curl -H "Origin: https://quick-basket-one.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     https://quickbasket-swwy.onrender.com/api/v1/products
```

## Troubleshooting

### If CORS errors persist:
1. Check that your backend is actually running on Render
2. Verify the `FRONTEND_URL` in your Render environment variables
3. Check browser console for the exact error message
4. Ensure your frontend is making requests to the correct URL

### If environment variables aren't loading:
1. Restart your development server after creating `.env.local`
2. Make sure environment variable names start with `VITE_`
3. Check that the files are in the correct location

### If API calls fail:
1. Test your backend URL directly in browser
2. Check Render logs for any backend errors
3. Verify your database connection is working 