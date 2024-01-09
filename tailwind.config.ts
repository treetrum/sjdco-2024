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
                'gradient-radial': `radial-gradient(100% 150% at 100% 0%, ${theme(
                    'colors.gradientPurpleLight',
                )} 50%, ${theme('colors.gradientPurpleDark')} 100%);`,
            }),
        },
        backgroundImage: {},
    },
    plugins: [],
};
export default config;
