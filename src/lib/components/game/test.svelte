<script lang="ts">
    import { slide } from "svelte/transition";
    import { Check, X } from "lucide-svelte";
    import type { ExecutionResults } from "$models/game";

    interface Props {
        executionResults?: ExecutionResults;
    }

    let { executionResults }: Props = $props();

    const checkIfSuccess = (index: number) => {
        return executionResults && index < executionResults.passed;
    };
</script>

<div class="w-full bg-background p-4">
    {#if executionResults}
        <div class="flex flex-wrap gap-4">
            {#each Array(executionResults.totalTestCases) as _, index (index)}
                <div
                    transition:slide|local
                    class="rounded-sm bg-neutral px-2 py-1 font-semibold text-red-400"
                    class:passed={checkIfSuccess(index)}
                >
                    Test Case {index + 1}:
                    {#if checkIfSuccess(index)}
                        <Check class="inline-block text-green-500" />
                    {:else}
                        <X class="inline-block text-red-400" />
                    {/if}
                </div>
            {/each}
        </div>
    {:else}
        <p>Test cases not available until submission</p>
    {/if}
</div>

<style>
    .passed {
        @apply text-green-500;
    }
</style>
