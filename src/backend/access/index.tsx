import { Access } from 'payload';

export const loggedIn: Access = ({ req: { user } }) => {
    return user != undefined;
};

export const loggedInOrPublished: Access = ({ req: { user } }) => {
    if (user) {
        return true;
    }
    return {
        _status: { equals: 'published' },
    };
};
