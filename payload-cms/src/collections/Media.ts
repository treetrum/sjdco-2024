import { CollectionConfig } from 'payload/types';
import { revalidateNextCache } from '../hooks/revalidateNextCache';
import { loggedIn, loggedInPreviewingOrPublished } from '../access';

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: loggedInPreviewingOrPublished,
        create: loggedIn,
        update: loggedIn,
        delete: loggedIn,
    },
    admin: {},
    versions: {
        drafts: true,
    },
    hooks: {
        afterChange: [revalidateNextCache],
    },
    upload: {
        staticURL: 'https://7adzvrg2a3ju2slj.public.blob.vercel-storage.com',
        staticDir: '/',
    },
    fields: [],
};
