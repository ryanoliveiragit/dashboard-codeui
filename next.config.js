/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  images: {
    domains: ['logowik.com', 'upload.wikimedia.org', 'cdn.discordapp.com', 'i0.wp.com/css-tricks.com'], //aqui vai o domain do backend
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push(
      {
        test: /\.(mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/video/[name][ext][query]',
        },
      }
    );

    if (isServer) {
      config.externals.push('fs');
    }

    return config;
  },
};
