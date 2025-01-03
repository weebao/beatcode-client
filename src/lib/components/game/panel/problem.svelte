<script lang="ts">
    import { Skeleton } from "$components/ui/skeleton";
    interface Props {
        title?: string;
        description?: string;
    }

    let { title, description }: Props = $props();
    const titleFallback = "Problem Title";
</script>

<div class="h-full overflow-y-auto bg-background px-4 py-5">
    {#if title}
        <h2 class="mb-4 text-2xl font-bold">{title}</h2>
    {:else}
        <Skeleton class="h-8 w-[250px] mb-4" />
    {/if}
    <div>
        {#if description}
            <!-- eslint-disable svelte/no-at-html-tags -->
            {@html description}
        {:else}
            <div class="space-y-2 mb-8">
                <Skeleton class="h-4 w-full" />
                <Skeleton class="h-4 w-3/4" />
            </div>
            <div class="space-y-4 mb-8">
                <div class="space-y-2 mb-8">
                    <Skeleton class="h-4 w-[200px]" />
                    <Skeleton class="h-24 w-1/2" />
                </div>
            </div>
            <div class="space-y-2">
                <Skeleton class="h-4 w-[200px]" />
                <Skeleton class="h-4 w-[200px]" />
            </div>
        {/if}
    </div>
</div>
