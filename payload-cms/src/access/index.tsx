import { Access } from "payload/config";

export const loggedIn: Access = ({ req: { user } }) => {
    return user != undefined;
};

export const loggedInPreviewingOrPublished: Access = ({
    req: { user, query },
}) => {
    if (user) {
        return true;
    }
    if (query.draft == "true") {
        return true;
    }
    return {
        _status: { equals: "published" },
    };
};
