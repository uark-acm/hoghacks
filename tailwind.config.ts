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
                'th-background': 'var(--background)',
                lilac: {
                    50: '#f8fafb',
                    100: '#e9f0fb',
                    200: '#d0d9f8',
                    300: '#aab5ec',
                    500: '#8e7cc3',
                    600: '#7060a4',
                    700: '#534586',
                    800: '#372c6a',
                    900: '#1a144e',
                }
            },
            keyframes: {
                wobble: {
                    '0%': {
                        transform: 'rotate(0deg) ease-out'
                    },
                    '20%': {
                        transform: 'rotate(-15deg)'
                    },
                    '40%': {
                        transform: 'rotate(12deg)'
                    },
                    '60%': {
                        transform: 'rotate(-6deg)'
                    },
                    '80%': {
                        transform: 'rotate(4deg)'
                    },
                    '100%': {
                        transform: 'rotate(0deg)'
                    }
                }
            },
            animation: {
                wobble: 'wobble 1s ease-in-out 1',
            },
        },
    },
    plugins: [],
};

export default config;
