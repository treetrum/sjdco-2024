import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        tokenExpiration: 60 * 60 * 24 * 30,
    },
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        // Email added by default
        // Add more fields as needed
    ],
};

export default Users;
