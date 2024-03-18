export const generatePreviewUrl = (path: string) => {
    const url = new URL('/api/preview', process.env.PAYLOAD_PUBLIC_SITE_URL);
    url.searchParams.set('token', process.env.PAYLOAD_PUBLIC_PREVIEW_TOKEN ?? '');
    url.searchParams.set('path', path);
    return url.toString();
};
