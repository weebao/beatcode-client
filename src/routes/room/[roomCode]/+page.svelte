<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type { PageData } from "./$types";
    import { type Infer, superForm } from "sveltekit-superforms";
    import { toast } from "svelte-sonner";

    import { Button } from "$components/ui/button";
    import * as Dialog from "$components/ui/dialog";
    import * as Form from "$components/ui/form";
    import { Input } from "$components/ui/input";
    import StatusIndicator from "$components/micro/status-indicator.svelte";
    import { Game } from "$components/macro/game";

    import type { JoinRoomSchema } from "$lib/zod-schemas";

    import type { ChallengeInfo, ExecutionResults, PlayerInfo } from "$models/game";

    import { Copy, Link } from "lucide-svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let { name, token, roomCode } = $state(data);
    let isDialogOpen = $state(name === undefined);
    let connectStatus = $state(0);

    let userInfo: PlayerInfo | undefined = $state();
    let opponentInfo: PlayerInfo | undefined = $state();
    let challengeInfo: ChallengeInfo | undefined = $state();
    let executionResults: ExecutionResults | undefined = $state();
    let isExecuting = $state(false);
    let gameStarted = $state(false);
    let winner: string | null = $state(null);

    // Establish socket and look for update
    const API_URL = "ws://localhost:8000/ws";
    let socket: WebSocket;

    const connect = () => {
        socket = new WebSocket(`${API_URL}/${roomCode}/${token}`);

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
            await joinRoomThroughLink();
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

    // Fallback to joinRoom action if WebSocket connection fails
    const joinRoomThroughLink = async () => {
        const response = await fetch(`?/joinRoomThroughLink`, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        const result = await response.json();
        if (result.type === "success") {
            const data = JSON.parse(result.data);
            token = data[data[0].token];
            connect();
        } else {
            toast.error(`Error: ${JSON.stringify(result, null, 2)}`);
        }
    };

    // Prompt if user isn't authenticated
    const joinRoomForm = superForm<Infer<typeof JoinRoomSchema>>(data.joinRoomForm, {
        onResult: ({ result: r }) => {
            if (r?.type === "success") {
                isDialogOpen = false;
                name = r.data?.joinRoomForm.data.name; // i know i know this is bad but its 4 am
                token = r.data?.token;
                connect();
            } else {
                toast.error(`Error: ${JSON.stringify(r, null, 2)}`);
            }
        }
    });

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

    const {
        form: joinRoomFormData,
        errors: joinRoomErrors,
        enhance: enhanceJoinRoom,
        message: joinRoomMessage
    } = joinRoomForm;

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
        <Button variant="outline" size="icon" class="h-8 w-8 p-1.5" on:click={() => copy(roomCode)}>
            <Copy />
        </Button>
        <Button
            variant="outline"
            size="icon"
            class="h-8 w-8 p-1.5"
            on:click={() => copy(`http://localhost:5173/room/${roomCode}`)}
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
            class={`border border-secondary ${opponentInfo ? "" : "animate-pulse"} border-1 w-[400px] rounded-xl p-4`}
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
    <Button size="lg" class="mt-4 text-lg" on:click={startGame}>Start Game</Button>
</div>
{#if gameStarted}
    <Game {userInfo} {opponentInfo} {challengeInfo} {executionResults} {isExecuting} {winner} {submitCode} />
{/if}
<!-- If not authenticated - prompt user to enter name -->
<Dialog.Root bind:open={isDialogOpen} closeOnEscape={false} closeOnOutsideClick={false}>
    <Dialog.Content class="sm:max-w-[425px]" hideCloseButton>
        <Dialog.Header>
            <Dialog.Title>What's your name?</Dialog.Title>
            <Dialog.Description>
                First time here? Please enter your name to join.
            </Dialog.Description>
        </Dialog.Header>
        <form method="POST" use:enhanceJoinRoom action="?/joinRoom">
            <Form.Field form={joinRoomForm} name="name">
                <Form.Control>
                    {#snippet children({ attrs }: { attrs: any })}
                        <Input
                            {...attrs}
                            placeholder="Enter your name"
                            bind:value={$joinRoomFormData.name}
                        />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field form={joinRoomForm} name="roomCode">
                <Form.Control>
                    {#snippet children({ attrs }: { attrs: any })}
                        <Input {...attrs} type="hidden" value={roomCode} />
                    {/snippet}
                </Form.Control>
            </Form.Field>
            <Dialog.Footer class="mt-4">
                <Button type="submit">Save changes</Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root>
{#if winner}
    <Dialog.Root open={true} closeOnEscape={false} closeOnOutsideClick={false}>
        <Dialog.Content class="sm:max-w-[425px]" hideCloseButton>
            <Dialog.Header>
                <Dialog.Title>{winner} won!</Dialog.Title>
            </Dialog.Header>
            <div class="flex justify-center my-4">
                <img src="/path/to/avatar.png" alt="Winner Avatar" class="w-24 h-24 rounded-full" />
            </div>
            <Dialog.Footer class="mt-4">
                <Button on:click={() => { gameStarted = false; challengeInfo = undefined; winner = null; }}>
                    Reset
                </Button>
            </Dialog.Footer>
        </Dialog.Content>
    </Dialog.Root>
{/if}

<style>
</style>
