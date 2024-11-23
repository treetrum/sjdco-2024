import { getDeployedUrl } from '@/utils/lexical/urls';

export const generatePreviewUrl = async (path: string) => {
    const base = await getDeployedUrl();
    const url = new URL('/api/preview', base);
    url.searchParams.set('token', process.env.PAYLOAD_PUBLIC_PREVIEW_TOKEN ?? '');
    url.searchParams.set('path', path);
    return url.toString();
};
