const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  excludeFile: (str) => /cypress\/\*/.test(str), // Exclude changes to test files
})
