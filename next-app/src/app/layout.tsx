import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Sam Davis - Web Developer',
    description: 'Passionate and experienced web developer from Sydney, Australia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const theme = cookies().get('theme');
    const isDark = theme?.value !== 'light';

    return (
        <html lang="en" className={isDark ? 'dark' : ''}>
            <head>
                {isDark ? (
                    <meta name="theme-color" content="#1A0033" />
                ) : (
                    <meta name="theme-color" content="#FFFFFF" />
                )}
            </head>
            <body className={`${inter.className} bg-bg-gradient-end`}>
                <div className="bg-gradient-radial fixed left-0 top-0 h-lvh w-screen"></div>
                <div className="z-1 selection:bg-purple selection:text-bg-gradient-start relative text-pretty text-sm leading-relaxed sm:text-base sm:leading-relaxed ">
                    {children}
                </div>
                <Analytics />
            </body>
        </html>
    );
}
