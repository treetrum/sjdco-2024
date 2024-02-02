export const revalidateNextCacheInternal = async () => {
    await fetch(`${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/revalidate`, {
        method: 'POST',
    });
};

export const revalidateNextCache = async ({ doc }) => {
    await revalidateNextCacheInternal();
    return doc;
};
