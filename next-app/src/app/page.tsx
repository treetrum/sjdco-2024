import { notFound } from 'next/navigation';
import { HomePage } from './HomePage';
import { PayloadClient } from '@/components/PayloadClient';

export default async function Home({}: {}) {
    const client = new PayloadClient();

    const [homeData, projectsData, jobsData] = await Promise.all([
        client.fetchHome().catch(() => notFound()),
        client.fetchProjects().catch(() => notFound()),
        client.fetchJobs().catch(() => notFound()),
    ]);

    return (
        <HomePage home={homeData} projects={projectsData.docs ?? []} jobs={jobsData.docs ?? []} />
    );
}
