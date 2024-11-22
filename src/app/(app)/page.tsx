import config from '@payload-config';
import { headers } from 'next/headers';
import { getPayload } from 'payload';
import { HomePage } from './HomePage';

export default async function Home() {
    const payload = await getPayload({ config });
    const auth = await payload.auth({ headers: await headers() });

    const homeData = await payload.findGlobal({
        slug: 'home',
        draft: !!auth.user, // only logged in users should get draft access
    });
    const projects = homeData.projects?.filter((p) => typeof p !== 'string') ?? [];
    const jobs = homeData.jobs?.filter((j) => typeof j !== 'string') ?? [];

    return <HomePage home={homeData} projects={projects} jobs={jobs} />;
}
