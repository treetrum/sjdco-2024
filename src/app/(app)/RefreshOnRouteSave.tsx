'use client';

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation.js';
import React from 'react';

export const RefreshRouteOnSave: React.FC<{ serverUrl: string }> = (props) => {
    const router = useRouter();

    return <PayloadLivePreview refresh={() => router.refresh()} serverURL={props.serverUrl} />;
};
