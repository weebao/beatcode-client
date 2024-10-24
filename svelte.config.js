import adapter from '@sveltejs/adapter-auto';
import path from 'path';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte'],
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: [vitePreprocess()],

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter(),
        alias: {
            $assets: path.resolve('./src/lib/assets'),
            $components: path.resolve('./src/lib/components'),
            $icons: path.resolve('./src/lib/assets/icons'),
            $images: path.resolve('./src/lib/assets/images'),
            $lib: path.resolve('./src/lib'),
            $stores: path.resolve('./src/lib/stores'),
            $types: path.resolve('./src/lib/types'),
            $utils: path.resolve('./src/lib/utils')
        }
    }
};
export default config;
