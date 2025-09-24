/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      // {
      //   protocol: 'https',
      //   hostname: 'i.ibb.co.com',
      // },
      {
<<<<<<< HEAD
        protocol: 'https',
        hostname: 'i.ibb.co',
=======
        protocol: "https",
        hostname: "i.ibb.co.com",
>>>>>>> 47c965dfa7871c2705348677017417a4531b3379
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      }
    ],
  },
};

export default nextConfig;
