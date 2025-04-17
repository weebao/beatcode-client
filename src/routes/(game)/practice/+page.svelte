<script lang="ts">
    import type { PageProps } from "./$types";
    import { Game } from "$components/game";
    import PromptSignIn from "$components/misc/prompt-sign-in.svelte";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>Practice - BeatCode</title>
</svelte:head>

{#if data?.user}
    <Game user={data.user} token={data.token} url={`${data.websocketUrl}/practice`} />
{/if}

<PromptSignIn user={data.user} loginUrl={"/login"} guestAction="?/playAsGuest" />
