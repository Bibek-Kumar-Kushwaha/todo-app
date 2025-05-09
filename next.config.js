import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  outputFileTracingExcludes: {
    './generated/client/**': true
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /__tests__/
      })
    );
    return config;
  },
};
