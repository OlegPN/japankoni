/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export для упаковки в Capacitor APK
  output: "export",
  // next/image без оптимизации (работает в статике)
  images: { unoptimized: true },
  // Trailing slashes — упрощают раздачу файлов в WebView
  trailingSlash: true,
};

export default nextConfig;
