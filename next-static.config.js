/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	basePath: $BASE_PATH,
	env: {
		NEXT_PUBLIC_BASE_PATH: $BASE_PATH,
	},
};

export default nextConfig;
