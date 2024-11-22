import { draftMode } from 'next/headers';

export const DraftModeButton = async () => {
    const draft = await draftMode();
    return draft.isEnabled ? (
        <div className=" fixed bottom-8 left-8 rounded-[28px] bg-white shadow-2xl">
            <div className="flex items-center gap-4 px-3 py-3 pl-6">
                <p className="text-sm font-bold text-black">Preview Mode</p>
                <a
                    href="/api/preview/exit"
                    className="rounded-[18px] bg-violet-500 px-3 py-2 text-xs text-white"
                >
                    Exit preview
                </a>
            </div>
        </div>
    ) : null;
};
