import { revalidateTag } from 'next/cache';
import { GlobalConfig } from 'payload';
import { loggedIn, loggedInOrPublished } from '../access';
import { revalidatePayload } from '../hooks/revalidatePayload';
import { generatePreviewUrl } from '../utils';

export const Home: GlobalConfig = {
    slug: 'home',
    admin: {
        preview: () => generatePreviewUrl('/'),
    },
    access: {
        read: loggedInOrPublished,
        update: loggedIn,
    },
    versions: { drafts: true },
    fields: [
        {
            type: 'text',
            name: 'title',
        },
        {
            type: 'text',
            name: 'subtitle',
        },
        {
            type: 'text',
            name: 'byline',
        },
        {
            name: 'intro',
            type: 'richText',
        },
        {
            name: 'projects',
            label: 'Featured Projects',
            type: 'relationship',
            relationTo: 'projects',
            hasMany: true,
        },
        {
            name: 'jobs',
            label: 'Featured Jobs',
            type: 'relationship',
            relationTo: 'jobs',
            hasMany: true,
        },
        {
            name: 'technicalSkills',
            type: 'array',
            fields: [
                {
                    name: 'category',
                    type: 'text',
                },
                {
                    name: 'content',
                    type: 'text',
                },
            ],
        },
    ],
    hooks: {
        afterChange: [revalidatePayload],
    },
};
