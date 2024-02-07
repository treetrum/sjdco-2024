# SJD.co 2024 Monorepo

### Tech stack

-   [NextJS](https://nextjs.org/)
-   [PayloadCMS](https://payloadcms.com/)

### Infrastructure

-   [Vercel](https://vercel.com/) (Hosts the NextJS frontend)
-   [Render](https://render.com/) (Hosts the PayloadCMS admin)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Hosts the PayloadCMS database)

### Run locally

-   `npm install` in both `next-app` and `payload-cms` directories
-   `npm run dev` in root directory
-   Open [http://localhost:3000](http://localhost:3000) for the PayloadCMS admin
-   Open [http://localhost:3001](http://localhost:3001) for the NextJS frontend

##### Generate typescript definitions

-   `npm run generate-types` in root directory after making changes to Collections/Globals in PayloadCMS

### Deployment

-   NextJS is hosted on Vercel (and deploys automatically from `main`)
-   PayloadCMS is hosted on Render (and deploys automatically from `main`)
