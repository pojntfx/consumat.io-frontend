const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: false,
    skipWaiting: false,
    runtimeCaching,
  },
  env: {
    PROXIED_API_URL: process.env.PROXIED_API_URL,
  },
  target: "serverless",
});
