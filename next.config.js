/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: '/v0/b/blog-crm-3db84.appspot.com/**',
        }
    ]
  }
}
const removeImports = require('next-remove-imports')();
module.exports = {...removeImports({}), ...nextConfig};


