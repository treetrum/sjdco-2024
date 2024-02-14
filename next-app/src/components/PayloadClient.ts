import { Project, Home, Job } from '../../../shared/payload-types';

interface PayloadCollectionResponse<T extends Record<any, any>> {
    docs?: T[];
    errorrs?: {
        message: string;
    }[];
}

export class PayloadClient {
    serverURL: string;
    previewMode: boolean;

    constructor() {
        if (!process.env.NEXT_PUBLIC_CMS_URL) {
            throw new Error('NEXT_PUBLIC_CMS_URL is not defined');
        }
        this.serverURL = process.env.NEXT_PUBLIC_CMS_URL;
        this.previewMode = false;
    }

    async fetch(path: string) {
        const url = new URL(path, this.serverURL);
        url.searchParams.set('locale', 'undefined');
        url.searchParams.set('draft', this.previewMode ? 'true' : 'false');
        url.searchParams.set('depth', '2');

        return fetch(url, {
            next: { tags: ['payload'] },
            cache: this.previewMode ? 'no-cache' : undefined,
        })
            .then((res) => res.json())
            .catch((e) => {
                console.error(e);
                throw e;
            });
    }

    async fetchHome(): Promise<Home> {
        return this.fetch(`/api/globals/home`);
    }

    async fetchProjects(): Promise<PayloadCollectionResponse<Project>> {
        return this.fetch(`/api/projects`);
    }

    async fetchJobs(): Promise<PayloadCollectionResponse<Job>> {
        return this.fetch(`/api/jobs`);
    }
}
