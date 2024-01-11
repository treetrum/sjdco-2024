import Intro from '../content/intro.mdx';
import employment from '../content/employment-history.json';
import technicalSkills from '../content/technical-skills.json';
import { SocialIcons } from './components/SocialIcons';

export default function Home() {
    return (
        <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col items-start gap-12 px-6 py-12 sm:px-16 sm:py-16 lg:flex-row lg:gap-16 lg:py-24">
            <aside className="top-24 flex w-full flex-col gap-3 lg:sticky lg:max-w-[300px] xl:max-w-[390px]">
                <h1 className="text-4xl font-bold text-purple sm:text-5xl">Sam Davis</h1>
                <h5 className="text-lg text-white sm:text-xl">Web Developer</h5>
                <p>
                    A passionate web developer
                    <br />
                    working in Sydney, Australia
                </p>
                <SocialIcons />
            </aside>
            <main className="prose w-full ">
                <div className="space-y-5">
                    <Intro />
                </div>
                <div className="mt-12 lg:mt-20">
                    <h3 className="text-xl font-bold text-purple sm:text-2xl">
                        Employment History
                    </h3>
                    <div className="mt-4 sm:mt-8">
                        {employment.jobs.map((job) => (
                            <div className="mt-8 first:mt-0 sm:flex" key={job.company}>
                                <div className="hidden sm:mb-0 sm:block sm:w-[150px] sm:flex-shrink-0 sm:text-base sm:text-white md:w-[200px] md:text-lg">
                                    {job.years}
                                </div>
                                <div className="flex w-auto flex-col">
                                    <div className="flex-shrink-0 ">
                                        <h4 className="mb-1 text-base text-white md:text-lg">
                                            <span>{job.company}</span>{' '}
                                            <span className="text-right text-white text-opacity-50 sm:hidden">
                                                ({job.years})
                                            </span>
                                        </h4>
                                    </div>
                                    <div className="mt-1">
                                        {job.titles.map((t, i) => (
                                            <p
                                                key={t}
                                                className={`mt-2 text-xs font-semibold uppercase text-white text-opacity-70 first:mt-0 md:font-semibold ${
                                                    i == 0 ? '' : 'text-opacity-30 line-through'
                                                }`}
                                            >
                                                {t}
                                            </p>
                                        ))}
                                    </div>
                                    {job.content && (
                                        <div className="mt-2 text-sm leading-relaxed">
                                            {job.content}
                                        </div>
                                    )}
                                    <div className="mt-4 inline-flex flex-wrap gap-2">
                                        {job.technologies.map((t) => (
                                            <span
                                                className="rounded-md border-[1px] border-purple border-opacity-15 bg-purple bg-opacity-10 px-1.5 py-1 text-xs text-purple"
                                                key={t}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 lg:mt-20">
                    <h3 className="text-xl font-bold text-purple sm:text-2xl">Technical skills</h3>
                    <div className="pt-4 sm:pt-4">
                        {technicalSkills.skills.map((skill, i) => (
                            <div className="mt-8 flex w-auto flex-col first:mt-0 sm:flex" key={i}>
                                <div className="flex-shrink-0 ">
                                    <h4 className="mb-1 text-base text-white md:text-lg">
                                        <span>{skill.category}</span>
                                    </h4>
                                </div>
                                <div className="mt-1 text-sm leading-relaxed">{skill.content}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
