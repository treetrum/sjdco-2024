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
            <body
                className={[
                    inter.className,
                    'leading-7',
                    'text-md',
                    'text-white',
                    'text-opacity-65',
                    'bg-gradient-radial',
                    'selection:bg-purple',
                    'selection:text-gradientPurpleDark',
                ].join(' ')}
            >
                {children}
            </body>
        </html>
    );
}
