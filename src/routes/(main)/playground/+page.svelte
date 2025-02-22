<!-- File: /routes/(game)/playground/+page.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import { Abilities } from "$assets/config/game";

    import { Button } from "$components/ui/button";
    import * as Tooltip from "$components/ui/tooltip";
    import { Editor, EditorData } from '$components/game/editor';

    import type { Languages } from '$models/game';
    import { toast } from "svelte-sonner";
    
    // Create editor data instances
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
        if (ability === "lightio") {
            isLightMode = true;
            setTimeout(() => {
                isLightMode = false;
            }, 30000);
        }
        rightEditorData.triggerAbility(ability);
        toast(`Ability used: ✨${ability}✨`);
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

<div class="md:mt-20 flex flex-col items-center p-4 bg-background text-foreground">
    <div class="text-center mb-6">
        <h1 class="text-3xl font-icon font-bold mb-3">Ability Playground</h1>
        <div>Enter any ability in the editor and hit <code>Enter</code> to see the magic :)</div>
    </div>
    
    <div class="flex items-stretch w-full max-w-6xl max-h-96 gap-4">
        <div class="w-1/5 p-4 bg-background rounded-lg border border-secondary">
            <h2 class="text-xl font-semibold mb-4 text-center">Abilities</h2>
            <Tooltip.Provider delayDuration={150}>
                <div class="space-y-3">
                    {#each Abilities as ability}
                        <Tooltip.Root>
                            <Tooltip.Trigger
                                class="w-full px-2 py-1 text-center rounded-md font-mono font-bold {ability.class} cursor-default"
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

        <div class="w-1/2 max-h-full border border-secondary rounded-lg overflow-auto">
            <Editor 
                data={leftEditorData}
                {useAbility}
            />
        </div>

        <div class="w-1/2 max-h-full flex flex-col overflow-auto">
            <div class="flex-1 {isLightMode ? 'bg-white' : ''} h-full w-full border border-secondary rounded-lg overflow-auto mb-3">
                <Editor 
                    data={rightEditorData}
                    {useAbility}
                />
            </div>
            <Button onclick={resetRightEditor}>
                Reset
            </Button>
        </div>
    </div>
</div>
