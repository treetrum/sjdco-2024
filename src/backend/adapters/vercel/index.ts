import { put, del, head } from '@vercel/blob';
import { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/dist/types';
import path from 'path';

const generateUrl = (fileKey: string) => {
    const blobStoreUrl = process.env.BLOB_STORE_URL;
    if (!blobStoreUrl) {
        throw new Error('BLOB_STORE_URL environment variable is required');
    }
    return `${blobStoreUrl}/${fileKey}`;
};

const generateFileKey = (filename: string, prefix?: string) => {
    const key = path.posix.join(prefix ?? '', filename);
    return key;
};

export const createVercelBlobAdapter =
    (): Adapter =>
    ({ prefix }): GeneratedAdapter => {
        return {
            generateURL: async ({ filename }) => {
                const fileKey = generateFileKey(filename, prefix);
                console.log('generateURL called for fileKey', fileKey);
                return generateUrl(fileKey);
            },
            handleDelete: async ({ doc }) => {
                const fileKey = generateFileKey(doc.filename, prefix);
                console.log('handleDelete called for fileKey', fileKey);

                try {
                    await del(generateUrl(fileKey));
                } catch (error) {
                    console.error('Error deleting file', fileKey, error);
                }
            },
            handleUpload: async ({ file }) => {
                const fileKey = generateFileKey(file.filename, prefix);
                console.log('handleUpload called for fileKey', fileKey);
                await put(fileKey, file.buffer, {
                    access: 'public',
                    addRandomSuffix: false,
                });
            },
            staticHandler: async (req, { params }) => {
                // TODO: this doesn't work at the moment. To avoid, ensure you
                // pass 'disablePayloadAccessControl: true' to the plugins
                // config for now.
                const fileKey = generateFileKey(params.filename, prefix);
                console.log('staticHandler called for fileKey', fileKey);
                try {
                    const file = await head(generateUrl(fileKey));
                    if (file) {
                        return Response.redirect(file.url);
                    }
                } catch (error) {
                    console.error('Error getting file', fileKey, error);
                } finally {
                    return new Response(undefined, { status: 404 });
                }
            },
        };
    };
