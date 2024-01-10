import { SocialIcons } from './social-icons';
import Intro from '../content/intro.mdx';
import { ContentBlock } from './components/ContentBlock';
import employment from '../content/employment-history.json';
import technicalSkills from '../content/technical-skills.json';

export default function Home() {
    return (
        <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col items-start gap-12 px-6 py-12 sm:px-12 lg:flex-row lg:gap-16 lg:py-24">
            <aside className="top-24 flex w-full flex-col gap-3 lg:sticky lg:max-w-xs">
                <h1 className="text-4xl font-bold text-purple sm:text-5xl">Sam Davis</h1>
                <h5 className="text-lg text-white sm:text-xl">Web Developer</h5>
                <p>
                    A passionate web developer
                    <br />
                    working out of Sydney, Australia
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
                            <ContentBlock
                                key={job.company}
                                title={job.company}
                                secondaryTitle={job.years}
                                tertiaryTitle={job.title}
                                content={
                                    <ul className="list-disc pl-8">
                                        {job.bulletPoints.map((point) => (
                                            <li key={point.content} className="">
                                                {point.content}
                                                {point.children ? (
                                                    <ul className="list-disc pl-8">
                                                        {point.children.map((child) => (
                                                            <li key={child.content}>
                                                                {child.content}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : null}
                                            </li>
                                        ))}
                                    </ul>
                                }
                            />
                        ))}
                    </div>
                </div>
                <div className="mt-12 lg:mt-20">
                    <h3 className="text-xl font-bold text-purple sm:text-2xl">Technical skills</h3>
                    <div className="pt-4 sm:pt-4">
                        {technicalSkills.skills.map((skill, i) => (
                            <ContentBlock key={i} title={skill.category} content={skill.content} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
