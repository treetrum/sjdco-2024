import config from '@payload-config';
import { headers } from 'next/headers';
import { getPayload } from 'payload';
import { HomePage } from './HomePage';

export default async function Home({ searchParams }: { searchParams: Record<string, unknown> }) {
    const payload = await getPayload({ config });
    const auth = await payload.auth({ headers: await headers() });

    const homeData = await payload.findGlobal({
        slug: 'home',
        draft: !!(auth.user && searchParams.preview),
    });
    const projects = homeData.projects?.filter((p) => typeof p !== 'string') ?? [];
    const jobs = homeData.jobs?.filter((j) => typeof j !== 'string') ?? [];

    return <HomePage home={homeData} projects={projects} jobs={jobs} />;
}
