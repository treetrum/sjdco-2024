import config from '@payload-config';
import { draftMode, headers } from 'next/headers';
import { getPayload } from 'payload';
import { getAuth } from '@/utils/auth';
import { HomePage } from './HomePage';

const shouldFetchDraft = async (searchParams: Promise<{ [key: string]: string | string[] }>) => {
    // If there's a user logged in, check if the "?preview" search param is set
    const auth = await getAuth();
    if (auth.user) {
        const params = await searchParams;
        if (!!params.preview) {
            return true;
        }
    }

    // Otherwise make sure draftMode has been enabled
    return (await draftMode()).isEnabled;
};

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
    const payload = await getPayload({ config });

    const homeData = await payload.findGlobal({
        slug: 'home',
        draft: await shouldFetchDraft(searchParams),
    });
    const projects = homeData.projects?.filter((p) => typeof p !== 'string') ?? [];
    const jobs = homeData.jobs?.filter((j) => typeof j !== 'string') ?? [];

    return <HomePage home={homeData} projects={projects} jobs={jobs} />;
}
