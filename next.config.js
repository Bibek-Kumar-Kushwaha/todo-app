const { IgnorePlugin } = require('webpack');

module.exports = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  }, 
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new IgnorePlugin({
        resourceRegExp: /__tests__/
      })
    );
    return config;
  },
};
