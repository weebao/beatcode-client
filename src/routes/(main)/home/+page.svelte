<script lang="ts">
    import type { PageData } from "./$types";

    import { Abilities, Ratings } from "$assets/config/game";
    import * as Card from "$components/ui/card";
    import { Progress } from "$components/ui/progress";
    import { Button } from "$components/ui/button";
    import * as Tooltip from "$components/ui/tooltip";

    import { Settings, Shell, Swords } from "lucide-svelte";
    import { cn } from "$lib/utils";
    import { onMount } from "svelte";
    import GradientBlob from "$components/misc/gradient-blob.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let user = data.user;
    let mounted = $state(false);

    const mockExp = [
        { name: "Array", percentage: 70 },
        { name: "Hash Table", percentage: 60 },
        { name: "Tree", percentage: 50 },
        { name: "Binary Search", percentage: 40 },
        { name: "Dynamic Programming", percentage: 30 }
    ];
    const gameModes = [
        { name: "Unranked", icon: Shell, link: "/solo/unranked" },
        { name: "Ranked", icon: Swords, link: "/solo/ranked" },
        { name: "Custom", icon: Settings, link: "/custom" }
    ];
    const rating = Ratings[user?.rating ?? 0];

    onMount(() => (mounted = true));
</script>

<div class="mx-auto mt-16 flex max-w-[1280px] flex-col">
    <h1 class="mb-8 text-center text-4xl font-semibold">
        Time to level up, {user?.display_name ?? "BeatCoder"}.
    </h1>
    <div class="relative flex justify-stretch gap-4">
        <!-- Experience -->
        <div class="w-1/4">
            <Card.Root class="h-full bg-background/75 backdrop-blur-md">
                <Card.Header>
                    <Card.Title>Experience</Card.Title>
                </Card.Header>
                <Card.Content class="space-y-4">
                    {#each mockExp as skill}
                        <div>
                            <div class="mb-1 flex justify-between">
                                <span class="text-lg">{skill.name}</span>
                                <span>{skill.percentage}%</span>
                            </div>
                            <Progress
                                class="h-2"
                                barClass="duration-1000"
                                value={mounted ? skill.percentage : 0}
                                max={100}
                            />
                        </div>
                    {/each}
                </Card.Content>
            </Card.Root>
        </div>

        <!-- Middle card: Game Modes -->
        <div
            class="flex w-1/2 flex-col space-y-4 rounded-lg border border-secondary bg-background/75 p-6 backdrop-blur-md"
        >
            {#each gameModes as mode}
                <div
                    class="flex flex-1 items-center justify-between rounded-md border border-secondary p-6"
                >
                    <div class="flex items-center">
                        <mode.icon class="mr-4 h-8 w-8 text-secondary" />
                        <span class="font-mono text-2xl">{mode.name}</span>
                    </div>
                    <Button class="px-8 text-base" href={mode.link}>Start</Button>
                </div>
            {/each}
        </div>

        <GradientBlob
            class="fixed left-1/2 top-24 -z-10 h-[600px] w-[800px] -translate-x-1/2"
            blobClass="bg-primary"
            complexity={20}
        />
        <GradientBlob
            class="fixed left-2/3 top-24 -z-[5] h-[400px] w-[400px] -translate-x-1/3"
            blobClass="bg-yellow-200"
            complexity={20}
        />

        <!-- Right card: Rating and Abilities -->
        <div class="w-1/4">
            <div
                class="mb-4 flex flex-col items-center justify-center rounded-lg border border-secondary bg-background/75 p-6 backdrop-blur-md"
            >
                <div class="mb-4 h-24 w-24 rounded-lg bg-secondary"></div>
                <div
                    class={cn("rounded-md px-4 pb-1 pt-2 font-icon font-bold italic", rating.class)}
                >
                    {rating.name}
                </div>
            </div>
            <Card.Root class="flex-1 bg-background/75 backdrop-blur-md">
                <Card.Header>
                    <Card.Title>Abilities</Card.Title>
                </Card.Header>
                <Card.Content>
                    <Tooltip.Provider delayDuration={50} disableHoverableContent>
                        <div class="flex flex-wrap gap-2">
                            {#each Abilities as ability}
                                <Tooltip.Root>
                                    <Tooltip.Trigger
                                        class={cn(
                                            ability.class,
                                            "cursor-default rounded-md px-4 py-1 font-mono font-bold"
                                        )}
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
                </Card.Content>
            </Card.Root>
        </div>
    </div>
</div>

<style>
</style>
