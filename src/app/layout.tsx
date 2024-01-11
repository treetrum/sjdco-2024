import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Sam Davis - Web Developer',
    description: 'A passionate web developer working in Sydney, Australia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
                <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1A0033" />
            </head>
            <body className={`${inter.className} bg-bg-gradient-end`}>
                <div className="bg-gradient-radial fixed left-0 top-0 h-lvh w-screen"></div>
                <div className="z-1 selection:text-bg-gradient-start relative text-pretty text-sm leading-relaxed selection:bg-purple sm:text-base sm:leading-relaxed ">
                    {children}
                </div>
            </body>
        </html>
    );
}
