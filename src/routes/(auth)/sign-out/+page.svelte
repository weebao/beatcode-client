<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { goto, invalidateAll } from "$app/navigation";
    import * as Card from "$components/ui/card";
    import LogoVertical from "$assets/images/logo-vertical.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    onMount(() => {
        if (data.status === "success") {
            invalidateAll();
            goto("/");
        }
    });
</script>

<svelte:head>
    <title>Signing out</title>
</svelte:head>

<div class="flex h-navscreen justify-center bg-background">
    <Card.Root class="mt-12 h-fit max-w-[600px] p-4">
        <Card.Header>
            <div class="flex w-full flex-col items-center">
                <LogoVertical class="h-24 w-full" />
            </div>
        </Card.Header>
        <Card.Content class="text-center">
            {#if data.status === "success"}
                <p class="mb-2 text-xl">You are logged out. Redirecting you...</p>
                <p>
                    Honestly, you shouldn't even be seeing this since it normally goes very fast.
                    The fact you're seeing this is either your computer is slow or you're just
                    unlucky :)
                </p>
            {:else}
                <p class="text-xl">An error occurred while sign out.</p>
            {/if}
        </Card.Content>
    </Card.Root>
</div>
