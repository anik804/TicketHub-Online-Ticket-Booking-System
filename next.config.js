// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "i.pravatar.cc",
//       },
//       {
//         protocol: 'https',
//         hostname: 'i.ibb.co.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'i.ibb.co',
//       },
//       {
//         protocol: "https",
//         hostname: "cdn-icons-png.flaticon.com",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//       {
//         protocol: "https",
//         hostname: "i.ibb.co",
//       },
//             {
//         protocol: "https",
//         hostname: "lh3.googleusercontent.com",
//       },
//       {
//         protocol: "https",
//         hostname: "avatars.githubusercontent.com", // GitHub avatars
//       },
//     ],
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "i.ibb.co.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "www.movieposters.com" },
    ],
  },
};

module.exports = nextConfig;
