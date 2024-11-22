import { Home, Job as JobType, Project as ProjectType } from '@/types/payload-types';
import { LexicalRenderer } from '@/utils/lexical/LexicalRenderer';
import { SocialIcons } from '../../components/SocialIcons';
import { ThemeController } from '../../components/ThemeController';
import { Job } from './Job';
import { Project } from './Project';
import { RefreshRouteOnSave } from './RefreshOnRouteSave';

interface Props {
    home: Home;
    projects: ProjectType[];
    jobs: JobType[];
}

export const HomePage = ({ home, projects, jobs }: Props) => {
    return (
        <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col items-start gap-12 px-6 py-12 sm:px-16 sm:py-16 lg:flex-row lg:gap-16 lg:py-24">
            <RefreshRouteOnSave />
            <ThemeController />
            <aside className="top-24 flex w-full flex-col gap-3 lg:sticky lg:max-w-[300px] xl:max-w-[390px]">
                <h1 className="text-4xl font-bold text-purple sm:text-5xl">{home.title}</h1>
                <h5 className="text-lg sm:text-xl">{home.subtitle}</h5>
                <p
                    className="text-foreground/50"
                    dangerouslySetInnerHTML={{ __html: home.byline ?? '' }}
                ></p>
                <SocialIcons />
            </aside>
            <main className="w-full">
                <div className="prose space-y-5 text-foreground/50">
                    <LexicalRenderer content={home.intro} />
                </div>
                {projects.length > 0 && (
                    <div className="mt-12 lg:mt-20">
                        <h3 className="text-xl font-bold text-purple sm:text-2xl">
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
                        <h3 className="text-xl font-bold text-purple sm:text-2xl">
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
                        <h3 className="text-xl font-bold text-purple sm:text-2xl">
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
