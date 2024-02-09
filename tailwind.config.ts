import type { Config } from 'tailwindcss';
import { colors } from './EDITME';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                ...colors,
                'th-primary': 'var(--primary)',
                'th-secondary': 'var(--secondary)',
                'th-tertiary': 'var(--tertiary)',
                'th-background': 'var(--background)'
            },
        },
    },
    plugins: [],
};

export default config;
