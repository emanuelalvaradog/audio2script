/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

// module.exports = {
//   webpack: function (config) {
//     config.module.rules.push({
//       test: /\.md$/,
//       use: "raw-loader",
//     });
//     return config;
//   },
//   async headers() {
//     return [
//       {
//         source: "/:path*",
//         headers: securityHeaders,
//       },
//     ];
//   },
//   trailingSlash: true,
//   exportPathMap: async function (
//     defaultPathMap,
//     { dev, dir, outDir, distDir, buildId }
//   ) {
//     return {
//       "/": { page: "/" },
//     };
//   },
// };
