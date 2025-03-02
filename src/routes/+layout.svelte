<script lang="ts">
    import "../app.postcss";
    import type { LayoutProps } from "./$types";
    import { fade } from "svelte/transition";
    import { Navbar } from "$components/main/navbar";
    import Header from "$components/main/header.svelte";
    import Footer from "$components/main/footer.svelte";
    import { Toaster } from "$components/ui/sonner";

    let { children, data }: LayoutProps = $props();
</script>

<Header />

<Navbar user={data.user} />
<Toaster />
{#key data.pathname}
    <div class="absolute w-full" transition:fade={{ duration: 150 }}>
        <main class="relative min-h-fullscreen px-4 pt-[1px]">
            {@render children?.()}
        </main>
        <Footer />
    </div>
{/key}
