import config from '@payload-config';
import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';

export const getHome = unstable_cache(
    async () => {
        const payload = await getPayload({ config });
        return payload.findGlobal({ slug: 'home' });
    },
    ['home'],
    { tags: ['payload', 'home'] },
);

export const getProjects = unstable_cache(
    async () => {
        const payload = await getPayload({ config });
        return payload.find({ collection: 'projects' });
    },
    ['projects'],
    { tags: ['payload', 'projects'] },
);

export const getJobs = unstable_cache(
    async () => {
        const payload = await getPayload({ config });
        return payload.find({ collection: 'jobs' });
    },
    ['jobs'],
    { tags: ['payload', 'jobs'] },
);
