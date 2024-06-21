import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: false,
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    images: {
        remotePatterns: [
            {
                hostname: '7adzvrg2a3ju2slj.public.blob.vercel-storage.com',
            },
        ],
    },
};

export default withPayload(nextConfig);
