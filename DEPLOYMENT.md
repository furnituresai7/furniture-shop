# Deployment Record

## Live URLs

- **Website**: [VERCEL_URL or custom domain]
- **API**: [RENDER_URL]

## Hosting Accounts (all owned by the client)

| Service | Purpose | Account email |
|---|---|---|
| GitHub | Source code (`furnituresai7/furniture-shop`) | [CLIENT_EMAIL] |
| Vercel | Frontend hosting | [CLIENT_EMAIL] |
| Render | Backend API hosting | [CLIENT_EMAIL] |
| MongoDB Atlas | Database | [CLIENT_EMAIL] |
| Cloudinary | Image storage | [CLIENT_EMAIL] |

The developer holds **collaborator/developer access only** on these
accounts, not ownership. Access can be revoked by the client at any time
without affecting the live site.

## Render (Backend) Configuration

- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment variables**: see `server/.env.example` for the full list;
  actual values are set in Render's dashboard under the service's
  **Environment** tab, never committed to Git

**Known limitation (free tier)**: the backend sleeps after 15 minutes of
inactivity. The first request after sleeping takes 30-60 seconds. Upgrading
to a paid Render plan removes this delay.

## Vercel (Frontend) Configuration

- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment variables**: `VITE_API_URL`, `VITE_WHATSAPP_NUMBER` (set in
  Vercel's dashboard under Project Settings → Environment Variables)

## MongoDB Atlas Configuration

- **Network Access**: currently `0.0.0.0/0` (allow from anywhere). This is
  necessary because Render's free tier uses dynamic IP addresses. Database
  access is still protected by a strong username/password.
- **Database user**: [ATLAS_DB_USERNAME] (password stored securely, not in
  this file or in Git)

## Redeploying After Code Changes

Both Vercel and Render are connected to the GitHub repository and **redeploy
automatically** whenever changes are pushed to the `main` branch:

```bash
git add .
git commit -m "Describe the change"
git push
```

No manual redeploy steps are needed for routine updates.

## Rotating Secrets

If `JWT_SECRET`, the Cloudinary API secret, or the MongoDB password ever
need to be changed (e.g. suspected leak):

1. Generate/obtain the new value
2. Update it in Render's Environment tab (this alone triggers a redeploy)
3. For `JWT_SECRET`: all existing admin login sessions will be invalidated,
   admins will simply need to log in again

## Custom Domain (if applicable)

- Domain: [DOMAIN_NAME]
- Registrar: [REGISTRAR]
- DNS configured to point to Vercel per Vercel's domain setup instructions
- SSL/HTTPS: handled automatically by Vercel once DNS propagates