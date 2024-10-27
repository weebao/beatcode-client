<script lang="ts">
    import "../app.postcss";
    import Navbar from "$lib/components/macro/navbar.svelte";
    import { Toaster } from "$lib/components/ui/sonner";
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    let showNavbar = true;

    onMount(() => {
        showNavbar = $page.url.pathname !== "/game";
    });
</script>

<svelte:head>
    <title>BeatCode</title>
</svelte:head>

{#if showNavbar}
    <Navbar />
{/if}
<Toaster />
<main class="bg-background" class:min-h-navscreen={showNavbar}>
    <slot />
</main>
