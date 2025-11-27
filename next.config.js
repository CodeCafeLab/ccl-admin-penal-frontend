const nextConfig = {
  // Removed rewrites - we're using Next.js API routes to proxy to backend
  // This allows us to handle CORS and add custom logic in the API routes
  // The API routes in src/app/api/* will handle proxying to the backend
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'codecafelab.in',
      },
      {
        protocol: 'https',
        hostname: 'www.codecafelab.in',
      },
      {
        protocol: 'https',
        hostname: 'admin.codecafelab.in',
      },
      {
        protocol: 'https',
        hostname: 'adminb.codecafelab.in',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '**.pixabay.com',
      }
    ],
    // Fallback for any other domains
    unoptimized: false,
  },
};

export default nextConfig;
