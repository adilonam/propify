/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next 16 defaults to [75] only; allow higher quality for marketing product art.
    qualities: [75, 92],
  },
}

export default nextConfig
