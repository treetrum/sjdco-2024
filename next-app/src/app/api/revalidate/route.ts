import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = () => {
    revalidatePath('/');
    return NextResponse.json({
        revalidated: true,
        timestamp: Date.now(),
    });
};
