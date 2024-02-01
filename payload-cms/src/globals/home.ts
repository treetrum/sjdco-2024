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
        },
        {
            type: "text",
            name: "subtitle",
        },
        {
            type: "text",
            name: "byline",
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
