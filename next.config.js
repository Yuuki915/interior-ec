/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  env: {
    SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMEIN,
    SHOPIFY_STOREFRONT_ACCESSTOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  },
  images: {
    domains: ["cdn.shopify.com"],
  },
};

module.exports = nextConfig;

// ("https://cdn.shopify.com/s/files/1/0672/4494/9801/products/pexels-karolina-grabowska-4397820.jpg?v=1667426949");
