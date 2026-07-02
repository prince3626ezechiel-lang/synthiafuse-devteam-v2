/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export 100% statique : déployable sur Netlify / Cloudflare Pages / GitHub Pages
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true }
};

export default nextConfig;
