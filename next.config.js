/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	env: {
		IS_SERVER: true,
	},
};

export default nextConfig;
