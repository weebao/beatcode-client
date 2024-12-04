<script lang="ts">
    import { cn } from "$lib/utils.js";

    interface Props {
        ref?: HTMLDivElement | null;
        class?: string;
        variant?: "primary" | "secondary";
        orientation?: "horizontal" | "vertical";
        text?: string;
    }

    let {
        ref = $bindable(null),
        class: className,
        variant = "secondary",
        orientation = "horizontal",
        text = "",
        ...restProps
    }: Props = $props();
</script>

{#if orientation === "horizontal"}
    <div
        bind:this={ref}
        class={cn("flex items-center justify-center space-x-2", className)}
        {...restProps}
    >
        <div class={cn("h-px w-full rounded", `bg-${variant}`)}></div>
        {#if text}
            <span class={cn("text-sm", `text-${variant}`)}>{text}</span>
            <div class={cn("h-px w-full rounded", `bg-${variant}`)}></div>
        {/if}
    </div>
{:else}
    <div bind:this={ref} class={cn("flex flex-col items-center gap-1", className)} {...restProps}>
        <div class={cn("h-6 w-[2px] rounded-sm", `bg-${variant}`)}></div>
        {#if text}
            <div class={cn("font-semibold", `text-${variant}`)}>{text}</div>
            <div class={cn("h-6 w-[2px] rounded-sm", `bg-${variant}`)}></div>
        {/if}
    </div>
{/if}
