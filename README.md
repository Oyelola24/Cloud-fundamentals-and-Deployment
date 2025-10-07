# MERN App — Azure Deployment Checkpoint

This repository contains a minimal MERN-style application specifically prepared for deployment to Microsoft Azure Web Apps. It uses MongoDB Atlas for database hosting. The code is intentionally small and commented so you can follow each step.

What you'll find here
- `server/` — Express backend, connects to MongoDB and serves static frontend from `server/public`.
- `client/` — Minimal static frontend. Run `npm run build` in `client` to copy files into `server/public`.
- `.env.example` — Example environment variables for the server.

Prerequisites
- Node.js (>=14)
- An Azure account (https://portal.azure.com)
- A MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)

High-level steps (strictly following the assignment instructions)
1. Prepare the MERN application locally
   - Install server dependencies: open PowerShell, run `npm install` inside `server`.
   - Build the client (production): run `npm run build` inside `client`. This copies the static files into `server/public`.

2. Create a MongoDB Atlas cluster
   - Sign up / sign in to MongoDB Atlas.
   - Create a free/shared cluster.
   - Create a database user and whitelist your IP (or allow access from anywhere for testing).
   - Obtain the connection string (it will look like `mongodb+srv://<user>:<password>@cluster0.../<dbname>?retryWrites=true&w=majority`).

3. Create an Azure Web App
   - In the Azure Portal, click "Create a resource" > "Web" > "Web App".
   - Choose a unique app name, resource group, runtime stack: Node 16/18 (LTS), region and pricing tier.

4. Set up deployment source
   - Option A: Deployment Center -> GitHub. Connect your repository and branch, Azure will build and deploy.
   - Option B: Deployment Center -> Local Git. Azure gives you a Git URL. Add it as a remote and push.

5. Deploy the app using Local Git (example)

   a) From your local project root, initialize git if needed:

```powershell
git init
git add .
git commit -m "Initial commit - MERN Azure checkpoint"
```

   b) In Azure Portal > your Web App > Deployment Center > Local Git, get the Git remote URL.

```powershell
# Add the Azure remote (replace the URL below with the one from your Azure Web App)
git remote add azure <YOUR_AZURE_GIT_URL>
# Push to Azure
git push azure main
```

6. Configure environment variables in Azure
   - In the Azure Portal, go to your Web App -> Configuration -> Application settings.
   - Add `MONGODB_URI` with your MongoDB Atlas connection string.
   - Add `PORT` if you need a custom port (Azure sets this automatically).

7. How the code is structured for Azure
   - The server serves static files from `server/public` so the React build (or static build) must be copied there.
   - The Express server listens on `process.env.PORT` which Azure provides.
   - The MongoDB connection uses `process.env.MONGODB_URI` which you'll set in Azure Configuration.

Local usage (quick)
1. Install server deps:

```powershell
cd server; npm install
```

2. Build the client and copy files into server/public:

```powershell
cd ..\client; npm install; npm run build
```

3. Start the server locally:

```powershell
cd ..\server; npm start
# Then open http://localhost:3000
```

Notes and assumptions
- This repository uses a minimal static frontend (no bundler) to keep the build step deterministic. `npm run build` in `client` copies static files into `server/public`.
- For production apps you would usually use Create React App / Vite and a proper CI/CD pipeline (GitHub Actions, Azure DevOps, or Azure Deployment Center).
- If you prefer automatic GitHub-based deployment, connect your GitHub repo in the Azure Deployment Center and set the Application settings there; Azure will install dependencies and run the start script.

Files created/edited
- `server/server.js` — Express server and MongoDB connection (commented).
- `server/routes/api.js` — Simple GET/POST API for items (commented).
- `server/models/item.js` — Mongoose model (commented).
- `server/package.json` — server manifest.
- `server/.env.example` — example env vars.
- `client/public/index.html` — minimal single-page app that talks to `/api/items`.
- `client/build.js` — build script that copies `index.html` to `server/public`.
- `.gitignore` — ignores node_modules and sensitive files.

Next steps (optional)
- Add a CI/CD pipeline (GitHub Actions) to build client and server on push.
- Add HTTPS and custom domain in Azure App Service settings.

If you want, I can:
- Initialize git and create a sample commit and show the exact `git push` steps for Local Git deployment.
- Add a GitHub Actions workflow to build and deploy to Azure automatically.
