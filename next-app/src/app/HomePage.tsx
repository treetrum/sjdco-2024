'use client';

import { SocialIcons } from '../components/SocialIcons';
import { ThemeController } from '../components/ThemeController';
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
    home: Home;
    projects: ProjectType[];
    jobs: JobType[];
}

export const HomePage = (props: Props) => {
    const { data: home } = useLivePreview<Home>({
        initialData: props.home,
        serverURL: process.env.NEXT_PUBLIC_CMS_URL!,
    });

    const projects =
        home.projects
            ?.map((project) => (typeof project === 'object' ? project.id : project))
            .map((projectId) => props.projects.find(({ id }) => id === projectId))
            .filter((p): p is ProjectType => Boolean(p)) ?? [];

    const jobs =
        home.jobs
            ?.map((job) => (typeof job === 'object' ? job.id : job))
            .map((jobId) => props.jobs.find(({ id }) => id === jobId))
            .filter((j): j is JobType => Boolean(j)) ?? [];

    return (
        <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col items-start gap-12 px-6 py-12 sm:px-16 sm:py-16 lg:flex-row lg:gap-16 lg:py-24">
            <ThemeController />
            <aside className="top-24 flex w-full flex-col gap-3 lg:sticky lg:max-w-[300px] xl:max-w-[390px]">
                <h1 className="text-purple text-4xl font-bold sm:text-5xl">{home.title}</h1>
                <h5 className="text-lg sm:text-xl">{home.subtitle}</h5>
                <p
                    className="text-foreground/50"
                    dangerouslySetInnerHTML={{ __html: home.byline ?? '' }}
                ></p>
                <SocialIcons />
            </aside>
            <main className="w-full">
                <div className="prose text-foreground/50 space-y-5">
                    <LexicalRenderer content={home.intro} />
                </div>
                {projects.length > 0 && (
                    <div className="mt-12 lg:mt-20">
                        <h3 className="text-purple text-xl font-bold sm:text-2xl">
                            Personal Projects
                        </h3>
                        <div className="mt-4 sm:mt-8">
                            {projects.map((project) => (
                                <Project key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                )}
                {jobs.length > 0 && (
                    <div className="mt-12 lg:mt-20">
                        <h3 className="text-purple text-xl font-bold sm:text-2xl">
                            Employment History
                        </h3>
                        <div className="mt-4 sm:mt-8">
                            {jobs.map((job) => (
                                <Job key={job.id} job={job} />
                            ))}
                        </div>
                    </div>
                )}
                {home.technicalSkills && (
                    <div className="mt-12 lg:mt-20">
                        <h3 className="text-purple text-xl font-bold sm:text-2xl">
                            Technical skills
                        </h3>
                        <div className="pt-4 sm:pt-4">
                            {home.technicalSkills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="mt-8 flex w-auto flex-col first:mt-0 sm:flex"
                                >
                                    <div className="flex-shrink-0 ">
                                        <h4 className="mb-1 text-base md:text-lg">
                                            <span>{skill.category}</span>
                                        </h4>
                                    </div>
                                    <div className="text-foreground/50 mt-1 text-sm leading-relaxed">
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
