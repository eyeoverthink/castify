/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'replicate.delivery',
      'oaidalleapiprodscus.blob.core.windows.net',
      'pbxt.replicate.delivery'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  experimental: {
    serverActions: true
  },
  async headers() {
    return [
      {
        source: '/api/local-files/:type/:filename',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig
