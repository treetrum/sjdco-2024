import { GlobalConfig } from 'payload/types';
import { revalidateNextCache } from '../hooks/revalidateNextCache';
import { loggedIn, loggedInPreviewingOrPublished } from '../access';

export const Home: GlobalConfig = {
    slug: 'home',
    access: {
        read: loggedInPreviewingOrPublished,
        update: loggedIn,
    },
    versions: {
        drafts: true,
    },
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
        afterChange: [revalidateNextCache],
    },
};
