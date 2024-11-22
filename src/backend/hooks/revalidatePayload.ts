import { revalidateTag } from 'next/cache';

export const revalidatePayload = ({ doc }: any) => {
    revalidateTag('payload');
    return doc;
};
