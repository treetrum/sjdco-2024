import { getHome, getJobs, getProjects } from '@/backend/PayloadNextCacheClient';
import { HomePage } from './HomePage';

export default async function Home() {
    const [homeData, projectsData, jobsData] = await Promise.all([
        getHome(),
        getProjects(),
        getJobs(),
    ]);

    return (
        <HomePage home={homeData} projects={projectsData.docs ?? []} jobs={jobsData.docs ?? []} />
    );
}
