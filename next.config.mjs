/** @type {import('next').NextConfig} */
const basePath = process.env.NODE_ENV === 'production' ? '/hoghacks' : '';

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  basePath,
  assetPrefix: `${basePath}/`
};

export default nextConfig;
