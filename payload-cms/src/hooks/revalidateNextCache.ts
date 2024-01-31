export const revalidateNextCache = async ({ doc }) => {
    await fetch(`${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/revalidate`, {
        method: "POST",
    });
    return doc;
};
