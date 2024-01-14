import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import './globals.css';

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
                <div className="fixed left-0 top-0 h-lvh w-screen bg-gradient-radial"></div>
                <div className="z-1 relative text-pretty text-sm leading-relaxed selection:bg-purple selection:text-bg-gradient-start sm:text-base sm:leading-relaxed ">
                    {children}
                </div>
            </body>
        </html>
    );
}
