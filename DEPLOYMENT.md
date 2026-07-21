# Deployment Guide

This project is ready for deployment with:
- MongoDB Atlas for the database
- Render for backend hosting
- Vercel for frontend hosting
- Cloudinary for image hosting
- Uptime Robot for backend availability checks

## Required env files

### `server/.env`
Create this locally and in Render environment variables:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### `client/.env`
Create this locally and in Vercel environment variables:
```env
VITE_API_URL=https://your-backend.onrender.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## Backend

1. Deploy the `server/` directory to Render.
2. Set these Render environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `FRONTEND_URL`
   - optional Cloudinary values
3. Ensure the backend service starts with `npm start` and uses Node 20+.

## Frontend

1. Deploy the `client/` directory to Vercel.
2. Set this Vercel environment variable:
   - `VITE_API_URL=https://your-backend.onrender.com/api`
3. Build command: `npm install && npm run build`
4. Output directory: `dist`

## MongoDB Atlas

1. Create a free Atlas cluster.
2. Add an Atlas database user.
3. Add your IP address or allow access from Render if needed.
4. Use the URI in `MONGO_URI`.

## Cloudinary

- You can host all image URLs in Cloudinary.
- Paste the Cloudinary image URL into the product upload form.
- If you later add direct upload support, use the Cloudinary environment variables.

## Uptime Robot

- Create a new monitor that pings:
  `https://your-backend.onrender.com/api/health`
- This keeps the Render backend from idling and tracks uptime.

## Notes

- Do not commit actual `.env` files.
- Use the `.env.example` files as templates.
- `server/.env` is local-only and should remain private.
