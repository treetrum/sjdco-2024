import { CollectionConfig } from "payload/types";
import { revalidateNextCache } from "../hooks/revalidateNextCache";

export const Projects: CollectionConfig = {
    slug: "projects",
    access: { read: () => true },
    admin: { useAsTitle: "title", defaultColumns: ["title"] },
    hooks: {
        afterChange: [revalidateNextCache],
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
        {
            name: "subtitle",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "richText",
        },
        {
            name: "url",
            type: "text",
        },
        {
            name: "tags",
            type: "array",
            fields: [{ type: "text", name: "tag" }],
        },
    ],
};
