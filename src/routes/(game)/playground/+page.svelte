<!-- File: /routes/(game)/playground/+page.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import { Abilities } from "$assets/config/game";

    import { Button } from "$components/ui/button";
    import * as Tooltip from "$components/ui/tooltip";
    import { Editor, EditorData } from "$components/game/editor";

    import { toast } from "svelte-sonner";

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

    function useAbility(ability: string) {
        rightEditorData.triggerAbility(ability);
        toast(`You used ✨${ability}✨`);
    }

    function resetRightEditor() {
        isLightMode = false;
        rightEditorData.resetEditor();
        rightEditorData.setCode(defaultCode, "", true);
    }

    onMount(() => {
        leftEditorData.setLang("python");
        rightEditorData.setLang("python");
        leftEditorData.setCode("", "", true);
        rightEditorData.setCode(defaultCode, "", true);
    });
</script>

<div class="flex flex-col items-center bg-background p-4 text-foreground md:mt-20">
    <div class="mb-6 text-center">
        <h1 class="mb-3 font-icon text-3xl font-bold">Ability Playground</h1>
        <div>Type any ability in the editor and hit <code>Enter</code> to see the magic :D</div>
    </div>

    <div class="flex w-full max-w-6xl items-stretch gap-4">
        <div class="w-1/5 rounded-lg border border-secondary bg-background p-4">
            <h2 class="mb-4 text-center text-xl font-semibold">Abilities</h2>
            <Tooltip.Provider delayDuration={150}>
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
