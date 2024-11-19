<script lang="ts">
    import "../app.postcss";
    import Navbar from "$lib/components/macro/navbar.svelte";
    import { Toaster } from "$lib/components/ui/sonner";
    interface Props {
        children?: import("svelte").Snippet;
    }

    let { children }: Props = $props();
</script>

<svelte:head>
    <title>BeatCode</title>
</svelte:head>

<Navbar />
<Toaster />
<main class="min-h-navscreen bg-background px-4 pt-[1px]">
    {@render children?.()}
</main>
