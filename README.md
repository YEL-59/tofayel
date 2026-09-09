# 🚀 Tofayel Islam — Full-Stack MERN Portfolio & Admin CMS

A high-performance, modern full-stack developer portfolio and content management studio built with **React 18, TypeScript, Tailwind CSS, Framer Motion, Node.js, Express, and MongoDB Atlas**.

---

## 🌟 Live Cloud Deployments

- **Frontend (Vercel)**: [https://tofayel.vercel.app](https://tofayel.vercel.app)
- **Backend API (Render)**: [https://tofayel.onrender.com](https://tofayel.onrender.com)
- **API Health Check**: [https://tofayel.onrender.com/api/health](https://tofayel.onrender.com/api/health)
- **Database**: MongoDB Atlas Cluster (`tofayel.tfdaefn.mongodb.net/portfolio`)

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Radix UI |
| **Backend** | Node.js (v20+), Express.js (ES Modules), Mongoose, Multer, CORS, Morgan |
| **Database** | MongoDB Atlas (Cloud Cluster) |
| **Hosting** | Vercel (Frontend Edge CDN) + Render.com (Backend Web Service) |

---

## 💻 Quickstart: Running on Home PC / New Machine

Follow these exact steps whenever you clone the project on a new computer:

### 1️⃣ Clone the Repository
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd tofayel
```

### 2️⃣ Install All Dependencies (Single Command)
```bash
npm run install:all
```
*(This automatically installs dependencies for both the frontend and the `backend/` folder).*

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the `backend/` folder:

📁 **`backend/.env`**:
```env
# Server Port & Environment
PORT=5000
NODE_ENV=development

# Frontend Client URL (For CORS)
CLIENT_URL=http://localhost:5173

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://tofayeltuhin143_db_user:V2Kpi6vCWZJST51n@tofayel.tfdaefn.mongodb.net/portfolio?retryWrites=true&w=majority&appName=tofayel
```

### 4️⃣ Start the Application

Open two terminal windows in the project root:

**Terminal 1 — Start Backend Server (Port 5000):**
```bash
npm run backend:dev
```

**Terminal 2 — Start Frontend Client (Port 5173):**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

---

## ⚡ Option: Run Frontend with Live Render Backend (Zero Local Backend Needed)

If you don't want to run the local Node server on your home PC, you can connect your local frontend directly to your live deployed Render API:

1. In the project root, create a file named `.env.local`:
   ```env
   VITE_API_URL=https://tofayel.onrender.com/api
   ```
2. Start the frontend:
   ```bash
   npm run dev
   ```
Your local website will fetch real-time data directly from your live cloud database!

---

## 🔐 Admin Studio CMS (`#admin`)

The portfolio includes a protected Admin Studio to manage all content dynamically without touching code:

- **How to Open**:
  - Visit: [http://localhost:5173/#admin](http://localhost:5173/#admin) (or `https://tofayel.vercel.app/#admin` in production)
  - Or click the floating **"Admin CMS"** button at the bottom-left corner of the screen.
- **Secure Credentials**:
  - **Email**: `tofayeltuhin143@gmail.com`
  - **Password**: `12345678`

### Admin Features:
1. **Home & Hero**: Edit greeting, first/last name, headline, bio, status badge, and tech tags.
2. **Projects Showcase**: Full CRUD (Add new projects, edit titles/images/tags, feature, or delete).
3. **Delete Confirmation Modal**: Custom animated dialog replacing standard browser alerts.
4. **CV & Resume**: Upload new PDF/DOCX resume files with automatic public "Download CV" streaming.
5. **Inquiries Inbox**: View and manage visitor contact form inquiries saved to MongoDB Atlas.
6. **Deployment Center**: Live cloud latency and MongoDB connectivity diagnostic tester (`#deploy`).

---

## 📜 Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite frontend development server |
| `npm run install:all` | Installs root dependencies and `backend/` dependencies in one step |
| `npm run backend:dev` | Starts backend with hot-reload (`node --watch`) |
| `npm run backend:seed` | Populates MongoDB Atlas with initial projects and profile data |
| `npm run build` | Validates TypeScript and builds optimized production bundle in `dist/` |
| `npm run preview` | Previews production build locally |

---

## 🌐 Production Cloud Deployment Guide

For complete step-by-step instructions on deploying the backend to **Render.com** and the frontend to **Vercel.com**, check the full guide:
👉 **[`DEPLOYMENT.md`](./DEPLOYMENT.md)**
