<script lang="ts">
    import { page } from "$app/stores";
    import LogoWithText from "$images/logo-with-text.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { fetchUserData, user } from "$models/user";

    let loading = true;

    onMount(async () => {
        const token = localStorage.getItem("access_token");
        if (token) {
            await fetchUserData(token);
        }
        loading = false;
    });

    async function handleSignOut() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        user.set(null);
        await goto("/login");
    }
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
            {#if !loading}
                {#if !$user}
                    <button
                        class="my-auto self-stretch text-sm leading-7 text-secondary"
                        on:click={() => goto("/login")}
                    >
                        Sign in
                    </button>
                {:else}
                    <div class="flex items-center gap-4">
                        <span class="text-primary">Hello {$user.username}!</span>
                        <button class="text-sm leading-7 text-secondary" on:click={handleSignOut}>
                            Sign out
                        </button>
                    </div>
                {/if}
            {/if}
        </div>
    </nav>
{/if}
