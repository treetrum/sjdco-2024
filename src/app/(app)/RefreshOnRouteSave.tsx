'use client';

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation.js';
import React from 'react';

export const RefreshRouteOnSave: React.FC = () => {
    const router = useRouter();

    const url = `${window.location.protocol}//${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    return <PayloadLivePreview refresh={() => router.refresh()} serverURL={url} />;
};
