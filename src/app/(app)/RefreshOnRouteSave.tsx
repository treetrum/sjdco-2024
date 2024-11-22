'use client';

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation.js';
import React from 'react';
import { z } from 'zod';

export const RefreshRouteOnSave: React.FC = () => {
    const router = useRouter();

    return (
        <PayloadLivePreview
            refresh={() => router.refresh()}
            serverURL={z.string().parse(process.env.NEXT_PUBLIC_PAYLOAD_URL)}
        />
    );
};
