const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  env: {
    version: require('./package.json').version,
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV !== 'production',
  },
  excludeFile: (str) => /cypress\/\*/.test(str), // Exclude changes to test files
})
