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
            <body>
                <div>
                    <a id="mlh-trust-badge" className='right-0 md:right-[50px]' href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=white" target="_blank"><img src="https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-gray.svg" alt="Major League Hacking 2024 Hackathon Season" /></a>
                    </div>{children}</body>
        </html>
    );
}

export default RootLayout;