import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["apple-touch-icon.png"],
      manifest: {
        name: "Xarajatlar Trakeri",
        short_name: "Hisobim",
        description:
          "Kirim va chiqimlarni yuritish, kunlik/oylik/yillik xarajatlar tahlili",
        theme_color: "#0F1326",
        background_color: "#0F1326",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        lang: "uz",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // App shell (HTML/CSS/JS) keshlanadi — ochilish tezlashadi.
        // API so'rovlari (/api/*) hech qachon keshlanmaydi, doim serverdan yangi
        // ma'lumot olinadi — shu bilan eski/keshlangan sahifa muammosi oldini olinadi.
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://expense-tracker-cieg.onrender.com/",
        changeOrigin: true,
      },
    },
  },
});
