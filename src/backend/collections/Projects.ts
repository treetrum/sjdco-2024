import { CollectionConfig } from 'payload';
import { loggedIn, loggedInOrPublished } from '../access';
import { revalidatePayload } from '../hooks/revalidatePayload';
import { generatePreviewUrl } from '../utils';

export const Projects: CollectionConfig = {
    slug: 'projects',
    access: {
        read: loggedInOrPublished,
        create: loggedIn,
        update: loggedIn,
        delete: loggedIn,
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'createdAt', 'updatedAt'],
        preview: () => generatePreviewUrl('/'),
    },
    hooks: { afterChange: [revalidatePayload] },
    versions: {
        drafts: { autosave: { interval: 500 } },
    },
    fields: [
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'subtitle',
            type: 'text',
        },
        {
            name: 'description',
            type: 'richText',
        },
        {
            name: 'url',
            type: 'text',
        },
        {
            name: 'icon',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'tags',
            type: 'array',
            fields: [{ type: 'text', name: 'tag' }],
        },
    ],
};
