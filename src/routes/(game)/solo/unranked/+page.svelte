<script lang="ts">
    import type { PageData } from "./$types";
    import { Shell } from "lucide-svelte";
    import { createWebSocket } from "$lib/websocket.svelte";
    import { goto } from "$app/navigation";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const ws = createWebSocket(data?.token ?? "");
    if (data.user) {
        ws.setUrl(`${data.webSocketUrl}/game/queue`);
        ws.connect();
    }

    $effect(() => {
        if (ws.message && ws.message.type === "match_found") {
            goto(`/game/${ws.message.data.game_id}`);
        }
    });
</script>

<svelte:head>
    <title>Solo Unranked</title>
</svelte:head>

<div
    class="mx-auto mt-16 flex h-full max-w-96 flex-col items-center space-y-4 rounded-lg border border-secondary p-6"
>
    <Shell class="h-10 w-10 animate-pulse" />
    <h1 class="mb-4 text-center font-icon text-4xl font-medium">Solo Unranked</h1>
    <div>Matchmaking</div>
</div>

<style>
</style>
