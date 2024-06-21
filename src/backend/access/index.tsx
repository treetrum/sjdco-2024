import { Access } from 'payload';

export const loggedIn: Access = ({ req: { user } }) => {
    return user != undefined;
};

export const loggedInPreviewingOrPublished: Access = ({ req: { user, query } }) => {
    if (user) {
        return true;
    }
    // TODO: Fix this
    // if (query.draft == 'true') {
    //     return true;
    // }
    return {
        _status: { equals: 'published' },
    };
};
