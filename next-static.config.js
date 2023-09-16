import baseConfig from './next.config.bak.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
	...baseConfig,
	experimental: {
		...baseConfig.experimental,
		serverActions: false,
	},
	output: 'export',
	env: {
		...baseConfig.env,
		NEXT_PUBLIC_STATIC_EXPORT: true,
	},
};

export default nextConfig;
