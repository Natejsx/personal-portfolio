import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'node:path';
import mdx from "@mdx-js/rollup";
import rehypeHighlight from "rehype-highlight";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    { enforce: 'pre', ...mdx({ rehypePlugins: [rehypeHighlight] }) },
    react({ include: /\.(jsx|tsx|mdx)$/ }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src")
    },
  },
});
