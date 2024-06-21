import { getHome, getJobs, getProjects } from '@/backend/PayloadNextCacheClient';
import { HomePage } from './HomePage';

export default async function Home() {
    const [homeData, projectsData, jobsData] = await Promise.all([
        getHome(),
        getProjects(),
        getJobs(),
    ]);

    return (
        // @ts-expect-error TODO: type generation isn't working at the moment
        <HomePage home={homeData} projects={projectsData.docs ?? []} jobs={jobsData.docs ?? []} />
    );
}
