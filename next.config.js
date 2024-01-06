module.exports = {
  images: {
    domains: ['logowik.com', 'www.nextplc.co.uk', 'cdn.discordapp.com'], //aqui vai o domain do backend
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
