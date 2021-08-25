const withTM = require('next-transpile-modules')(['@chngl/jellojs']);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['dl.airtable.com'],
  },
});
