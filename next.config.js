const withPWA = require("next-pwa");

module.exports = withPWA({
  env: {
    PROXIED_API_URL: process.env.PROXIED_API_URL,
  },
  target: "serverless",
});
