<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import * as monaco from "monaco-editor";
    import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

    import DefaultTheme from "$assets/themes/code-editor/default.json";
    import * as Avatar from "$components/ui/avatar";
    import { Button } from "$components/ui/button";
    import * as Resizable from "$components/ui/resizable";
    import { Problem, Test } from "$components/macro/game";

    import type { PlayerInfo } from "$models/game";

    import { Play, Send, FileText, SquareCode, CheckSquare } from "lucide-svelte";
    import { samplePython } from "./assets/code";

    // Game variables
    export let data;
    const playerId = data.token;
    const roomCode = data.roomCode;
    let userInfo: PlayerInfo;
    let opponentInfo: PlayerInfo;
    let code = "";
    let problemTitle = "";
    let problemDescription = "";
    let connectStatus = 0; // 0 - connecting, 1 - connected, -1 - disconnected
    let gameStarted = false;
    let winner = null;

    // Setup websocket
    let socket: WebSocket;

    const API_URL = "ws://0.0.0.0:8000/ws";
    const connect = () => {
        socket = new WebSocket(`${API_URL}/${roomCode}/${playerId}`);

        socket.onopen = () => {
            console.log("Connected to server");
            connectStatus = 1;
        };

        socket.onclose = () => {
            console.log("Disconnected from server");
            connectStatus = -1;
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("Received:", data);

            if (data.type === "game_update") {
                userInfo = data.player1;
                opponentInfo = data.player2;
            } else if (data.type === "new_challenge") {
                problemTitle = data.challenge_info.title;
                problemDescription = data.challenge_info.description;
                code = data.challenge_info.signature;
                loadCode(code);
            } else if (data.type === "game_ended") {
                winner = data.winner;
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };
    };

    const submitCode = () => {
        socket.send(
            JSON.stringify({
                type: "submit_code",
                code: model.getValue()
            })
        );
    };

    // Code editor config
    let editorElement: HTMLDivElement;
    let editor: monaco.editor.IStandaloneCodeEditor;
    let model: monaco.editor.ITextModel;

    function loadCode(code: string) {
        model = monaco.editor.createModel(code, "python");
        editor.setModel(model);
    }
    const loadSampleCode = () => loadCode(samplePython);

    monaco.editor.defineTheme("default", {
        ...DefaultTheme,
        base: "vs-dark" // or 'vs', 'hc-black' depending on your theme
    });

    // Run code on mount
    onMount(async () => {
        self.MonacoEnvironment = {
            getWorker: function () {
                return new editorWorker();
            }
        };

        editor = monaco.editor.create(editorElement, {
            automaticLayout: true,
            theme: "default",
            language: "python",
            minimap: {
                enabled: false
            }
        });

        loadSampleCode();
        connect();
    });

    onDestroy(() => {
        monaco?.editor.getModels().forEach((model) => model.dispose());
        editor?.dispose();
        socket?.close();
    });
</script>

<svelte:head>BeatCode - Game</svelte:head>

<div class="flex min-h-screen flex-col overflow-hidden bg-background-dark">
    <div class="flex items-center justify-between px-4 py-2 text-white">
        <Avatar.Root>
            <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
            <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar.Root>
        <div class="flex space-x-2">
            <Button variant="secondary" size="sm">
                <Play class="mr-2 h-4 w-4" />
                Run
            </Button>
            <Button variant="secondary" size="sm" on:click={submitCode}>
                <Send class="mr-2 h-4 w-4" />
                Submit
            </Button>
            <Button variant="secondary" size="sm" on:click={loadSampleCode}>
                Load Sample Code
            </Button>
        </div>
        <Avatar.Root>
            <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
            <Avatar.Fallback>AS</Avatar.Fallback>
        </Avatar.Root>
    </div>

    <Resizable.PaneGroup direction="horizontal" class="flex-1 px-3 pb-3">
        <Resizable.Pane defaultSize={50}>
            <div class="panel">
                <div class="panel-nav">
                    <div class="flex p-2">
                        <FileText class="mr-1 p-1" />
                        <span class="font-semibold">Problem</span>
                    </div>
                </div>
                <Problem />
            </div>
        </Resizable.Pane>
        <Resizable.Handle class="mx-0.5 w-[2px] bg-transparent hover:bg-blue-500" />
        <Resizable.Pane defaultSize={50}>
            <Resizable.PaneGroup direction="vertical">
                <Resizable.Pane defaultSize={75}>
                    <div class="panel">
                        <div class="panel-nav">
                            <div class="flex p-2">
                                <SquareCode class="mr-1 p-1" />
                                <span class="font-semibold">Code</span>
                            </div>
                        </div>
                        <div class="h-full w-full bg-background py-2" bind:this={editorElement} />
                    </div>
                </Resizable.Pane>
                <Resizable.Handle class="my-0.5 !h-[2px] bg-transparent hover:bg-blue-500" />
                <Resizable.Pane defaultSize={25}>
                    <div class="panel">
                        <div class="panel-nav">
                            <div class="flex p-2">
                                <CheckSquare class="mr-1 p-1" />
                                <span class="font-semibold">Test Cases</span>
                            </div>
                        </div>
                        <Test />
                    </div>
                </Resizable.Pane>
            </Resizable.PaneGroup>
        </Resizable.Pane>
    </Resizable.PaneGroup>
</div>

<style>
    .panel {
        @apply h-full overflow-hidden rounded-lg border-[1px] border-secondary;
    }

    .panel-nav {
        @apply flex gap-1 bg-neutral text-neutral-foreground;
    }
</style>
