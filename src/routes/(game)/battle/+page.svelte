<script lang="ts">
    import * as Card from "$components/ui/card";
    import { Button } from "$components/ui/button";

    import { Shell, ArrowUpNarrowWide } from "lucide-svelte";
</script>

<svelte:head>
    <title>Battle - BeatCode</title>
</svelte:head>

<div class="mx-auto mt-16 flex max-w-[1280px] flex-col gap-8">
    <h1 class="text-center font-icon text-4xl font-medium">Battle Mode</h1>

    <div class="relative flex w-full gap-6">
        <div class="flex-1">
            <Card.Root class="h-full bg-background/75 backdrop-blur-md">
                <Card.Content class="flex h-full flex-col justify-between gap-6 p-6">
                    <div class="flex flex-col items-center">
                        <Shell class="h-24 w-24 stroke-[1.5] pb-4 text-secondary" />
                        <h2 class="pb-2 font-icon text-2xl font-semibold">Unranked</h2>
                        <p class="text-center text-sm text-secondary">
                            Casual 1v1 battles that don't affect your rating
                        </p>
                    </div>
                    <Button href="/solo/unranked" class="w-full">Play</Button>
                </Card.Content>
            </Card.Root>
        </div>

        <!-- ranked -->
        <div class="flex-1">
            <Card.Root class="h-full bg-background/75 backdrop-blur-md">
                <Card.Content class="flex h-full flex-col justify-between p-6">
                    <div class="flex flex-col items-center">
                        <ArrowUpNarrowWide class="h-24 w-24 stroke-[1.5] pb-4 text-secondary" />
                        <h2 class="pb-2 font-icon text-2xl font-semibold">Ranked</h2>
                        <p class="text-center text-sm text-secondary">
                            Compete and grind your elo, if you aren't scared of course
                        </p>
                    </div>
                    <Button href="/solo/ranked" class="w-full">Play</Button>
                </Card.Content>
            </Card.Root>
        </div>
    </div>
</div>
