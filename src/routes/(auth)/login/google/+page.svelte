<script lang="ts">
    import type { PageProps } from "./$types";
    import * as Card from "$components/ui/card";
    import Logo from "$assets/icons/logo.svelte";
    import { log } from "$lib/utils";

    let { data }: PageProps = $props();

    $effect(() => {
        if (data.status === "success") {
            window.location.assign(data.url);
        } else {
            log(data.message);
        }
    });
</script>

<svelte:head>
    <title>Log in with Google - BeatCode</title>
</svelte:head>

<div class="flex justify-center bg-background">
    <Card.Root class="mt-12 h-fit max-w-[600px] px-8 py-4">
        <Card.Header>
            <div class="flex w-full flex-col items-center">
                <Logo class="h-12 w-full" />
            </div>
        </Card.Header>
        <Card.Content class="text-center">
            {#if data.status === "success"}
                <p class="mb-2 text-2xl font-semibold">Checking you in with Google...</p>
            {:else}
                <p class="text-2xl font-semibold">Something went wrong.</p>
            {/if}
        </Card.Content>
    </Card.Root>
</div>
