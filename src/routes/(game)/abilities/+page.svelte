<script lang="ts">
    import { Abilities } from "$lib/assets/config/game";
    import { Button } from "$components/ui/button";
    import { cn } from "$lib/utils";
</script>

<div class="container mx-auto my-8">
    <div class="mb-8 text-center">
        <h1 class="font-icon text-4xl font-bold">Abilities</h1>
        <p class="mt-2 text-muted-foreground">Ways to make your opponent crash out</p>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {#each Abilities as ability}
            <div class="rounded-lg border border-secondary p-4 flex flex-col">
                <div class="text-xl">
                    <span class={cn(ability.class, "rounded-md px-2 py-1 font-mono")}>
                        {ability.name}
                    </span>
                </div>
                <div class="flex-1 flex flex-col justify-between">
                    <p class="mt-4 text-sm text-muted-foreground">
                        {ability.desc}
                    </p>
                    <div class="mt-4 flex gap-4 text-sm">
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-blue-400">MP:</span>
                            <span>{ability.mp ?? "?"}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="font-semibold text-amber-400">SP:</span>
                            <span>{ability.sp ?? "?"}</span>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
<div class="my-8 flex justify-center">
    <Button href="/playground">Try in Playground</Button>
</div>

<style></style>
