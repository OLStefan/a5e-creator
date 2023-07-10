import baseConfig from './next.config.bak.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
	...baseConfig,
	output: 'standalone',
};

export default nextConfig;
