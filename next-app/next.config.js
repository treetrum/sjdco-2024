/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
    images: {
        remotePatterns: [
            {
                hostname: '7adzvrg2a3ju2slj.public.blob.vercel-storage.com',
            },
        ],
    },
};

module.exports = nextConfig;
