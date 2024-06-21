'use client';

import { Job as JobType } from '@/types/payload-types';
import { LexicalRenderer } from '@/utils/lexical/LexicalRenderer';
import { useLivePreview } from '@/utils/live-preview/useLivePreview';

export const Job = ({ job: initialJob }: { job: JobType }) => {
    const { data: job } = useLivePreview<JobType>({
        initialData: initialJob,
        serverURL: process.env.NEXT_PUBLIC_CMS_URL!,
    });

    return (
        <div className="mt-8 first:mt-0 sm:flex" key={job.company}>
            <div className="mb-0 hidden w-[150px] flex-shrink-0 text-base sm:block md:w-[200px] md:text-lg ">
                {job.years}
            </div>
            <div className="flex w-auto flex-col">
                <div className="flex-shrink-0 ">
                    <h4 className="mb-1 text-base md:text-lg">
                        <span>{job.company}</span>{' '}
                        <span className="text-right text-foreground/50 sm:hidden">
                            ({job.years})
                        </span>
                    </h4>
                </div>
                <div className="mt-1">
                    {(job.positions ?? []).map(({ position }, i) => (
                        <p
                            key={position}
                            className={`mt-2 text-xs font-semibold uppercase first:mt-0 md:font-semibold ${
                                i == 0 ? 'text-foreground/70' : 'text-foreground/30 line-through'
                            }`}
                        >
                            {position}
                        </p>
                    ))}
                </div>
                {job.description && (
                    <div className="mt-2 text-sm leading-relaxed text-foreground/50">
                        <LexicalRenderer content={job.description} />
                    </div>
                )}
                <div className="mt-4 inline-flex flex-wrap gap-2">
                    {(job.tags ?? []).map(({ tag }) => (
                        <span
                            className="rounded-md border-[1px] border-purple border-opacity-15 bg-purple bg-opacity-10 px-1.5 py-1 text-xs text-purple"
                            key={tag}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
