# [SHOP_NAME] — Furniture Shop Website

A modern, responsive furniture shop catalogue website with a customer-facing
storefront and an admin panel for managing products, categories, gallery
photos and customer enquiries.

## Tech Stack

- **Frontend**: React (Vite), React Router, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Atlas)
- **Image storage**: Cloudinary
- **Hosting**: Vercel (frontend), Render (backend)

## Project Structure
furniture-shop/
├── client/ React frontend (Vite)
├── server/ Express backend API
└── README.md This file


## Features

- Home, Products (search/filter/sort/pagination), Product Details, Categories,
  About, Gallery (with lightbox), Contact (enquiry form + map), 404
- WhatsApp click-to-chat integration throughout (Home, Products, Product
  Details, Categories, Contact, and a floating button on every page)
- Admin panel (`/admin`) — login, dashboard, and full management of
  Products, Categories, Gallery and Enquiries, with Cloudinary image upload
- Fully responsive (phone, tablet, desktop)
- Basic SEO (per-page titles/meta, robots.txt, sitemap.xml)

## Local Development Setup

### Prerequisites
- Node.js 20+
- A MongoDB connection string (Atlas or local)
- A Cloudinary account (cloud name, API key, API secret)

### 1. Clone and install

```bash
git clone <repo-url>
cd furniture-shop

cd client && npm install
cd ../server && npm install
```

### 2. Environment variables

Copy the example files and fill in real values (see
[Environment Variables](#environment-variables) below):

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

### 3. Seed the database (first time only)

```bash
cd server
npm run seed:demo    # optional: sample categories/products for testing
npm run seed:admin   # required: creates the first admin login
```

### 4. Run both servers

In two separate terminals:

```bash
cd server && npm run dev   # http://localhost:5000
cd client && npm run dev   # http://localhost:5173
```

Visit `http://localhost:5173`. Admin panel: `http://localhost:5173/admin/login`.

## Environment Variables

### `server/.env`

| Variable | Description |
|---|---|
| `NODE_ENV` | `development` locally, `production` when deployed |
| `PORT` | Port the API runs on (Render sets this automatically in production) |
| `MONGO_URI` | MongoDB connection string |
| `CLIENT_URL` | The frontend's URL (for CORS). Must match exactly, no trailing slash |
| `JWT_SECRET` | Long random string used to sign admin login tokens. Never share or commit this |
| `JWT_EXPIRES_IN` | How long an admin login session lasts (e.g. `7d`) |
| `CLOUDINARY_CLOUD_NAME` | From the Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | From the Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | From the Cloudinary dashboard. Never share or commit this |

### `client/.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | The backend API's base URL, ending in `/api` |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number in `<countrycode><number>` format, digits only, e.g. `91XXXXXXXXXX` |

**Never commit `.env` files.** Only `.env.example` files (with empty placeholder
values) are tracked in Git.

## Admin Panel

- URL: `/admin/login`
- The first admin account is created via `npm run seed:admin` in the `server`
  folder (interactive prompt, asks for email/name/password). There is no
  public sign-up page, by design, for security.
- Admins can manage:
  - **Products** — add/edit/delete, with up to 6 images each (first image is
    the cover/card image), price, discount price, material, colour,
    dimensions, capacity, warranty, availability status, and a "featured"
    toggle for the homepage
  - **Categories** — add/edit/delete, with an image
  - **Gallery** — add/delete showroom and work photos, organised by category
  - **Enquiries** — view all contact-form submissions, update their status
    (New / Contacted / Closed), and jump straight to Call/WhatsApp/Email

## Content That Still Needs Updating Before Launch

The site currently uses placeholder business information. Before going live,
replace the following (see `client/src/config/siteConfig.js` and
`client/src/data/aboutContent.js`):

- Shop name, address, phone, WhatsApp number, email, business hours
- Google Maps link/embed
- Social media links
- About page story, mission/vision text
- Any experience/customer-count numbers (only if genuinely accurate)

Products, categories and gallery photos do **not** need a code change — the
client can add all of these themselves through the admin panel.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full deployment record and
redeployment steps.

## Support

For bug fixes or content updates within the agreed post-launch support
window, contact [DEVELOPER_NAME] at [DEVELOPER_CONTACT].