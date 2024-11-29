<script lang="ts">
    import { page } from "$app/stores";
    import LogoHorizontal from "$assets/images/logo-horizontal.svelte";
    import type { User } from "$lib/models/user";
    import { Button } from "$components/ui/button";

    interface Props {
        user?: User;
        handleSignOut: () => void;
    }
    
    const { user, handleSignOut }: Props = $props();
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
                    <LogoHorizontal />
                </a>
            </div>
            {#if !user}
                <Button
                    class="my-auto self-stretch text-sm leading-7 text-secondary"
                    variant="link"
                    href="/login"
                >
                    Sign in
                </Button>
            {:else}
                <div class="flex items-center gap-4">
                    <span class="text-primary">Hello {user.username}!</span>
                    <Button class="text-sm leading-7 text-secondary" variant="link" onclick={handleSignOut}>
                        Sign out
                    </Button>
                </div>
            {/if}
        </div>
    </nav>
{/if}
