import { redirect } from 'next/navigation';
import { draftMode } from 'next/headers';
import { NextRequest } from 'next/server';
import { z } from 'zod';

export async function GET(request: NextRequest) {
    const params = z
        .object({
            token: z.string(),
            path: z.string(),
        })
        .parse(Object.fromEntries(request.nextUrl.searchParams.entries()));

    if (params.token !== process.env.PREVIEW_TOKEN) {
        // Send a 401 Unauthorized response
        return new Response('Unauthorized', { status: 401 });
    }

    draftMode().enable();
    return redirect(params.path);
}
