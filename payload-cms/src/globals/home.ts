import { GlobalConfig } from "payload/types";
import { revalidateNextCache } from "../hooks/revalidateNextCache";

export const Home: GlobalConfig = {
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
        afterChange: [revalidateNextCache],
    },
};
