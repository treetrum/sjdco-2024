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
                purple: 'rgb(var(--color-purple) / <alpha-value>)',
                foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
                'bg-gradient-end': 'rgb(var(--color-bg-gradient-end) / <alpha-value>)',
                'bg-gradient-start': 'rgb(var(--color-bg-gradient-start) / <alpha-value>)',
            },
            backgroundImage: {
                'gradient-radial': `radial-gradient(circle at top center, rgb(var(--color-bg-gradient-start)) 0% 15%, rgb(var(--color-bg-gradient-end)) 100%);`,
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
export default config;
