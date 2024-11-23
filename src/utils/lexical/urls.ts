'use server';

import { z } from 'zod';

export const getDeployedUrl = async (): Promise<string> => {
    const { VERCEL_PROJECT_PRODUCTION_URL, VERCEL_URL } = z
        .object({
            VERCEL_PROJECT_PRODUCTION_URL: z.string(),
            VERCEL_URL: z.string(),
        })
        .parse(process.env);

    const protocol = process.env.NODE_ENV === 'production' ? 'https:' : 'http:';
    const isProd = process.env.VERCEL_ENV === 'production';

    const host = isProd ? VERCEL_PROJECT_PRODUCTION_URL : VERCEL_URL;

    return `${protocol}//${host}?preview=true`;
};
