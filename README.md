# SJD.co 2024

### Tech stack

-   [NextJS](https://nextjs.org/)
-   [PayloadCMS](https://payloadcms.com/)

### Infrastructure

-   [Vercel](https://vercel.com/) (Hosts the NextJS/Payload apps)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Hosts the PayloadCMS database)

### Run locally

-   `pnpm install`
-   `pnpm run dev`
-   Open [http://localhost:3001](http://localhost:3000) for the NextJS frontend
-   Open [http://localhost:3001](http://localhost:3000/admin) for the Payload admin UI

##### Generate typescript definitions

-   `pnpm run payload generate:types` in root directory after making changes to Collections/Globals in PayloadCMS

### Deployment

-   This repo is hosted on Vercel (and deploys automatically from `main`)
