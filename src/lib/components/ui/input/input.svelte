<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";
    import { Toggle, type WithElementRef } from "bits-ui";
    import { Eye, EyeClosed } from "lucide-svelte";
    import { cn } from "$lib/utils.js";

    interface ExtraProps {
        containerClass?: string;
        disableEye?: boolean;
    }

    let {
        ref = $bindable(null),
        value = $bindable(),
        class: className,
        containerClass,
        disableEye,
        type = $bindable(),
        ...restProps
    }: WithElementRef<HTMLInputAttributes & ExtraProps> = $props();

    let show = $state(type === "password" ? false : undefined);
</script>

<div class={cn("relative", containerClass)}>
    <input
        bind:this={ref}
        class={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 read-only:opacity-50",
            className,
            { "pr-10": type === "password" }
        )}
        bind:value
        type={show ? "text" : type}
        {...restProps}
    />
    {#if type === "password" && !disableEye}
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <Toggle.Root bind:pressed={show} class="text-muted-foreground hover:text-foreground">
                {#if show}
                    <Eye class="h-5 w-5 stroke-2" />
                {:else}
                    <EyeClosed class="h-5 w-5 stroke-2" />
                {/if}
            </Toggle.Root>
        </div>
    {/if}
</div>
