/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	basePath: process.env.BASE_PATH,
	env: {
		NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH,
	},
};

export default nextConfig;
