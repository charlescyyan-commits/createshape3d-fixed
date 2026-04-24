# Deploy to Railway

## 1. Prepare

- Register a Railway account: https://railway.app
- (Optional) Register a GitHub account to push code

## 2. Deploy Steps

### Method A: Deploy from GitHub (Recommended)

1. Push this project to a GitHub repository
2. Login Railway dashboard
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect the Dockerfile and deploy

### Method B: Deploy from Local (CLI)

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. In project folder: `railway init`
4. Deploy: `railway up`

## 3. Environment Variables

After deployment, go to Railway Dashboard → Your Project → Variables, add:

```
DATABASE_URL=your-tidb-cloud-url
APP_ID=your-kimi-app-id
APP_SECRET=your-kimi-app-secret
KIMI_AUTH_URL=your-kimi-auth-url
KIMI_OPEN_URL=your-kimi-open-url
```

Copy these from your current `.env` file.

## 4. Domain

Railway will give you a free `.up.railway.app` URL.

To use your own domain:
1. Railway Dashboard → Settings → Domains
2. Add your domain (e.g., createshape3d.com)
3. Follow Railway's DNS instructions

## 5. Persistent Storage for Images (Important!)

By default, uploaded images will be lost when you redeploy.

To keep images persistent:
1. Railway Dashboard → Your Service → Settings → Volumes
2. Add a Volume, mount path: `/app/public/uploads`
3. This ensures uploaded images survive redeployments

Alternative: Use Cloudflare R2 for image storage (contact developer).

## 6. Database Migration

First time deploy, you need to push the database schema:

1. Railway Dashboard → Your Service → Shell
2. Run: `npx tsx -r dotenv/config db/create-pages.ts`
3. This creates the pages table and seed data

Or from local with Railway CLI:
```bash
railway run npx tsx -r dotenv/config db/create-pages.ts
```
