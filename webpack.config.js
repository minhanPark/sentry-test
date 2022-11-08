const SentryWebpackPlugin = require("@sentry/webpack-plugin");

module.exports = {
  // other webpack configuration
  devtool: "source-map",
  plugins: [
    new SentryWebpackPlugin({
      // sentry-cli configuration - can also be done directly through sentry-cli
      // see https://docs.sentry.io/product/cli/configuration/ for details
      authToken:
        "e603de6522c34215a2cc12963168e5357726d23a13d942caa87ca8ba0b7bca18",
      org: "example-org",
      project: "test1",
      release: "0.1.0",

      // other SentryWebpackPlugin configuration
      include: ".",
      ignore: ["node_modules", "webpack.config.js"],
    }),
  ],
};
