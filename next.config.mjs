/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com", // Add this line
        port: "",
      },
    ],
  },
};

export default nextConfig;
