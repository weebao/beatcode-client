<script lang="ts">
    import { Progress as ProgressPrimitive } from "bits-ui";
    import { cn } from "$lib/utils.js";

    type $$Props = ProgressPrimitive.Props & {
        isOpposite?: boolean;
        barColor?: string;
    };

    interface Props {
        class?: $$Props["class"];
        max?: $$Props["max"];
        value?: $$Props["value"];
        isOpposite?: $$Props["isOpposite"];
        barColor?: $$Props["barColor"];
        [key: string]: any;
    }

    let {
        class: className = undefined,
        max = 100,
        value = undefined,
        isOpposite = false,
        barColor = "bg-primary",
        ...rest
    }: Props = $props();
</script>

<ProgressPrimitive.Root
    class={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...rest}
>
    <div
        class={cn(barColor, "h-full w-full flex-1 transition-all duration-1000")}
        style={`transform: translateX(${isOpposite ? "" : "-"}${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
    ></div>
</ProgressPrimitive.Root>
