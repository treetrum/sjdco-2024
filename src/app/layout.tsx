import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Sam Davis - Web Developer',
    description: 'A passionate web developer working out of Sydney, Australia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta name="theme-color" content="#1A0033" />
            </head>
            <body className={inter.className}>
                <div className="bg-gradient-radial-sm text-sm leading-relaxed text-white text-opacity-50 selection:bg-purple selection:text-gradientPurpleDark sm:text-base sm:leading-relaxed">
                    {children}
                </div>
                <div className="h-2 w-full bg-purple"></div>
            </body>
        </html>
    );
}
