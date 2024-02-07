'use client';

import type { Project as ProjectType } from '../../../shared/payload-types';
import { LexicalRenderer } from '@/utils/lexical/LexicalRenderer';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { useLivePreview } from '@/utils/live-preview/useLivePreview';
import Image from 'next/image';

export const Project = ({ project: initialProject }: { project: ProjectType }) => {
    const { data: project } = useLivePreview<ProjectType>({
        initialData: initialProject,
        serverURL: process.env.NEXT_PUBLIC_CMS_URL!,
    });

    const hasLink = project.url != null && project.url != '';
    const LinkOrSpan = hasLink
        ? ({
              children,
              ...restProps
          }: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
              <a href={project.url!} target="_blank" {...restProps}>
                  {children}
              </a>
          )
        : 'span';

    return (
        <div className="mt-8 first:mt-0 sm:flex" key={project.title}>
            <div className="mb-4 w-[150px] flex-shrink-0 text-base sm:block md:w-[200px] md:text-lg">
                <LinkOrSpan>
                    {project.icon && (
                        <Image
                            className="rounded-xl shadow"
                            src={
                                typeof project.icon == 'string'
                                    ? project.icon
                                    : project.icon.url ?? ''
                            }
                            width={70}
                            height={70}
                            alt=""
                        />
                    )}
                </LinkOrSpan>
            </div>
            <div className="flex w-auto flex-col">
                <div className="flex-shrink-0 ">
                    <h4 className="md:text-l mb-1 text-base ">
                        <LinkOrSpan className="hover:text-purple group flex items-center gap-2 no-underline">
                            <span>{project.title}</span>
                            {hasLink && (
                                <svg
                                    width={16}
                                    height={16}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960"
                                    fill="currentColor"
                                    className="transition-transform  group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                                >
                                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                                </svg>
                            )}
                        </LinkOrSpan>
                    </h4>
                </div>
                <div className="mt-1">
                    <p className="text-foreground/70 mt-2 text-xs font-semibold uppercase first:mt-0 md:font-semibold">
                        {project.subtitle}
                    </p>
                </div>
                <div className="text-foreground/50 mt-2 text-sm leading-relaxed">
                    <LexicalRenderer content={project.description} />
                </div>
                <div className="mt-4 inline-flex flex-wrap gap-2">
                    {(project.tags ?? []).map(({ tag }) => (
                        <span
                            className="border-purple bg-purple text-purple rounded-md border-[1px] border-opacity-15 bg-opacity-10 px-1.5 py-1 text-xs"
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
