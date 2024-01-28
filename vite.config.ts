import { defineConfig } from "vite";
import pkg from "./package.json";
import { qwikVite } from "@builder.io/qwik/optimizer";
import tsconfigPaths from "vite-tsconfig-paths";

const { dependencies = {}, peerDependencies = {} } = pkg as any;
const makeRegex = (dep) => new RegExp(`^${dep}(/.*)?$`);
const excludeAll = (obj) => Object.keys(obj).map(makeRegex);

export default defineConfig(() => {
  return {
    build: {
      target: "es2020",
      lib: {
        entry: "./src/index.ts",
        formats: ["es", "cjs"],
        fileName: (format) => `index.qwik.${format === "es" ? "mjs" : "cjs"}`,
      },
      rollupOptions: {
        // externalize deps that shouldn't be bundled into the library
        external: [
          /^node:.*/,
          ...excludeAll(dependencies),
          ...excludeAll(peerDependencies),
        ],
      },
    },
    plugins: [qwikVite(), tsconfigPaths()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData(source: string, filePath: string) {
            if (filePath.includes("styles/presets") || filePath.includes("styles/mixins")) return source;

            // Use additionalData from legacy nuxt scss options
            return (
              `
            @use 'sass:math';
            @use 'sass:list';
            @use 'sass:color';
            @import "./src/assets/styles/presets";
            @import "./src/assets/styles/mixins";
            ` + source
            );
          },
        },
      },
    },
  };
});
