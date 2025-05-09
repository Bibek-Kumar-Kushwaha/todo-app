// next.config.js
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  outputFileTracingExcludes: {
    // glob '*' = every page/route
    '*': ['./generated/client/**']
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /__tests__/ })
    )
    return config
  },
}
