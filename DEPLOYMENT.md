# 🚀 Deployment Guide: Tofayel Portfolio (MERN Stack)

This guide provides step-by-step instructions to deploy your portfolio frontend and backend to production for **100% free** using **Render** and **Vercel**.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                       Architecture                          │
├─────────────────┬───────────────────┬───────────────────────┤
│    Frontend     │      Backend      │       Database        │
│   (React+Vite)  │  (Node + Express) │    (MongoDB Atlas)    │
│  Hosted: Vercel │   Hosted: Render  │ Hosted: MongoDB Cloud │
└─────────────────┴───────────────────┴───────────────────────┘
```

---

## 📋 Prerequisites Checklist

Before you begin, ensure you have:
- [x] A **GitHub Account** (to push your code repository)
- [x] A **MongoDB Atlas Account** *(Database is already set up and seeded)*
- [ ] A free account on [Render.com](https://render.com) (for Backend API)
- [ ] A free account on [Vercel.com](https://vercel.com) (for Frontend)

---

## 1️⃣ Step 1: Commit and Push Code to GitHub

Open your terminal in the project root directory and run:

```bash
git add .
git commit -m "feat: complete MERN portfolio ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```
*(If you already have a remote repository configured, just `git push origin main`)*.

---

## 2️⃣ Step 2: Deploy Backend to [Render.com](https://render.com)

Render provides a generous free tier for Node.js web services.

1. Go to [https://dashboard.render.com](https://dashboard.render.com) and log in with your GitHub account.
2. Click the **"New +"** button at the top and select **"Web Service"**.
3. Choose your portfolio repository from the list and click **Connect**.
4. Configure the Web Service settings:

| Setting | Value |
| :--- | :--- |
| **Name** | `tofayel-portfolio-api` (or any unique name) |
| **Region** | Singapore or Frankfurt (choose nearest to you) |
| **Branch** | `main` |
| **Root Directory** | `backend` *(⚠️ Critical: must be set to `backend`)* |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

5. Scroll down to **Environment Variables** and add the following:

| Key | Value | Notes |
| :--- | :--- | :--- |
| `MONGODB_URI` | `mongodb+srv://tofayeltuhin143_db_user:V2Kpi6vCWZJST51n@tofayel.tfdaefn.mongodb.net/portfolio?retryWrites=true&w=majority&appName=tofayel` | Your Atlas database connection string |
| `NODE_ENV` | `production` | Enables production optimizations |
| `CLIENT_URL` | `*` | Or specify your frontend URL once generated |

6. Click **"Create Web Service"**.
7. Render will build and deploy the backend. Once finished, Render will display your live URL, e.g.:
   `https://tofayel-portfolio-api.onrender.com`

### 🩺 Verify Backend Health:
Visit in your browser:
```text
https://YOUR-BACKEND-NAME.onrender.com/api/health
```
You should see:
```json
{
  "status": "online",
  "database": {
    "connected": true,
    "status": "Connected to MongoDB"
  },
  "service": "Tofayel Portfolio MERN Backend API"
}
```

---

## 3️⃣ Step 3: Deploy Frontend to [Vercel.com](https://vercel.com)

Vercel provides blazing-fast global edge hosting for Vite/React applications.

1. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **"Add New..."** → **"Project"**.
3. Locate your portfolio repository and click **"Import"**.
4. Configure the Project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Expand the **"Environment Variables"** dropdown and add:

| Key | Value |
| :--- | :--- |
| `VITE_API_URL` | `https://YOUR-BACKEND-NAME.onrender.com/api` *(Your Render URL + `/api`)* |

6. Click **"Deploy"**.
7. In approximately 30-45 seconds, Vercel will complete the build and assign your production domain:
   `https://tofayel.vercel.app` (or custom subdomain).

---

## 4️⃣ Step 4: Final Connection (CORS Update)

1. Return to your [Render.com Dashboard](https://dashboard.render.com).
2. Select your `tofayel-portfolio-api` service → **Environment**.
3. Update `CLIENT_URL` to your exact Vercel URL:
   ```text
   CLIENT_URL=https://tofayel.vercel.app
   ```
   *(Note: The backend CORS also automatically permits `*.vercel.app` domains).*
4. Click **Save Changes** (Render will automatically redeploy).

---

## 🛡️ Accessing Admin CMS in Production

Once deployed to your production domain:
1. Navigate to:
   ```text
   https://tofayel.vercel.app/#admin
   ```
   or click the floating **"Admin CMS"** button at the bottom-left of your portfolio.
2. Open the **"Deployment"** page directly at:
   ```text
   https://tofayel.vercel.app/#deploy
   ```
3. Test CV uploading, dynamic hero edits, and project updates — changes persist directly in MongoDB Atlas and reflect instantly on the live site!

---

## ❓ Troubleshooting & FAQs

### 1. Render Free Tier Cold Starts
- **Behavior**: On Render's free tier, inactive services spin down after 15 minutes of inactivity. The first request after sleep may take ~30-50 seconds to wake up.
- **Solution**: The frontend includes built-in offline fallback caching and timeout guards, so your portfolio displays content immediately even while Render wakes up.
- **Keep-alive Trick**: You can use a free pinging service like [UptimeRobot](https://uptimerobot.com/) to ping `https://YOUR-BACKEND-NAME.onrender.com/api/health` every 10 minutes to prevent sleep.

### 2. MongoDB Atlas Network Access
- If Render backend fails to connect to MongoDB, ensure Atlas allows connections:
  1. Open [MongoDB Atlas](https://cloud.mongodb.com).
  2. Go to **Network Access** under Security.
  3. Ensure IP `0.0.0.0/0` (Allow Access from Anywhere) is active.

### 3. Direct Route 404s
- A pre-configured `vercel.json` is already present in your project root to handle SPA rewrites. Deep links and hash routes (`#admin`, `#deploy`) work seamlessly out of the box.
