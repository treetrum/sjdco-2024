import { CollectionConfig } from 'payload';
import { loggedIn, loggedInOrPublished } from '../access';
import { revalidatePayload } from '../hooks/revalidatePayload';

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: loggedInOrPublished,
        create: loggedIn,
        update: loggedIn,
        delete: loggedIn,
    },
    admin: {},
    versions: { drafts: true },
    hooks: { afterChange: [revalidatePayload] },
    upload: true,
    fields: [],
};
