<script lang="ts">
    import type { WithElementRef, WithoutChildren } from "bits-ui";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "$lib/utils.js";

    let {
        ref = $bindable(null),
        class: className,
        ...restProps
    }: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> = $props();
</script>

<div
    bind:this={ref}
    class={cn(
        "relative isolate animate-pulse overflow-hidden rounded-md bg-secondary/10 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-foreground/10 before:bg-gradient-to-r before:from-transparent before:via-foreground/10 before:to-transparent",
        className
    )}
    {...restProps}
></div>
