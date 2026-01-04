# Deployment Guide for AmplifAI Playlist Generator

This guide will walk you through deploying your MERN stack application to **Vercel**. Since you have separate `Server` and `Client` directories, we will deploy them as two separate Vercel projects.

## Prerequisites

1.  **GitHub Account**: Ensure your project is pushed to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3.  **MongoDB Atlas**: You already have your database set up.

---

## Part 1: Deploying the Server

The Server handles the API logic and database connection.

1.  **Push to GitHub**:
    *   Make sure all your latest changes (including the `vercel.json` and `index.js` edits I made) are committed and pushed to your GitHub repository.

2.  **Import Project in Vercel**:
    *   Go to your Vercel Dashboard and click **"Add New..."** -> **"Project"**.
    *   Import your `AmplifAI-PlaylistGenerator` repository.

3.  **Configure Project**:
    *   **Project Name**: e.g., `amplifai-server`.
    *   **Root Directory**: Click "Edit" and select `Server`.
    *   **Framework Preset**: It should verify as "Other" or automatically detect Node.js. "Other" is fine as `vercel.json` handles the build.
    *   **Environment Variables**:
        *   Expand the "Environment Variables" section.
        *   Add `MONGODB_PASSWORD` with your actual password (verify valid characters).
        *   (Optional) If you have `MONGODB_URI` or others, add them too. Your code currently constructs the URI in `db.js` using the password.

4.  **Deploy**:
    *   Click **"Deploy"**.
    *   Wait for the build to complete.
    *   Once finished, you will get a **Domain** (e.g., `https://amplifai-server-xyz.vercel.app`). **Copy this URL.**

5.  **Test**:
    *   Visit `https://amplifai-server-xyz.vercel.app`. You should see the response from your root route (if any) or a 404/Cannot GET /, which is expected if you don't have a root listener. But the server is running.

---

## Part 2: Configuring and Deploying the Client

The Client is your React frontend.

1.  **Update Client Configuration**:
    *   In your local project, open `Client/vercel.json`.
    *   Replace `REPLACE_WITH_YOUR_SERVER_URL` with the **Server Domain** you just copied (ensure straight quotes `"`).
    *   **Example**:
        ```json
        { "source": "/findSongs", "destination": "https://amplifai-server-xyz.vercel.app/findSongs" }
        ```
    *   Save, Commit, and Push this change to GitHub.

2.  **Import Project in Vercel**:
    *   Go to Dashboard -> **"Add New..."** -> **"Project"**.
    *   Import the **same repository** again.

3.  **Configure Project**:
    *   **Project Name**: e.g., `amplifai-client`.
    *   **Root Directory**: Click "Edit" and select `Client`.
    *   **Framework Preset**: Vercel should automatically detect **Create React App**. If not, select it.
    *   **Environment Variables**:
        *   Add any React-specific env vars if you have them (e.g., `REACT_APP_FIREBASE_KEY`). From your code, it looks like Firebase config is hardcoded in `config.js` or uses `process.env`. Check `Client/.env` if you have one locally and replicate variables here.

4.  **Deploy**:
    *   Click **"Deploy"**.
    *   Vercel will build your React app.

5.  **Verify**:
    *   Visit your Client URL.
    *   Try logging in or searching for a song. The `vercel.json` rewrites will automatically proxy your API requests to your Server.

---

## Troubleshooting

-   **Server Logs**: If API calls fail, check the "Logs" tab of your **Server** project in Vercel.
-   **CORS**: Your Server `init.js` uses `app.use(cors())`. This is good. It allows requests from any origin by default. For production, strictly simple CORS is usually fine, but if you run into issues, you might need to specify the Client origin.
-   **Environment Variables**: Double-check `MONGODB_PASSWORD` in the Server project settings.
