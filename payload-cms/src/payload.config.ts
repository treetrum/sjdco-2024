import path from "path";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload/config";
import Users from "./collections/Users";
import { Home } from "./globals/home";
import { Projects } from "./collections/Projects";

export default buildConfig({
    admin: {
        user: Users.slug,
        bundler: webpackBundler(),
        livePreview: {
            url: process.env.PAYLOAD_PUBLIC_SITE_URL,
            globals: [Home.slug],
            collections: [Projects.slug],
        },
    },
    cors: [process.env.PAYLOAD_PUBLIC_SITE_URL],
    editor: lexicalEditor({}),
    collections: [Users, Projects],
    globals: [Home],
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
});
