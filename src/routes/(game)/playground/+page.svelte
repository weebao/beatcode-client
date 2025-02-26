<script lang="ts">
    import { onMount } from "svelte";
    import { Abilities } from "$assets/config/game";

    import { Button } from "$components/ui/button";
    import * as Tooltip from "$components/ui/tooltip";
    import { Editor, EditorData } from "$components/game/editor";

    import { toast } from "svelte-sonner";
    import { Toggle } from "$components/ui/toggle";
    import Vim from "$assets/icons/vim.svelte";

    const leftEditorData = new EditorData();
    const rightEditorData = new EditorData();
    const defaultCode = `class Solution:
    def twoSum(self, nums, target):
        hash = {}
        for i in range(len(nums)):
            hash[nums[i]] = i
        for i in range(len(nums)):
            num = target - nums[i]
            if num in hash and hash[num] != i:
                return [i, hash[num]]
        # Empty list if no pair found
        return []`;

    let isLightMode = $state<boolean>(false);

    const useAbility = (ability: string) => {
        rightEditorData.triggerAbility(ability);
        toast(`You used ✨${ability}✨`);
    };

    const toggleVim = (enabled: boolean) => {
        leftEditorData.setVim(enabled);
        rightEditorData.setVim(enabled);
    };

    const resetRightEditor = () => {
        isLightMode = false;
        rightEditorData.resetEditor();
        rightEditorData.setRickroll(false);
        rightEditorData.setCode(defaultCode, "", true);
    };

    onMount(() => {
        leftEditorData.setLang("python");
        rightEditorData.setLang("python");
        leftEditorData.setCode("", "", true);
        rightEditorData.setCode(defaultCode, "", true);
    });
</script>

<svelte:head>
    <title>Playground - BeatCode</title>
</svelte:head>

<div class="mt-8 flex flex-col items-center bg-background p-4 text-foreground">
    <div class="mb-6 text-center">
        <h1 class="mb-3 font-icon text-4xl font-bold">Playground</h1>
        <div>Type any ability in the editor and hit <code>Enter</code> to see the magic :D</div>
    </div>

    <Toggle class="group mb-3 flex space-x-2 border-2 border-secondary" onPressedChange={toggleVim}>
        <Vim class="saturate-0 group-data-[state=on]:saturate-100" />
        Vim Mode
    </Toggle>

    <div class="flex max-h-[500px] w-full max-w-6xl items-stretch gap-4">
        <div class="h-full w-1/5 rounded-lg border border-secondary bg-background p-4">
            <h2 class="mb-4 text-center text-xl font-semibold">Abilities</h2>
            <Tooltip.Provider delayDuration={50}>
                <div class="space-y-3">
                    {#each Abilities as ability}
                        <Tooltip.Root>
                            <Tooltip.Trigger
                                class="w-full rounded-md px-2 py-1 text-center font-mono font-bold {ability.class} cursor-default"
                            >
                                {ability.name}
                            </Tooltip.Trigger>
                            <Tooltip.Content
                                class="border border-secondary bg-background-dark/70 text-sm text-foreground backdrop-blur-md"
                            >
                                {ability.desc}
                            </Tooltip.Content>
                        </Tooltip.Root>
                    {/each}
                </div>
            </Tooltip.Provider>
        </div>

        <div class="max-h-full w-1/2 overflow-auto rounded-lg border border-secondary">
            <Editor data={leftEditorData} {useAbility} />
        </div>

        <div class="flex max-h-full w-1/2 flex-col overflow-auto">
            <div
                class="flex-1 {isLightMode
                    ? 'bg-white'
                    : ''} mb-3 h-full w-full overflow-auto rounded-lg border border-secondary"
            >
                <Editor data={rightEditorData} {useAbility} />
            </div>
            <Button onclick={resetRightEditor}>Reset</Button>
        </div>
    </div>
</div>
