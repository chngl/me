const webpack = require('webpack')
const dotenv = require('dotenv');

// since my .env is in the root folder, we don't have to pass a path to the config
const { parsed } = dotenv.config();

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['dl.airtable.com'],
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(parsed))
    return config;
  }
}
