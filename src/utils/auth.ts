import config from '@payload-config';
import { headers } from 'next/headers';
import { getPayload } from 'payload';

export const getAuth = async () => {
    const payload = await getPayload({ config });
    return await payload.auth({ headers: await headers() });
};
