import { notFound } from 'next/navigation';
import { HomePage } from './HomePage';
import { PayloadClient } from '@/components/PayloadClient';

export default async function Home({ searchParams }: { searchParams: Record<string, string> }) {
    const client = new PayloadClient(searchParams);

    const [homeData, projectsData, jobsData] = await Promise.all([
        client.fetchHome().catch(() => notFound()),
        client.fetchProjects().catch(() => notFound()),
        client.fetchJobs().catch(() => notFound()),
    ]);

    return (
        <HomePage
            initialHomeData={homeData}
            initialProjectsData={projectsData.docs ?? []}
            initialJobsData={jobsData.docs ?? []}
        />
    );
}
