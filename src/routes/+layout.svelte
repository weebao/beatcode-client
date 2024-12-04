<script lang="ts">
    import "../app.postcss";
    import type { PageData } from "./$types";
    import { Navbar } from "$components/main/navbar";
    import { Toaster } from "$components/ui/sonner";
    interface Props {
        children?: import("svelte").Snippet;
        data: PageData;
    }

    let { children, data }: Props = $props();
</script>

<svelte:head>
    <title>BeatCode</title>
</svelte:head>

<Navbar user={data.user} />
<Toaster />
<main class="min-h-navscreen px-4 pt-[1px]">
    {@render children?.()}
</main>
