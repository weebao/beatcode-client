<script lang="ts">
    import { tick } from "svelte";
    import { Editor, EditorData } from "./editor";
    import Problem from "./problem.svelte";
    import Test from "./test.svelte";

    import type { ChallengeInfo, ExecutionResults, PlayerInfo } from "$models/game";

    import AvatarImg from "$assets/images/avatar.jpg";

    import * as Avatar from "$components/ui/avatar";
    import { Button } from "$components/ui/button";
    import { Progress } from "$components/ui/progress";
    import * as Resizable from "$components/ui/resizable";

    import { Play, Send, FileText, SquareCode, CheckSquare, Loader } from "lucide-svelte";

    import { toast } from "svelte-sonner";
    interface Props {
        userInfo?: PlayerInfo;
        opponentInfo?: PlayerInfo;
        challengeInfo?: ChallengeInfo;
        executionResults?: ExecutionResults;
        isExecuting?: boolean;
        winner: string | null;
        submitCode: (code: string) => void;
    }

    let {
        userInfo,
        opponentInfo,
        challengeInfo,
        executionResults,
        isExecuting,
        winner,
        submitCode
    }: Props = $props();

    const editorData = new EditorData();

    const handleSubmit = () => {
        try {
            submitCode(editorData.getCode());
        } catch (e: any) {
            toast.error(`Error: ${e.message}`);
        }
    };

    $effect.pre(() => {
        let currentChallenge = challengeInfo?.title;
        console.log("beforetick", currentChallenge);
        tick().then(() => {
            console.log("tick", challengeInfo);
            if (challengeInfo?.title !== currentChallenge) {
                editorData.setCode(`${challengeInfo?.signature ?? "def Solution():"}\n    `);
                executionResults = undefined;
            }
        });
    });
</script>

<div
    class="absolute left-0 top-0 flex min-h-screen w-screen flex-col overflow-hidden bg-background-dark"
>
    <div class="flex items-center justify-between gap-4 px-4 py-2 text-white">
        <div class="flex w-full">
            <Avatar.Root class="mr-2">
                <Avatar.Image src={AvatarImg} alt="User" />
                <Avatar.Fallback>You</Avatar.Fallback>
            </Avatar.Root>
            <div class="w-full">
                <div class="mb-1 font-semibold">{userInfo?.name ?? "You"}</div>
                <Progress max={100} value={userInfo?.hp ?? 100} class="h-2" />
            </div>
        </div>
        <div class="flex space-x-0.5">
            <Button variant="secondary" size="sm" onclick={handleSubmit}>
                {#if isExecuting}
                    <Loader class="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                {:else}
                    <Play class="mr-2 h-4 w-4" />
                    Submit Code
                {/if}
            </Button>
            <!-- <Button variant="secondary" size="sm" class="rounded-r-none" on:click={handleSubmit}>
                <Play class="mr-2 h-4 w-4" />
                Run
            </Button>
            <Button variant="secondary" size="sm" class="rounded-l-none" on:click={handleSubmit}>
                <Send class="mr-2 h-4 w-4" />
                Submit
            </Button> -->
        </div>
        <div class="flex w-full">
            <div class="w-full">
                <div class="mb-1 text-right font-semibold">{opponentInfo?.name ?? "Opponent"}</div>
                <Progress
                    max={100}
                    value={opponentInfo?.hp ?? 100}
                    isOpposite={true}
                    barColor="bg-rose"
                    class="h-2"
                />
            </div>
            <Avatar.Root class="ml-2">
                <Avatar.Image src={AvatarImg} alt="Opponent" />
                <Avatar.Fallback>Them</Avatar.Fallback>
            </Avatar.Root>
        </div>
    </div>

    <Resizable.PaneGroup direction="horizontal" class="flex-1 px-2 pb-2">
        <Resizable.Pane defaultSize={50}>
            <div class="panel">
                <div class="panel-nav">
                    <div class="flex p-2">
                        <FileText class="mr-1 p-1" />
                        <span class="font-semibold">Problem</span>
                    </div>
                </div>
                <div class="panel-content">
                    <Problem
                        title={challengeInfo?.title}
                        description={challengeInfo?.description}
                    />
                </div>
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
                        <div class="panel-content bg-background px-4">
                            <Editor data={editorData} />
                        </div>
                    </div>
                </Resizable.Pane>
                <Resizable.Handle class="my-0.5 !h-[2px] bg-transparent hover:bg-blue-500" />
                <Resizable.Pane defaultSize={25} class="bg-background">
                    <div class="panel">
                        <div class="panel-nav">
                            <div class="flex p-2">
                                <CheckSquare class="mr-1 p-1" />
                                <span class="font-semibold">Test Cases</span>
                            </div>
                        </div>
                        <Test {executionResults} />
                    </div>
                </Resizable.Pane>
            </Resizable.PaneGroup>
        </Resizable.Pane>
    </Resizable.PaneGroup>
</div>

<style>
    .panel {
        @apply flex h-full flex-col overflow-hidden rounded-lg border-[1px] border-secondary;
    }

    .panel-nav {
        @apply flex gap-1 bg-neutral text-neutral-foreground;
    }
    .panel-content {
        @apply h-full w-full overflow-auto;
    }
    .example-block {
        @apply mb-4 mt-2 rounded-sm bg-neutral px-4 py-2;
    }
</style>
