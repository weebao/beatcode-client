<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { type Infer, superForm } from "sveltekit-superforms";
    import { toast } from "svelte-sonner";
    import type { PageData } from "./$types";

    import { Button } from "$components/ui/button";
    import * as Dialog from "$components/ui/dialog";
    import * as Form from "$components/ui/form";
    import { Input } from "$components/ui/input";
    import StatusIndicator from "$components/misc/status-indicator.svelte";
    import { Game } from "$components/game";

    import type { ChallengeInfo, ExecutionResults, PlayerInfo } from "$models/game";

    import { Copy, Link } from "lucide-svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let { roomCode } = $state(data);
    let isDialogOpen = $state(data.user === undefined);
    let connectStatus = $state(0);

    let userInfo: PlayerInfo | undefined = $state();
    let opponentInfo: PlayerInfo | undefined = $state();
    let challengeInfo: ChallengeInfo | undefined = $state();
    let executionResults: ExecutionResults | undefined = $state();
    let isExecuting = $state(false);
    let gameStarted = $state(false);
    let winner: string | null = $state(null);

    // Establish socket and look for update
    const RETRY_LIMIT = 3;
    let socket: WebSocket;
    let retries = $state(RETRY_LIMIT);

    const connect = () => {
        socket = new WebSocket(`${data.websocketUrl}/${roomCode}`);

        socket.onopen = () => {
            toast.success("Successfully joined room");
            console.log("Connected to server");
            connectStatus = 1;
        };

        socket.onclose = () => {
            console.log("Disconnected from server");
            connectStatus = -1;
        };

        socket.onmessage = (event) => {
            const { event: e, event_data: data } = JSON.parse(event.data);
            console.log("Received:", data);

            switch (e) {
                case "game_update":
                    userInfo = data.player1;
                    opponentInfo = data.player2;
                    break;
                case "new_challenge":
                    challengeInfo = data.challenge_info;
                    gameStarted = true;
                    break;
                case "execution_results":
                    executionResults = data;
                    isExecuting = false;
                    break;
                case "game_ended":
                    winner = data.winner;
                    break;
                case "error":
                    toast.error(data.error_msg);
                    break;
                default:
                    break;
            }
        };

        socket.onerror = async (error) => {
            console.log("WebSocket Error:", error);
            if (retries > 0) {
            }
        };
    };

    const startGame = () => {
        if (!opponentInfo) {
            toast.error("Can't start game without an opponent");
            return;
        }
        socket.send(
            JSON.stringify({
                event: "start_game",
                event_data: {}
            })
        );
    };

    const submitCode = (code: string) => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            toast.error("Connection error: No socket available");
            return;
        }

        isExecuting = true;
        socket.send(
            JSON.stringify({
                event: "submit_code",
                event_data: {
                    code
                }
            })
        );
    };

    // Utils
    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    onMount(() => {
        connect();
    });
</script>

<div class="mx-auto mt-16 flex flex-col items-center">
    <h1 class="mb-2 text-5xl font-bold">Game Room</h1>
    <p class="mb-2 text-xl">Code: {roomCode}</p>
    <div class="mb-4 flex items-center gap-2">
        <Button variant="outline" size="icon" class="h-8 w-8 p-1.5" onclick={() => copy(roomCode)}>
            <Copy />
        </Button>
        <Button
            variant="outline"
            size="icon"
            class="h-8 w-8 p-1.5"
            onclick={() => copy(`http://localhost:5173/room/${roomCode}`)}
        >
            <Link />
        </Button>
    </div>
    <div class="my-4 flex items-center gap-12">
        <div class="border-1 w-[400px] rounded-xl border border-secondary p-4">
            <div class="flex items-center">
                <h2 class="mr-2 text-2xl font-semibold">{name}</h2>
                <StatusIndicator status={connectStatus} />
            </div>
            <p class="text-lg">The mightiest coder of all</p>
        </div>
        <div class="flex flex-col items-center gap-1">
            <div class="h-6 w-[2px] rounded-sm bg-secondary"></div>
            <div class="font-semibold text-secondary">VS</div>
            <div class="h-6 w-[2px] rounded-sm bg-secondary"></div>
        </div>
        <div
            class="border border-secondary ${opponentInfo
                ? ''
                : 'animate-pulse'} border-1 w-[400px] rounded-xl p-4"
        >
            <div class="flex items-center">
                <h2 class="text-2xl font-semibold">
                    {opponentInfo?.name || "Waiting for opponent..."}
                </h2>
                <div
                    class="ml-2 h-3 w-3 animate-pulse rounded-full transition-all duration-300"
                    class:bg-transparent={!opponentInfo}
                    class:bg-primary={opponentInfo}
                    class:bg-neutral={connectStatus === -1}
                ></div>
            </div>
            {#if opponentInfo}
                <p class="text-lg">The brave one who dares to challenge you</p>
            {:else}
                <p class="text-lg">Who will it be?</p>
            {/if}
        </div>
    </div>
    <Button size="lg" class="mt-4 text-lg" onclick={startGame}>Start Game</Button>
</div>
{#if gameStarted}
    <Game
        {userInfo}
        {opponentInfo}
        {challengeInfo}
        {executionResults}
        {isExecuting}
        {winner}
        {submitCode}
    />
{/if}
<!-- If not authenticated - prompt user to sign in -->
<Dialog.Root bind:open={isDialogOpen}>
    <Dialog.Content class="sm:max-w-[425px]" hideCloseButton interactOutsideBehavior="ignore">
        <Dialog.Header>
            <Dialog.Title>Umm, akshually you can't join yet ☝️🤓</Dialog.Title>
            <Dialog.Description>Please sign in to join</Dialog.Description>
        </Dialog.Header>
        <form method="POST" action="?/joinRoomAsGuest">
            <Button href={`/login?joining=${roomCode}`}>Sign in</Button>
            <Button type="submit" variant="ghost">Play as guest</Button>
        </form>
    </Dialog.Content>
</Dialog.Root>
{#if winner}
    <Dialog.Root open={true}>
        <Dialog.Content class="sm:max-w-[425px]" hideCloseButton interactOutsideBehavior="ignore">
            <Dialog.Header>
                <Dialog.Title>{winner} won!</Dialog.Title>
            </Dialog.Header>
            <div class="my-4 flex justify-center">
                <img src="/path/to/avatar.png" alt="Winner Avatar" class="h-24 w-24 rounded-full" />
            </div>
            <Dialog.Footer class="mt-4">
                <Button
                    onclick={() => {
                        gameStarted = false;
                        challengeInfo = undefined;
                        winner = null;
                    }}
                >
                    Reset
                </Button>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>
{/if}

<style>
</style>
