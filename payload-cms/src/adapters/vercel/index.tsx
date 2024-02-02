import { put, del } from '@vercel/blob';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';

type PluginOptions = Parameters<typeof cloudStorage>[0]['collections'];
type Adapter = PluginOptions[keyof PluginOptions]['adapter'];

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
