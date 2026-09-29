# Deployment Record

## Live URLs

- **Website**: https://furniture-shop-neon.vercel.app
- **API**: https://sai-furniture-api.onrender.com

## Hosting Accounts (all owned by the client)

| Service | Purpose | Account |
|---|---|---|
| GitHub | Source code (`furnituresai7/furniture-shop`) | furnituresai7 |
| Vercel | Frontend hosting | furnituresai7 |
| Render | Backend API hosting | furnituresai7 |
| MongoDB Atlas | Database | furnituresai7 |
| Cloudinary | Image storage | furnituresai7 |

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
inactivity. The first request after sleeping takes 30-60 seconds to
respond. This is normal, not a bug — upgrading to a paid Render plan
removes this delay.

## Vercel (Frontend) Configuration

- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **`client/vercel.json`** does two things:
  1. Proxies `/api/*` requests to the Render backend (this keeps the login
     cookie working — browsers can block cross-site cookies between
     different domains, so all API calls are routed through Vercel's own
     domain instead)
  2. Rewrites all other routes to `index.html` so React Router's client-side
     pages (like `/products/some-slug`) work correctly on direct load/refresh
- **Environment variables**: `VITE_API_URL` (`/api`), `VITE_WHATSAPP_NUMBER`
  (set in Vercel's dashboard under Project Settings → Environment Variables)

## MongoDB Atlas Configuration

- **Network Access**: currently `0.0.0.0/0` (allow from anywhere). This is
  necessary because Render's free tier uses dynamic IP addresses. Database
  access is still protected by a strong username/password.

## Redeploying After Code Changes

Both Vercel and Render are connected to the GitHub repository and **redeploy
automatically** whenever changes are pushed to the `main` branch:

```bash
git add .
git commit -m "Describe the change"
git push
```

No manual redeploy steps are needed for routine updates. If a redeploy is
ever needed without a code change (e.g. after editing an environment
variable), use each platform's dashboard: Vercel → Deployments → "..." →
Redeploy, or Render → Manual Deploy.

## Rotating Secrets

If `JWT_SECRET`, the Cloudinary API secret, or the MongoDB password ever
need to be changed (e.g. suspected leak):

1. Generate/obtain the new value
2. Update it in Render's Environment tab (this alone triggers a redeploy)
3. For `JWT_SECRET`: all existing admin login sessions will be invalidated,
   admins will simply need to log in again

## Custom Domain (if the client gets one later)

1. Add the domain in Vercel → Project Settings → Domains, follow Vercel's
   DNS instructions
2. Once it's live, update these two files with the new domain and redeploy:
   - `client/public/robots.txt`
   - `client/public/sitemap.xml`
3. HTTPS/SSL is handled automatically by Vercel once DNS propagates