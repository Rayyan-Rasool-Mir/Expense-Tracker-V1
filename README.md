# RupeeFlow — Personal Finance Tracker

**Know where your money flows.**

RupeeFlow is a full-stack personal finance tracker for recording income and expenses, reviewing account-level summaries, and visualizing recent financial activity. It was built as a hands-on project to practise developing and deploying a MERN application.

<p align="left">
  <a href="https://rupee-flow-amber.vercel.app/"><strong>Live Demo</strong></a> ·
  <a href="https://github.com/Rayyan-Rasool-Mir/RupeeFlow"><strong>Source Code</strong></a>
</p>

> **Project status:** Deployed learning project. Please use sample data for demos; this is not a financial institution or a substitute for audited financial software.

## Features

- **Account access:** Sign up and log in with JWT-based authentication.
- **Personal dashboard:** View total balance, income, expenses, recent transactions, and financial summaries.
- **Income tracking:** Add, view, and delete income records with a source, amount, date, and optional icon.
- **Expense tracking:** Add, view, and delete expense records with a category, amount, date, and optional icon.
- **Visual analytics:** Charts for income and expense trends.
- **Spreadsheet reports:** Backend endpoints for exporting income and expense records to Excel.
- **Profile image upload:** Upload a JPG/JPEG or PNG image.
- **Responsive interface:** React UI styled with Tailwind CSS.
- **Indian rupee formatting:** Amounts are displayed using the ₹ symbol and Indian-style digit grouping.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, Tailwind CSS, React Router |
| Charts & UI | Recharts, React Icons, React Hot Toast, Emoji Picker |
| API requests | Axios |
| Backend | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| File uploads | Multer |
| Reports | `xlsx` |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

## Architecture

```text
Browser
  │
  ▼
React + Vite frontend (Vercel)
  │  HTTPS / JSON API requests
  ▼
Express REST API (Render)
  │
  ▼
MongoDB Atlas
```

The frontend communicates with the backend using the API base URL configured in `VITE_API_URL`. Protected endpoints use a bearer token for authentication.

## Getting Started Locally

### Prerequisites

- Node.js and npm
- A MongoDB Atlas cluster or local MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Rayyan-Rasool-Mir/RupeeFlow.git
cd RupeeFlow
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `backend/.env` file:

```dotenv
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Use your own database connection string and a strong, private JWT secret. Never commit `.env` files or share their contents.

Start the backend in development mode:

```bash
npm run dev
```

The backend should be available at `http://localhost:8000` when `PORT=8000` is set.

### 3. Configure the frontend

Open a second terminal at the repository root:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```dotenv
VITE_API_URL=http://localhost:8000
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Environment variables in deployment

**Render backend**

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWTs |
| `CLIENT_URL` | Exact frontend origin permitted by CORS, e.g. `https://your-production-domain.vercel.app` |
| `PORT` | Render provides this automatically; the app also has a local fallback |

**Vercel frontend**

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Base URL of the deployed backend, e.g. `https://your-backend.onrender.com` |

Variables prefixed with `VITE_` are included in client-side code and must never contain secrets. After changing frontend environment variables, redeploy the Vercel frontend.

## API Overview

All API routes are prefixed with `/api/v1`. Routes marked **Protected** require a valid JWT bearer token.

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| `POST` | `/auth/register` | Register an account | Public |
| `POST` | `/auth/login` | Log in | Public |
| `GET` | `/auth/getUser` | Get the current user's profile | Protected |
| `GET` | `/dashboard` | Get dashboard totals and recent activity | Protected |
| `POST` | `/income/add` | Add income | Protected |
| `GET` | `/income/get` | List income records | Protected |
| `DELETE` | `/income/:id` | Delete an income record | Protected |
| `GET` | `/income/downloadexcel` | Download income report | Protected |
| `POST` | `/expense/add` | Add an expense | Protected |
| `GET` | `/expense/get` | List expenses | Protected |
| `DELETE` | `/expense/:id` | Delete an expense | Protected |
| `GET` | `/expense/downloadexcel` | Download expense report | Protected |

## Project Structure

```text
RupeeFlow/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # API request handlers
│   ├── middleware/     # Authentication and upload middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # Express API routes
│   └── server.js       # Express app entry point
└── frontend/
    └── src/
        ├── Components/ # Dashboard, charts, forms, and layouts
        ├── context/    # User context
        ├── hooks/      # Authentication hook
        ├── pages/      # Login, signup, dashboard, income, expenses
        └── utils/      # API paths, Axios instance, helpers
```

## Current Limitations & Next Steps

- Move uploaded profile images to persistent object storage before relying on them in production; local files on a hosted service may not survive restarts or redeployments.
- Add automated tests for authentication, transaction ownership, and report downloads.
- Strengthen request validation and error handling.
- Add transaction editing, search/filtering, pagination, and budget goals.
- Add screenshots and a short demo video to the repository.

## Security Note

RupeeFlow is an educational portfolio project. Before using it with real or sensitive financial information, review and harden authorization checks, API response fields, input validation, upload storage, and dependency security. Keep all database credentials and signing secrets private.

## Author

Built as a full-stack web development project. Feedback and suggestions are welcome through GitHub Issues.
