import { notFound } from 'next/navigation';
import { Project, type Home } from '../../../shared/payload-types';
import { HomePage } from './HomePage';

interface PayloadCollectionResponse<T extends Record<any, any>> {
    docs: T[];
}

class PayloadClient {
    static serverURL: string = process.env.NEXT_PUBLIC_CMS_URL!;

    async fetch(path: string) {
        return fetch(`${PayloadClient.serverURL}${path}`).then((res) => res.json());
    }

    async fetchHome(): Promise<Home> {
        return this.fetch(`/api/globals/home?locale=undefined&draft=false&depth=1`);
    }

    async fetchProjects(): Promise<PayloadCollectionResponse<Project>> {
        return this.fetch(`/api/projects?locale=undefined&draft=false&depth=1`);
    }
}

export default async function Home() {
    const homeData = await new PayloadClient().fetchHome().catch(() => notFound());
    const projectsData = await new PayloadClient().fetchProjects().catch(() => notFound());

    return <HomePage initialHomeData={homeData} initialProjectsData={projectsData.docs} />;
}
