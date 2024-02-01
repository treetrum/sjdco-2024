import { notFound } from 'next/navigation';
import { HomePage } from './HomePage';
import { PayloadClient } from '@/components/PayloadClient';

export default async function Home() {
    const client = new PayloadClient();
    const homeData = await client.fetchHome().catch(() => notFound());
    const projectsData = await client.fetchProjects().catch(() => notFound());
    const jobsData = await client.fetchJobs().catch(() => notFound());

    return (
        <HomePage
            initialHomeData={homeData}
            initialProjectsData={projectsData.docs ?? []}
            initialJobsData={jobsData.docs ?? []}
        />
    );
}
