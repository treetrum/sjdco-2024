import { DraftModeButton } from '@/components/DraftModeButton';
import { ThemeHead } from '@/components/ThemeController';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Analytics } from '@vercel/analytics/react';
import { type Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Sam Davis - Web Developer',
    description: 'Passionate and experienced web developer from Sydney, Australia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <ThemeHead />
            </head>
            <body className={`${inter.className} bg-bg-gradient-end`}>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <div className="bg-gradient-radial fixed left-0 top-0 h-lvh w-screen"></div>
                    <div className="z-1 selection:bg-purple selection:text-bg-gradient-start relative text-pretty text-sm leading-relaxed sm:text-base sm:leading-relaxed ">
                        <DraftModeButton />
                        {children}
                    </div>
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
