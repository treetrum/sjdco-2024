import { ReactNode } from 'react';

interface ContentBlockProps {
    title: ReactNode;
    secondaryTitle?: ReactNode;
    tertiaryTitle?: ReactNode;
    content: ReactNode;
}

export const ContentBlock = (props: ContentBlockProps) => {
    return (
        <div className="mt-8 first:mt-0 sm:flex">
            {props.secondaryTitle != undefined && (
                <div className="hidden sm:mb-0 sm:block sm:w-[150px] sm:flex-shrink-0 sm:text-base sm:text-white md:w-[200px] md:text-xl">
                    {props.secondaryTitle}
                </div>
            )}
            <div className="flex w-auto flex-col">
                <div className="flex-shrink-0 ">
                    <h4 className="mb-1 text-base text-white md:text-xl">
                        <span>{props.title}</span>{' '}
                        {props.secondaryTitle != undefined && (
                            <span className="text-right text-white text-opacity-50 sm:hidden">
                                ({props.secondaryTitle})
                            </span>
                        )}
                    </h4>
                </div>
                {props.tertiaryTitle && (
                    <p className="mt-1 text-sm font-semibold  text-white text-opacity-70 md:text-lg md:font-normal">
                        {props.tertiaryTitle}
                    </p>
                )}
                <div className="mt-2">{props.content}</div>
            </div>
        </div>
    );
};
