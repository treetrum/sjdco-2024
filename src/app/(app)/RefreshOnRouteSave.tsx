'use client';

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation.js';
import React from 'react';
import { z } from 'zod';

export const RefreshRouteOnSave: React.FC = () => {
    const router = useRouter();

    const env = z
        .object({
            NEXT_PUBLIC_PAYLOAD_URL: z.string(),
        })
        .parse(process.env);

    return (
        <PayloadLivePreview
            refresh={() => router.refresh()}
            serverURL={env.NEXT_PUBLIC_PAYLOAD_URL}
        />
    );
};
