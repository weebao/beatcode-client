<script lang="ts">
    import "../app.postcss";
    import Navbar from "$lib/components/macro/navbar.svelte";
    import { Toaster } from "$lib/components/ui/sonner";
</script>

<svelte:head>
    <title>BeatCode</title>
</svelte:head>

<Navbar />
<Toaster />
<main class="min-h-navscreen bg-background">
    <slot />
</main>
