<script lang="ts">
    import { page } from "$app/stores";
    import LogoWithText from "$images/logo-with-text.svelte";
</script>

{#if $page.url.pathname !== "/game"}
    <nav
        class="flex h-nav w-full flex-col items-center justify-center self-stretch overflow-hidden px-8 max-md:max-w-full"
    >
        <div
            class="flex min-h-[80px] w-full max-w-[1280px] flex-wrap items-center justify-between gap-10"
        >
            <div class="my-auto flex items-center gap-1.5 self-stretch whitespace-nowrap text-2xl">
                <a href="/">
                    <LogoWithText />
                </a>
            </div>
            <button class="my-auto self-stretch text-sm leading-7 text-secondary">Sign in</button>
        </div>
    </nav>
{/if}

<style>
</style>
