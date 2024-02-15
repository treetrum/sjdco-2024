import { Project, Home, Job } from '../../../shared/payload-types';
import { draftMode } from 'next/headers';

interface PayloadCollectionResponse<T extends Record<any, any>> {
    docs?: T[];
    errorrs?: {
        message: string;
    }[];
}

export class PayloadClient {
    serverURL: string;

    constructor() {
        if (!process.env.NEXT_PUBLIC_CMS_URL) {
            throw new Error('NEXT_PUBLIC_CMS_URL is not defined');
        }
        this.serverURL = process.env.NEXT_PUBLIC_CMS_URL;
    }

    async fetch(path: string) {
        const isPreviewMode = draftMode().isEnabled;
        const url = new URL(path, this.serverURL);
        url.searchParams.set('draft', isPreviewMode ? 'true' : 'false');
        url.searchParams.set('depth', '2');

        console.log('Fetching', url.toString());

        return fetch(url, {
            cache: isPreviewMode ? 'no-cache' : undefined,
            next: {
                tags: ['payload'],
                revalidate: isPreviewMode ? undefined : 1,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
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
