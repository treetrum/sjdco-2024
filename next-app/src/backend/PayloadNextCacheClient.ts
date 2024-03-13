import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';
import config from '@payload-config';

export const getPayloadCached = unstable_cache(
    async () => await getPayload({ config }),
    ['getPayload'],
    {
        tags: ['payload', 'getPayload'],
    },
);

export const getHome = unstable_cache(
    async () => {
        const payload = await getPayloadCached();
        return payload.findGlobal({ slug: 'home' });
    },
    ['home'],
    { tags: ['payload', 'home'] },
);

export const getProjects = unstable_cache(
    async () => {
        const payload = await getPayloadCached();
        return payload.find({ collection: 'projects' });
    },
    ['projects'],
    { tags: ['payload', 'projects'] },
);

export const getJobs = unstable_cache(
    async () => {
        const payload = await getPayloadCached();
        return payload.find({ collection: 'jobs' });
    },
    ['jobs'],
    { tags: ['payload', 'jobs'] },
);
