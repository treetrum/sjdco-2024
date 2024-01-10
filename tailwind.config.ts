import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                purple: '#A268FF',
                text: '#A59FAD',
                gradientPurpleLight: '#1A0033',
                gradientPurpleDark: '#0D001A',
            },
            backgroundImage: ({ theme }) => ({
                'gradient-radial-sm': `radial-gradient(circle at top center, ${theme(
                    'colors.gradientPurpleLight',
                )} 0% 15%, ${theme('colors.gradientPurpleDark')} 100%);`,
            }),
        },
    },
    plugins: [],
};
export default config;
