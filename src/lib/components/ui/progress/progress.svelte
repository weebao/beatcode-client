<script lang="ts">
    import { Progress as ProgressPrimitive, type WithoutChildrenOrChild } from "bits-ui";
    import { cn } from "$lib/utils.js";

    interface ExtraProps {
        barColor?: string;
        isOpposite?: boolean;
    }

    let {
        ref = $bindable(null),
        class: className,
        barColor = "bg-primary",
        isOpposite,
        max = 100,
        value,
        ...restProps
    }: WithoutChildrenOrChild<ProgressPrimitive.RootProps & ExtraProps> = $props();
</script>

<ProgressPrimitive.Root
    bind:ref
    class={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {value}
    {max}
    {...restProps}
>
    <div
        class="h-full w-full flex-1 bg-primary transition-all {barColor}"
        style={`transform: translateX(${isOpposite ? "" : "-"}${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
    ></div>
</ProgressPrimitive.Root>
