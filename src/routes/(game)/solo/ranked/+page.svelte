<script lang="ts">
    import type { PageData } from "./$types";
    import { slide } from "svelte/transition";
    import type { RoomInfo } from "$models/room";
    import { Input } from "$components/ui/input";
    import { Button } from "$components/ui/button";
    import { Search, Swords } from "lucide-svelte";
    import { createWebSocket } from "$lib/websocket.svelte";
    import { toast } from "svelte-sonner";
    import { goto } from "$app/navigation";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const ws = createWebSocket(data?.token ?? "");
    if (data.user) {
        ws.setUrl(`${data.webSocketUrl}/game/ranked-queue`);
        ws.connect();
    }

    $effect(() => {
        if (ws.message && ws.message.type === "match_found") {
            goto(`/game/${ws.message.data.game_id}`);
        }
    });
</script>

<svelte:head>
    <title>BeatCode</title>
</svelte:head>

<div class="mx-auto mt-16 flex h-full max-w-96 flex-col items-center space-y-4 p-6 border border-secondary rounded-lg">
    <Swords />
    <h1 class="mb-4 text-center font-icon text-4xl font-medium">Solo Ranked</h1>
    <div>Matchmaking...</div>
</div>

<style>
</style>
