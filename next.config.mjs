/** @type {import('next').NextConfig} */
import { basePath } from './helper.mjs';

const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    reactStrictMode: true,
    basePath,
    assetPrefix: `${basePath}/`,
    experimental: {
        esmExternals: 'loose',
    },
    webpack: (config) => {
        config.externals = [...config.externals, { canvas: 'canvas' }];
        return config;
    },
};

export default nextConfig;
