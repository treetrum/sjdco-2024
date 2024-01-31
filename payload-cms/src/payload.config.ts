import path from "path";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload/config";
import Users from "./collections/Users";

export default buildConfig({
    admin: {
        user: Users.slug,
        bundler: webpackBundler(),
        livePreview: {
            url: process.env.PAYLOAD_PUBLIC_SITE_URL,
            globals: ["home"],
        },
    },
    cors: [process.env.PAYLOAD_PUBLIC_SITE_URL],
    editor: lexicalEditor({}),
    collections: [Users],
    typescript: {
        outputFile: path.resolve(__dirname, "../../shared/payload-types.ts"),
        declare: false,
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
    },
    plugins: [payloadCloud()],
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI,
        },
    }),
    globals: [
        {
            slug: "home",
            access: {
                read: () => true,
            },
            fields: [
                {
                    type: "text",
                    name: "title",
                    required: true,
                },
                {
                    type: "text",
                    name: "subtitle",
                    required: true,
                },
                {
                    type: "text",
                    name: "byline",
                    required: true,
                },
                {
                    name: "intro",
                    type: "richText",
                },
            ],
            hooks: {
                afterChange: [
                    async ({ doc }) => {
                        await fetch(
                            `${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/revalidate`,
                            { method: "POST" }
                        );
                        return doc;
                    },
                ],
            },
        },
    ],
});
