import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve("src", "react-use-print/index.ts"),
      name: "react-use-print",
      fileName: (format) => `react-use-print.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [
    react(),
    dts({
      include: ["src/react-use-print/index.ts"],
      // beforeWriteFile: (filePath, content) => ({
      //   content,
      // }),
    }),
  ],
});
