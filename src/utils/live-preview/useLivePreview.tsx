'use client';

import { ready, subscribe, unsubscribe } from '@payloadcms/live-preview';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useLivePreview = <T extends { updatedAt?: string | null }>(props: {
    depth?: number;
    initialData: T;
    serverURL: string;
}): {
    data: T;
    isLoading: boolean;
} => {
    const { depth = 2, initialData, serverURL } = props;
    const [data, setData] = useState<T>(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const hasSentReadyMessage = useRef<boolean>(false);

    const onChange = useCallback(
        (mergedData: any) => {
            // When a change is made, the `onChange` callback will be called with the merged data
            // Set this merged data into state so that React will re-render the UI
            if (data.updatedAt === mergedData.updatedAt) {
                setData(mergedData);
            }
            setIsLoading(false);
        },
        [data],
    );

    useEffect(() => {
        // Listen for `window.postMessage` events from the Admin panel
        // When a change is made, the `onChange` callback will be called with the merged data
        const subscription = subscribe({
            callback: onChange,
            depth,
            initialData,
            serverURL,
        });

        // Once subscribed, send a `ready` message back up to the Admin panel
        // This will indicate that the front-end is ready to receive messages
        if (!hasSentReadyMessage.current) {
            hasSentReadyMessage.current = true;

            ready({
                serverURL,
            });
        }

        // When the component unmounts, unsubscribe from the `window.postMessage` events
        return () => {
            unsubscribe(subscription);
        };
    }, [serverURL, onChange, depth, initialData]);

    return {
        data,
        isLoading,
    };
};
