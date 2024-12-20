/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Match all favicon related files
        source: '/:file(favicon.ico|favicon-16x16.png|favicon-32x32.png|apple-touch-icon.png|android-chrome-192x192.png|android-chrome-512x512.png|site.webmanifest)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 