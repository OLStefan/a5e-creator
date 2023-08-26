import baseConfig from './next.config.bak.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
	...baseConfig,
	output: 'standalone',
	onDemandEntries: {
		maxInactiveAge: 60 * 1000,
		pagesBufferLength: 2,
	},
};

export default nextConfig;
