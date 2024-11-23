import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { resendAdapter } from '@payloadcms/email-resend';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import { z } from 'zod';
import { Jobs } from '@/backend/collections/Jobs';
import { Media } from '@/backend/collections/Media';
import { Projects } from '@/backend/collections/Projects';
import Users from '@/backend/collections/Users';
import { Home } from '@/backend/globals/home';
import { getDeployedUrl } from '@/utils/lexical/urls';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const env = z
    .object({
        BLOB_READ_WRITE_TOKEN: z.string(),
        DATABASE_URI: z.string(),
        RESEND_API_KEY: z.string(),
    })
    .parse(process.env);

export default buildConfig({
    secret: process.env.PAYLOAD_SECRET || '',
    admin: {
        user: Users.slug,
        livePreview: {
            url: async () => {
                const url = await getDeployedUrl();
                return `${url}?preview=true`;
            },
            globals: [Home.slug],
            collections: [Projects.slug, Jobs.slug],
        },
    },
    editor: lexicalEditor(),
    collections: [Users, Projects, Jobs, Media],
    globals: [Home],
    typescript: {
        outputFile: path.resolve(dirname, 'src/types/payload-types.ts'),
    },
    plugins: [
        vercelBlobStorage({
            collections: { media: true },
            token: env.BLOB_READ_WRITE_TOKEN,
        }),
    ],
    db: mongooseAdapter({
        url: env.DATABASE_URI,
    }),
    email: resendAdapter({
        apiKey: env.RESEND_API_KEY,
        defaultFromAddress: 'hello@sjd.co',
        defaultFromName: 'SJDco Website',
    }),
});
