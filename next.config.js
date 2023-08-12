/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {unoptimized: true},
  //compress: false,
  trailingSlash: true,
  reactStrictMode: false,
   /*i18n: {
     locales: ["tr"],
     defaultLocale: "tr"
   },*/
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //config.optimization = { minimize: false }
    config.optimization.minimizer = []
    config.experiments = { ...config.experiments, topLevelAwait: true }
    config.optimization.minimize = false;

    return config;
  },
};

module.exports = nextConfig;
