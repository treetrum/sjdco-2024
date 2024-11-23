import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getAuth } from '@/utils/auth';

export async function GET(request: NextRequest) {
    const auth = await getAuth();

    const params = z
        .object({
            token: z.string(),
            path: z.string(),
        })
        .parse(Object.fromEntries(request.nextUrl.searchParams.entries()));

    if (!auth.user) {
        // Send a 401 Unauthorized response
        return new Response('Unauthorized', { status: 401 });
    }

    (await draftMode()).enable();
    return redirect(params.path);
}
