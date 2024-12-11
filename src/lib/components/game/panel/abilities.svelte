<script lang="ts">
    import type { GameState } from "$lib/models/game";
    import { Button } from "$components/ui/button";
    import * as Tooltip from "$components/ui/tooltip";
    import { Abilities } from "$assets/config/game";
    import { cn } from "$lib/utils";

    interface Props {
        gameState?: GameState;
        useAbility: (ability: string) => void;
        buyAbility: (ability: string) => void;
    }

    let { gameState, useAbility, buyAbility }: Props = $props();
</script>

<div class="w-full overflow-y-auto bg-background p-4">
    <h4 class="mb-4 text-xl font-medium">Abilities</h4>
    <div class="flex flex-col gap-2">
        {#each Abilities as item}
            <div
                class="flex items-center justify-between gap-4 rounded-lg border border-secondary p-4"
            >
                <div class="space-y-2">
                    <div
                        class={cn(
                            item.class,
                            "w-fit rounded-sm px-2 pt-px font-mono text-lg font-bold"
                        )}
                    >
                        {item.name}
                    </div>
                    <p class="text-muted/75">{item.desc}</p>
                    <p class="text-sm font-semibold">5 MP</p>
                </div>
                <Tooltip.Provider delayDuration={50}>
                {#if gameState?.abilities.includes(item.name)}
                <Tooltip.Root disableCloseOnTriggerClick ignoreNonKeyboardFocus>
                    <Tooltip.Trigger>
                        <Button variant="accent" disabled
                        >Bought</Button
                    >
                    </Tooltip.Trigger>
                    <Tooltip.Content
                        class="border border-secondary bg-background-dark text-sm text-foreground"
                        >Use by typing the ability name and hit Enter</Tooltip.Content
                    >
                </Tooltip.Root>
                    
                {:else}
                    <Button variant="accent" onclick={() => buyAbility(item.name)}
                        >Buy: 10 SP</Button
                    >
                {/if}
            </Tooltip.Provider>
            </div>
        {/each}
    </div>
</div>

<style>
</style>
