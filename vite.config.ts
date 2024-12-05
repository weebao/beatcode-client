import { purgeCss } from "vite-plugin-tailwind-purgecss";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    plugins: [sveltekit(), purgeCss()],
    optimizeDeps: {
        include: ["gsap"]
    },
    ssr: {
        noExternal: ["gsap"]
    },
    resolve: {
        alias: {
            $lib: path.resolve("./src/lib")
        }
    }
});
