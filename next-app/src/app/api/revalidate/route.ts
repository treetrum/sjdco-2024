import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

const handler = () => {
    revalidatePath('/');
    return NextResponse.json({
        revalidated: true,
        timestamp: Date.now(),
    });
};

export const POST = handler;
export const GET = handler;
