import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tempo } from "tempo-devtools/dist/vite";
import path from 'node:path';
import mdx from "@mdx-js/rollup";
import rehypeHighlight from "rehype-highlight";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tempo(),
    { enforce: 'pre', ...mdx({ rehypePlugins: [rehypeHighlight] }) },
    react({ include: /\.(jsx|tsx|mdx)$/ }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src")
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
});
