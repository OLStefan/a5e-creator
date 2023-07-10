import baseConfig from './next.config.bak.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
	...baseConfig,
	output: 'export',
	basePath: process.env.BASE_PATH,
	env: {
		...baseConfig.env,
		NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH,
	},
};

export default nextConfig;
