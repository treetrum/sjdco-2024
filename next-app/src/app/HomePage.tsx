'use client';

import technicalSkills from '../content/technical-skills.json';
import { SocialIcons } from '../components/SocialIcons';
import { ThemeController } from '../components/Theme';
import {
    type Project as ProjectType,
    type Home,
    Job as JobType,
} from '../../../shared/payload-types';
import { LexicalRenderer } from '@/utils/lexical/LexicalRenderer';
import { useLivePreview } from '@/utils/live-preview/useLivePreview';
import { Project } from './Project';
import { Job } from './Job';

interface Props {
    initialHomeData: Home;
    initialProjectsData: ProjectType[];
    initialJobsData: JobType[];
}

export const HomePage = ({ initialHomeData, initialProjectsData, initialJobsData }: Props) => {
    const { data } = useLivePreview<Home>({
        initialData: initialHomeData,
        serverURL: process.env.NEXT_PUBLIC_CMS_URL!,
        depth: 1,
    });

    return (
        <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col items-start gap-12 px-6 py-12 sm:px-16 sm:py-16 lg:flex-row lg:gap-16 lg:py-24">
            <ThemeController />
            <aside className="top-24 flex w-full flex-col gap-3 lg:sticky lg:max-w-[300px] xl:max-w-[390px]">
                <h1 className="text-4xl font-bold text-purple sm:text-5xl">{data.title}</h1>
                <h5 className="text-lg sm:text-xl">{data.subtitle}</h5>
                <p
                    className="text-foreground/50"
                    dangerouslySetInnerHTML={{ __html: data.byline ?? '' }}
                ></p>
                <SocialIcons />
            </aside>
            <main className="w-full">
                <div className="prose space-y-5 text-foreground/50">
                    <LexicalRenderer content={data.intro} />
                </div>
                {initialProjectsData.length > 0 && (
                    <div className="mt-12 lg:mt-20">
                        <h3 className="text-xl font-bold text-purple sm:text-2xl">
                            Personal Projects
                        </h3>
                        <div className="mt-4 sm:mt-8">
                            {initialProjectsData.map((p) => (
                                <Project project={p} key={p.id} />
                            ))}
                        </div>
                    </div>
                )}
                {initialJobsData.length > 0 && (
                    <div className="mt-12 lg:mt-20">
                        <h3 className="text-xl font-bold text-purple sm:text-2xl">
                            Employment History
                        </h3>
                        <div className="mt-4 sm:mt-8">
                            {initialJobsData.map((j) => (
                                <Job key={j.id} job={j} />
                            ))}
                        </div>
                    </div>
                )}
                {data.technicalSkills && (
                    <div className="mt-12 lg:mt-20">
                        <h3 className="text-xl font-bold text-purple sm:text-2xl">
                            Technical skills
                        </h3>
                        <div className="pt-4 sm:pt-4">
                            {data.technicalSkills.map((skill, i) => (
                                <div
                                    className="mt-8 flex w-auto flex-col first:mt-0 sm:flex"
                                    key={i}
                                >
                                    <div className="flex-shrink-0 ">
                                        <h4 className="mb-1 text-base md:text-lg">
                                            <span>{skill.category}</span>
                                        </h4>
                                    </div>
                                    <div className="mt-1 text-sm leading-relaxed text-foreground/50">
                                        {skill.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
