import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import {
    AlignFeature,
    BlockquoteFeature,
    BlocksFeature,
    BoldFeature,
    ChecklistFeature,
    HeadingFeature,
    IndentFeature,
    InlineCodeFeature,
    ItalicFeature,
    LinkFeature,
    OrderedListFeature,
    ParagraphFeature,
    RelationshipFeature,
    UnorderedListFeature,
    UploadFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import { createVercelBlobAdapter } from '@/backend/adapters/vercel';
import { Jobs } from '@/backend/collections/Jobs';
import { Media } from '@/backend/collections/Media';
import { Projects } from '@/backend/collections/Projects';
import Users from '@/backend/collections/Users';
import { Home } from '@/backend/globals/home';

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
    editor: lexicalEditor(),
    collections: [Users, Projects, Jobs, Media],
    globals: [Home],
    typescript: {
        outputFile: path.resolve(dirname, 'src/types/payload-types.ts'),
    },
    plugins: [
        cloudStoragePlugin({
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
        url: process.env.DATABASE_URI || '',
    }),
});
