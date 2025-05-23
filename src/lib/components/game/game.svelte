<script lang="ts">
    import { onDestroy } from "svelte";
    import { toast } from "svelte-sonner";
    import { goto } from "$app/navigation";
    import { createWebSocket } from "$lib/websocket.svelte";
    import type { User } from "$models/user";
    import type { GameState, Languages, ProblemDetails, SubmissionResults } from "$models/game";
    import type { ChatMessage } from "$models/room";

    import AvatarImg from "$assets/images/avatar.jpg";
    import Vim from "$assets/icons/vim.svelte";

    import * as Avatar from "$components/ui/avatar";
    import { Button } from "$components/ui/button";
    import * as Dialog from "$components/ui/dialog";
    import { Progress } from "$components/ui/progress";
    import * as Resizable from "$components/ui/resizable";
    import * as Select from "$components/ui/select";
    import * as Tooltip from "$components/ui/tooltip";
    import { Toggle } from "$components/ui/toggle";

    import { Problem, Test, Abilities } from "$components/game/panel";
    import { Editor, EditorData } from "$components/game/editor";
    import { Chat } from "$components/game/chat";

    import { cn, log, getRank } from "$lib/utils";

    import {
        Play,
        FileText,
        SquareCode,
        CheckSquare,
        Loader,
        LogOut,
        Sparkles,
        WifiIcon
    } from "lucide-svelte";
    import { LanguageConfig } from "$assets/config/game";

    interface Props {
        user?: User;
        token?: string;
        url: string;
    }

    let { user, token, url }: Props = $props();
    let selected = $state<number>(0);
    let isGameStarted = $state<boolean>(false);
    let gameState = $state<GameState>();

    let userRating = user?.rating ?? 0;
    let userRank = getRank(userRating);
    let opponentRating = $derived(gameState?.opponent_rating ?? 0);
    let opponentRank = $derived(getRank(opponentRating));

    let currentProblem = $state<ProblemDetails>();
    let isProblemSolved = $state<boolean>(false);

    let isSubmitting = $state<boolean>(false);
    let submissionStart = $state<number>();
    let submissionTime = $state<number>();
    let submissionTimeout = $state<ReturnType<typeof setTimeout>>();
    let submissionResults = $state<SubmissionResults>();
    let runtimeAnalysis = $state<string>();

    let winner = $state<string | null>(null);
    let isWinner = $derived(winner === user?.username);

    let currentLang = $state<Languages>((localStorage.getItem("lang") as Languages) || "python");

    let chatHistory = $state<ChatMessage[]>([]);

    const tabs = [
        { name: "Test Cases", icon: CheckSquare },
        { name: "Abilities", icon: Sparkles }
    ];

    // Editor
    const editorData = new EditorData();

    // Reset code editor when new problem is received
    $effect(() => {
        if (currentProblem) {
            if (
                !localStorage.getItem("cachedProblemTitle") ||
                localStorage.getItem("cachedProblemTitle") !== currentProblem.title
            ) {
                resetLocalStorage();
            }
            localStorage.setItem("cachedProblemTitle", currentProblem.title);
            for (const lang in LanguageConfig) {
                if (localStorage.getItem(`${lang}CachedCode`)) {
                    continue;
                }
                localStorage.setItem(
                    `${lang}CachedCode`,
                    currentProblem.boilerplate[lang as Languages]
                );
            }
            editorData.setCode(currentProblem.boilerplate[currentLang], currentProblem.title);
        }
    });

    $effect(() => {
        editorData.setLang(currentLang);
        localStorage.setItem("lang", currentLang);
    });

    const checkHP = (newState: GameState) => {
        if (!gameState) return;
        if (newState.your_hp < gameState.your_hp) {
            const damage = gameState.your_hp - newState.your_hp;
            toast.error(`${gameState.opponent_display_name} have dealt ${damage} damage`);
        } else if (newState.opponent_hp < gameState.opponent_hp) {
            const damage = gameState.opponent_hp - newState.opponent_hp;
            toast.success(`You have dealt ${damage} damage to ${gameState.opponent_display_name}`);
        }
    };

    const checkAbilityPurchase = (newState: GameState) => {
        if (!gameState) return;
        // Scuffed way to do it but it's 5am
        const oldInventory = new Set(gameState.abilities);
        const newInventory = new Set(newState.abilities);
        const diff = newInventory.difference(oldInventory);
        if (diff.size !== 0) {
            toast.success(`You have purchased ${diff.values().next().value}!`);
        }
    };

    // This must be the work of an enemy stand
    const processAbilityUsage = (abilityUser: string, ability: string) => {
        if (abilityUser === user?.username) return;
        editorData.triggerAbility(ability);
    };

    // WebSocket connection
    const ws = createWebSocket(token ?? "");
    ws.setUrl(url);
    ws.connect();

    const resetLocalStorage = () => {
        localStorage.removeItem("cachedProblemTitle");
        for (const lang in LanguageConfig) {
            localStorage.removeItem(`${lang}CachedCode`);
        }
    };

    const displaySubmissionTime = (submissionTime: number) => {
        if (submissionTime < 1000) {
            return `${submissionTime.toFixed(2)} ms`;
        } else {
            return `${(submissionTime / 1000).toFixed(2)} s`;
        }
    };

    $effect(() => {
        if (ws.status === "CLOSED") {
            toast.error(ws.reason ?? "Failed to connect to game");
            goto("/home");
        }
    });

    $effect(() => {
        if (ws.message) {
            const { type, data } = ws.message;
            switch (type) {
                case "ability_used":
                    toast.info(`✨ ${data.player} used ${data.ability}!!`);
                    processAbilityUsage(data.player, data.ability);
                    break;
                case "game_state":
                    checkHP(data);
                    checkAbilityPurchase(data);
                    gameState = data;
                    break;
                case "game_start":
                    isGameStarted = true;
                    break;
                case "problem":
                    if (!isGameStarted) {
                        isGameStarted = true;
                    }
                    currentProblem = data;
                    submissionResults = undefined;
                    break;
                case "submission_result":
                    ws.resetMessage(); // prevent spam submitting
                    isSubmitting = false;
                    submissionTime = performance.now() - (submissionStart ?? 0);
                    submissionResults = data;
                    if (submissionResults?.problem_solved) {
                        isProblemSolved = true;
                        runtimeAnalysis = submissionResults?.runtime_analysis;
                    }
                    if (!submissionResults?.success) {
                        editorData.processError(
                            submissionResults?.message ?? "",
                            submissionResults?.line_offset ?? 7
                        );
                    } else if (
                        submissionResults?.sample_results?.some((result) => !result.passed)
                    ) {
                        editorData.processError(
                            submissionResults?.sample_results?.find((result) => !result.passed)
                                ?.error ?? "",
                            submissionResults?.line_offset ?? 7
                        );
                    } else if (submissionResults?.test_results?.some((result) => !result.passed)) {
                        editorData.processError(
                            submissionResults?.test_results?.find((result) => !result.passed)
                                ?.error ?? "",
                            submissionResults?.line_offset ?? 7
                        );
                    }
                    break;
                case "chat":
                    if (
                        chatHistory.length === 0 ||
                        chatHistory[chatHistory.length - 1].timestamp !== data.timestamp
                    ) {
                        chatHistory = [...chatHistory, data];
                    }
                    break;
                case "error":
                    toast.error(data.message);
                    isSubmitting = false;
                    break;
                case "match_end":
                    winner = data.winner;
                    isSubmitting = false;
                    resetLocalStorage();
                    break;
                default:
                    break;
            }
        }
    });

    $effect(() => {
        if (ws.reason?.toLowerCase().includes("reconnected")) {
            toast.warning(ws.reason);
        }
    });

    $effect(() => {
        if (!isSubmitting && submissionTimeout) {
            clearTimeout(submissionTimeout);
            submissionTimeout = undefined;
        }
    });

    // Actions
    const buyAbility = (ability: string) => {
        log(ability);
        ws.send("ability", {
            action: "buy",
            ability_id: ability
        });
    };

    const useAbility = (ability: string) => {
        log(ability);
        ws.send("ability", {
            action: "use",
            ability_id: ability
        });
    };

    const submitCode = () => {
        if (isSubmitting) return;
        const code = editorData.getCode();
        log("[SUBMIT]", code);
        isSubmitting = true;
        submissionStart = performance.now();
        editorData.resetError();
        ws.send("submit", { code, lang: currentLang });
        submissionTimeout = setTimeout(() => {
            toast.error("Seems like it's taking too long. You can try reloading the page");
        }, 30000);
    };

    const sendMessage = (message: string) => {
        ws.send("chat", { message });
    };

    const forfeit = () => {
        if (!ws || ws.status === "CLOSED") {
            goto("/");
            return;
        }
        ws.send("forfeit");
    };

    onDestroy(() => {
        ws.close();
    });
</script>

<svelte:head>
    <title>Game - BeatCode</title>
</svelte:head>

<div class="fixed left-0 top-0 flex h-screen w-screen flex-col overflow-hidden bg-background-dark">
    <div class="flex items-center justify-between gap-4 px-4 py-2 text-white">
        <div class="flex w-full">
            <Avatar.Root class="mr-2">
                <Avatar.Image src={user?.avatar_url ?? AvatarImg} alt="User" />
                <Avatar.Fallback>You</Avatar.Fallback>
            </Avatar.Root>
            <div class="w-full">
                <div class="mb-1 flex items-center gap-2">
                    <div class="font-semibold">{user?.display_name ?? "You"}</div>
                    <div class={cn("rounded-sm bg-neutral px-1 font-mono text-xs", userRank.class)}>
                        {userRank.name}
                    </div>
                    <div class="rounded-sm bg-neutral px-1 font-mono text-xs">
                        {Math.floor(userRating)}
                    </div>
                </div>
                <Progress max={100} value={Math.min(gameState?.your_hp ?? 0, 100)} class="h-2" />
            </div>
        </div>
        <div class="flex space-x-0.5">
            <Tooltip.Provider delayDuration={150}>
                <Tooltip.Root disableCloseOnTriggerClick ignoreNonKeyboardFocus>
                    <Tooltip.Trigger>
                        <Button
                            variant="secondary"
                            size="sm"
                            class="rounded-r-none bg-neutral"
                            disabled={isSubmitting}
                            onclick={submitCode}
                        >
                            {#if isSubmitting}
                                <Loader class="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            {:else}
                                <Play class="mr-2 h-4 w-4" />
                                Submit Code
                            {/if}
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                        class="border border-secondary bg-background-dark text-sm text-foreground"
                    >
                        You can only see the input for a few first test cases
                    </Tooltip.Content>
                </Tooltip.Root>
                <Tooltip.Root disableCloseOnTriggerClick ignoreNonKeyboardFocus>
                    <Tooltip.Trigger>
                        <Button
                            variant="secondary"
                            size="sm"
                            class="rounded-l-none bg-neutral px-2.5"
                            onclick={forfeit}
                        >
                            <LogOut />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                        class="border border-secondary bg-background-dark text-sm text-foreground"
                    >
                        Leave game (Forfeit)
                    </Tooltip.Content>
                </Tooltip.Root>
            </Tooltip.Provider>
        </div>
        <div class="flex w-full">
            <div class="w-full">
                <div class="mb-1 flex items-center justify-end gap-2">
                    <div class="rounded-sm bg-neutral px-1 font-mono text-xs">
                        {Math.floor(opponentRating)}
                    </div>
                    <div
                        class={cn(
                            "rounded-sm bg-neutral px-1 font-mono text-xs",
                            opponentRank.class
                        )}
                    >
                        {opponentRank.name}
                    </div>
                    <div class="font-semibold">
                        {gameState?.opponent_display_name ?? "Opponent"}
                    </div>
                </div>
                <Progress
                    max={100}
                    value={Math.min(gameState?.opponent_hp ?? 0, 100)}
                    isOpposite={true}
                    barClass="bg-rose"
                    class="h-2"
                />
            </div>
            <Avatar.Root class="ml-2">
                <Avatar.Image src={gameState?.opponent_avatar_url ?? AvatarImg} alt="Opponent" />
                <Avatar.Fallback>Them</Avatar.Fallback>
            </Avatar.Root>
        </div>
    </div>

    <Resizable.PaneGroup direction="horizontal" class="flex-1 px-2 pb-2">
        <Resizable.Pane defaultSize={50} minSize={25}>
            <div
                class="flex h-full flex-col overflow-hidden rounded-lg border-[1px] border-secondary bg-background"
            >
                <div class="flex gap-1 bg-neutral text-neutral-foreground">
                    <div class="flex p-2">
                        <FileText class="mr-1 p-1" />
                        <span class="font-semibold">Problem</span>
                    </div>
                </div>
                <div class="h-full w-full overflow-auto">
                    <Problem content={currentProblem} />
                </div>
            </div>
        </Resizable.Pane>
        <Resizable.Handle class="mx-0.5 w-[2px] bg-transparent hover:bg-blue-500" />
        <Resizable.Pane defaultSize={50} minSize={25}>
            <Resizable.PaneGroup direction="vertical">
                <Resizable.Pane defaultSize={75} minSize={25}>
                    <div
                        class="flex h-full flex-col overflow-hidden rounded-lg border-[1px] border-secondary bg-background"
                    >
                        <div class="flex gap-1 bg-neutral text-neutral-foreground">
                            <div class="flex p-2">
                                <SquareCode class="mr-1 p-1" />
                                <span class="font-semibold">Code</span>
                            </div>
                        </div>
                        <div
                            class="flex items-center justify-between border-b-[1px] border-secondary/50 p-1"
                        >
                            <div class="flex items-center space-x-2">
                                <Select.Root type="single" name="language" bind:value={currentLang}>
                                    <Select.Trigger
                                        class="h-fit w-fit rounded-sm border-0 px-2 py-1 hover:bg-secondary/25 focus:ring-0"
                                    >
                                        <span class="mr-1">
                                            {LanguageConfig[currentLang].name}
                                        </span>
                                    </Select.Trigger>
                                    <Select.Content align="start">
                                        {#each Object.entries(LanguageConfig) as [key, value]}
                                            <Select.Item value={key} class="cursor-pointer">
                                                {value.name}
                                                {key === "python" ? "(Recommended)" : ""}
                                            </Select.Item>
                                        {/each}
                                    </Select.Content>
                                </Select.Root>
                                {#if submissionTime}
                                    <div class="ml-auto flex items-center gap-1">
                                        <span class="text-sm text-neutral-foreground/50">
                                            Last submission took:
                                            {displaySubmissionTime(submissionTime)}
                                        </span>
                                    </div>
                                {/if}
                            </div>
                            <div>
                                <Toggle
                                    class="group flex h-full space-x-2 px-2 py-1"
                                    onPressedChange={(pressed: boolean) =>
                                        editorData.setVim(pressed)}
                                >
                                    <Vim
                                        class="h-2 w-2 saturate-0 group-data-[state=on]:saturate-100"
                                    />
                                    Vim Mode
                                </Toggle>
                            </div>
                        </div>
                        <div class="h-full w-full overflow-auto">
                            <Editor data={editorData} {useAbility} />
                        </div>
                    </div>
                </Resizable.Pane>
                <Resizable.Handle class="my-0.5 !h-[2px] bg-transparent hover:bg-blue-500" />
                <Resizable.Pane defaultSize={25} minSize={25} class="bg-background">
                    <div
                        class="flex h-full flex-col overflow-hidden rounded-lg border-[1px] border-secondary bg-background"
                    >
                        <div
                            class="flex items-center justify-between bg-neutral p-1 text-neutral-foreground"
                        >
                            <div class="flex items-center gap-1">
                                {#each tabs as tab, i}
                                    <button
                                        class="flex cursor-pointer items-center rounded-sm p-1 pr-2 hover:bg-secondary/50 {selected ==
                                        i
                                            ? 'bg-secondary/50'
                                            : 'text-foreground/50'}"
                                        onclick={() => (selected = i)}
                                    >
                                        <tab.icon class="mr-1 p-1" />
                                        <span class="font-semibold">{tab.name}</span>
                                    </button>
                                {/each}
                            </div>
                            <div class="flex space-x-4 pr-4 font-medium">
                                <div>
                                    MP: <span class="text-blue-400"
                                        >{gameState?.mana_points ?? 0}</span
                                    >
                                </div>
                                <div>
                                    SP: <span class="text-amber-400"
                                        >{gameState?.skill_points ?? 0}</span
                                    >
                                </div>
                            </div>
                        </div>
                        {#if selected === 0}
                            <Test results={submissionResults} />
                        {:else}
                            <Abilities {gameState} {buyAbility} />
                        {/if}
                    </div>
                </Resizable.Pane>
            </Resizable.PaneGroup>
        </Resizable.Pane>
    </Resizable.PaneGroup>
</div>
<Dialog.Root open={!isGameStarted}>
    <Dialog.Content class="sm:max-w-[425px]" hideCloseButton interactOutsideBehavior="ignore">
        <div class="my-4 flex flex-col items-center">
            <WifiIcon class="mb-8 h-20 w-20 animate-pulse" />
            <div class="mb-4 font-icon text-2xl font-bold">Waiting for opponent</div>
            <Button onclick={forfeit}>Leave game</Button>
        </div>
    </Dialog.Content>
</Dialog.Root>
<Dialog.Root open={winner !== null}>
    <Dialog.Content class="sm:max-w-[425px]" hideCloseButton interactOutsideBehavior="ignore">
        <div class="my-4 flex flex-col items-center">
            <div class="mb-8 text-9xl">
                {isWinner ? "🎉" : "😢"}
            </div>
            <div class="mb-10 font-icon text-5xl font-bold">
                {isWinner ? "You won!" : "You lost..."}
            </div>
            <Button href="/home" onclick={() => goto("/home")}>Go home</Button>
        </div>
    </Dialog.Content>
</Dialog.Root>
<Dialog.Root bind:open={isProblemSolved}>
    <Dialog.Content class="sm:max-w-[425px]" hideCloseButton interactOutsideBehavior="ignore">
        <div class="flex flex-col items-center text-center">
            {#if runtimeAnalysis}
                <div class="my-8 font-icon text-6xl font-semibold">
                    {runtimeAnalysis}
                </div>
            {:else}
                <div class="mb-8 text-9xl">🎉</div>
            {/if}
            <span class="text-xl">Congrats! You solved the problem!</span>
        </div>
        <Dialog.Footer>
            <Dialog.Close>
                <Button class="mx-auto">Continue</Button>
            </Dialog.Close>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

<Chat username={user?.username} history={chatHistory} onSend={sendMessage} />

<style>
</style>
