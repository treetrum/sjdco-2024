import path from 'path';
import { payloadCloud } from '@payloadcms/plugin-cloud';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload/config';
import Users from './collections/Users';
import { Home } from './globals/home';
import { Projects } from './collections/Projects';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { Jobs } from './collections/Jobs';
import { Media } from './collections/Media';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { createVercelBlobAdapter } from './adapters/vercel';

export default buildConfig({
    admin: {
        user: Users.slug,
        bundler: webpackBundler(),
        livePreview: {
            url: () => {
                const base = process.env.PAYLOAD_PUBLIC_SITE_URL;
                const url = new URL(base);
                return url.toString();
            },
            globals: [Home.slug],
            collections: [Projects.slug, Jobs.slug],
        },
    },
    editor: lexicalEditor({}),
    collections: [Users, Projects, Jobs, Media],
    globals: [Home],
    typescript: {
        outputFile: path.resolve(__dirname, '../../shared/payload-types.ts'),
        declare: false,
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
    plugins: [
        payloadCloud(),
        cloudStorage({
            collections: {
                [Media.slug]: {
                    adapter: createVercelBlobAdapter(),
                    disableLocalStorage: true,
                    disablePayloadAccessControl: true,
                },
            },
        }),
    ],
    db: mongooseAdapter({
        url: process.env.DATABASE_URI,
    }),
});
