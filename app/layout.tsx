import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'ACM HogHacks',
    description: 'Website for the ACM HogHacks Hackathon',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang={'en'}>
            <body>{children}</body>
        </html>
    );
}

export default RootLayout;