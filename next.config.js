const withPWA = require("next-pwa");

module.exports = withPWA({
  // pwa: {
  //   dest: "public",
  //   disable: true,
  // },
  env: {
    PROXIED_API_URL: process.env.PROXIED_API_URL,
  },
  target: "serverless",
});
