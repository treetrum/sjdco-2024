import path from 'path';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import Users from '@/backend/collections/Users';
import { Home } from '@/backend/globals/home';
import { Projects } from '@/backend/collections/Projects';
import { Jobs } from '@/backend/collections/Jobs';
import { Media } from '@/backend/collections/Media';
import { fileURLToPath } from 'url';

// import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
// import { createVercelBlobAdapter } from '@/backend/adapters/vercel';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    secret: process.env.PAYLOAD_SECRET || '',
    admin: {
        user: Users.slug,
        // TODO: Fix this
        // livePreview: {
        //     url: () => '/',
        //     globals: [Home.slug],
        //     collections: [Projects.slug, Jobs.slug],
        // },
    },
    editor: lexicalEditor({}),
    collections: [Users, Projects, Jobs, Media],
    globals: [Home],
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    plugins: [
        // cloudStorage({
        //     collections: {
        //         [Media.slug]: {
        //             adapter: createVercelBlobAdapter(),
        //             disableLocalStorage: true,
        //             disablePayloadAccessControl: true,
        //         },
        //     },
        // }),
    ],
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),
});
