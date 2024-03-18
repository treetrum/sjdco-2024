import { CollectionConfig } from 'payload/types';
import { loggedIn, loggedInPreviewingOrPublished } from '../access';
import { revalidatePayload } from '../hooks/revalidatePayload';

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: loggedInPreviewingOrPublished,
        create: loggedIn,
        update: loggedIn,
        delete: loggedIn,
    },
    admin: {
        defaultColumns: ['file'],
    },
    versions: {
        drafts: true,
    },
    hooks: { afterChange: [revalidatePayload] },
    upload: true,
    fields: [],
};
