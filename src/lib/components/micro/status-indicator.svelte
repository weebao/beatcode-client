<script lang="ts">
    import { cn } from "$lib/utils.js";

    interface Props {
        status: number;
        class?: string;
    }

    let { status, class: className = "" }: Props = $props();
</script>

<div
    class={cn(
        "h-3 w-3 animate-pulse rounded-full transition-all duration-300",
        status === 0 && "bg-yellow-500",
        status === 1 && "bg-primary",
        status === -1 && "bg-neutral",
        className
    )}
></div>

<style>
</style>
