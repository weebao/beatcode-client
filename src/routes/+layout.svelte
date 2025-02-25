<script lang="ts">
    import "../app.postcss";
    import type { LayoutProps } from "./$types";
    import { fade } from "svelte/transition";
    import { Navbar } from "$components/main/navbar";
    import { Toaster } from "$components/ui/sonner";

    let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
    <title>BeatCode</title>
    <meta
        name="description"
        content="A live LeetCode battle game where you can use abilities to sabotage your oponents. Invite your friends and beat them with your code!"
    />
    <meta
        name="keywords"
        content="leetcode, battle, code, programming, magic, abilities, game, online, multiplayer, beatcode"
    />
    <meta name="author" content="BeatCode" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content="BeatCode" />
    <meta
        property="og:description"
        content="A live LeetCode battle game where you can use abilities to sabotage your oponents. Invite your friends and beat them with your code!"
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://beatcode.dev" />
    <meta property="og:image" content="https://beatcode.dev/card-img.png" />
    <meta property="og:site_name" content="BeatCode" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="BeatCode - Live LeetCode battle with abilities" />
    <meta
        name="twitter:description"
        content="A live LeetCode battle game where you can use abilities to sabotage your oponents. Invite your friends and beat them with your code!"
    />
    <meta name="twitter:image" content="https://beatcode.dev/card-img.png" />
    <meta name="twitter:site" content="@BeatCode.dev" />
</svelte:head>

<Navbar user={data.user} />
<Toaster />
{#key data.pathname}
    <div class="absolute w-full" transition:fade={{ duration: 150 }}>
        <main class="relative min-h-fullscreen px-4 pt-[1px]">
            {@render children?.()}
        </main>
        <footer class="my-4 text-center text-sm">
            Made with ❤️ by <a
                href="https://github.com/beatcode-official"
                target="_blank"
                class="font-icon underline transition-all duration-150 hover:text-primary"
                >@beatcode-official</a
            >
        </footer>
    </div>
{/key}
