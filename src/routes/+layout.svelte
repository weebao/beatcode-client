<script lang="ts">
    import "../app.postcss";
    import type { PageData } from "./$types";
    import { Navbar } from "$components/main/navbar";
    import { Toaster } from "$components/ui/sonner";
    import { dev } from "$app/environment";

    import { onMount } from "svelte";
    import { injectAnalytics } from "@vercel/analytics/sveltekit";
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

    interface Props {
        children?: import("svelte").Snippet;
        data: PageData;
    }

    let { children, data }: Props = $props();

    onMount(() => {
        injectAnalytics({ mode: dev ? "development" : "production" });
        injectSpeedInsights();
    });
</script>

<svelte:head>
    <title>BeatCode</title>
</svelte:head>

<Navbar user={data.user} />
<Toaster />
<main class="min-h-navscreen px-4 pt-[1px]">
    {@render children?.()}
</main>
