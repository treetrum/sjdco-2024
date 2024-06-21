import { CollectionConfig } from 'payload';
import { loggedIn, loggedInPreviewingOrPublished } from '../access';
import { revalidatePayload } from '../hooks/revalidatePayload';
import { generatePreviewUrl } from '../utils';

export const Jobs: CollectionConfig = {
    slug: 'jobs',
    access: {
        read: loggedInPreviewingOrPublished,
        create: loggedIn,
        update: loggedIn,
        delete: loggedIn,
    },
    admin: {
        useAsTitle: 'company',
        defaultColumns: ['company', 'createdAt', 'updatedAt'],
        preview: () => generatePreviewUrl('/'),
    },
    versions: {
        drafts: true,
    },
    hooks: { afterChange: [revalidatePayload] },
    fields: [
        {
            name: 'company',
            type: 'text',
        },
        {
            name: 'years',
            type: 'text',
        },
        {
            name: 'positions',
            type: 'array',
            fields: [{ type: 'text', name: 'position' }],
        },
        {
            name: 'description',
            type: 'richText',
        },
        {
            name: 'tags',
            type: 'array',
            fields: [{ type: 'text', name: 'tag' }],
        },
    ],
};
