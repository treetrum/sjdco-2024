import { CollectionConfig } from 'payload/types';
import { revalidateNextCache } from '../hooks/revalidateNextCache';
import { loggedIn, loggedInPreviewingOrPublished } from '../access';

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
    },
    versions: {
        drafts: true,
    },
    hooks: {
        afterChange: [revalidateNextCache],
    },
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
