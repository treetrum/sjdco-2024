import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { unstable_cache } from 'next/cache';

export const getHome = unstable_cache(
    async () => {
        const payload = await getPayloadHMR({ config });
        return payload.findGlobal({ slug: 'home' });
    },
    ['home'],
    { tags: ['payload', 'home'] },
);

export const getProjects = unstable_cache(
    async () => {
        const payload = await getPayloadHMR({ config });
        return payload.find({ collection: 'projects' });
    },
    ['projects'],
    { tags: ['payload', 'projects'] },
);

export const getJobs = unstable_cache(
    async () => {
        const payload = await getPayloadHMR({ config });
        return payload.find({ collection: 'jobs' });
    },
    ['jobs'],
    { tags: ['payload', 'jobs'] },
);
