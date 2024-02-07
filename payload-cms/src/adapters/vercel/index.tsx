import { put, del } from '@vercel/blob';
import { Adapter } from '@payloadcms/plugin-cloud-storage/dist/types';

export const createVercelBlobAdapter = (): Adapter => () => {
    return {
        generateURL: async ({ filename }) => {
            return `/${filename}`;
        },
        handleDelete: async ({ doc }) => {
            await del(doc.url);
        },
        handleUpload: async ({ file }) => {
            await put(file.filename, file.buffer, {
                access: 'public',
                addRandomSuffix: false,
            });
        },
        staticHandler: async (req, res, next) => {
            return next();
        },
    };
};
