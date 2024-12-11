<script lang="ts">
    import { type Infer, superForm } from "sveltekit-superforms";

    import type { PageData } from "./$types";
    import { slide } from "svelte/transition";
    import type { RoomSettingsSchema, JoinRoomSchema, RoomInfo } from "$models/room";

    import Logo from "$assets/icons/logo.svelte";
    import * as Form from "$components/ui/form";
    import * as Dialog from "$components/ui/dialog";
    import { Input } from "$components/ui/input";
    import { Button, buttonVariants } from "$components/ui/button";
    import { RoomSettingsForm } from "$components/game/room";
    import { announce } from "$lib/utils";
    import { Separator } from "$components/ui/separator";
    import { Search } from "lucide-svelte";
    import { createWebSocket } from "$lib/websocket.svelte";
    import { toast } from "svelte-sonner";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let query = $state<string>("");
    let roomList = $state<RoomInfo[]>([]);
    let filteredRoomList = $derived<RoomInfo[]>(roomList.filter(room => query.trim() === "" || room.host_display_name.toLowerCase().includes(query.toLowerCase())));

    const ws = createWebSocket(data?.token ?? "");
    if (data.user) {
        ws.setUrl(`${data.webSocketUrl}/rooms/lobby`);
        ws.connect();
        toast("Connecting to lobby...");
    }

    $effect(() => {
        if (ws.message && ws.message.type === "room_list") {
            roomList = ws.message.rooms ?? [];
        }
    });

</script>

<svelte:head>
    <title>BeatCode</title>
</svelte:head>

<div class="mx-auto mt-16 max-w-[1280px] flex flex-col space-y-4 px-8">
    <h1 class="mb-4 font-icon text-6xl text-center font-medium">Lobby</h1>
    <div class="w-full relative">
        <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="text" placeholder="Search rooms..." class="w-full pl-8" bind:value={query}/>
    </div>
    <div class="space-y-2">
        {#if filteredRoomList.length === 0}
            <p class="mt-4 text-center">No rooms found</p>
        {/if}
        {#each filteredRoomList as room}
            <div class="rounded-lg border border-secondary p-4 flex justify-between items-center" transition:slide|global>
                 <div>
                     <h2 class="text-xl font-semibold">{room.host_display_name}'s Room</h2>
                     <p class="text-sm">Players: {room.player_count}/2</p>
                 </div>
                 <Button class="ml-4" href="/room/{room.room_code}">Join Room</Button>
            </div>
        {/each}
    </div>
</div>

<style>
</style>
