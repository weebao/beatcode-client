<script lang="ts">
    import { cn } from "$lib/utils";
    const { text1 = "", text2 = "", class: className = "" } = $props();
</script>

<div
    class={cn(
        className,
        "group relative h-12 w-full overflow-hidden rounded-md border border-secondary px-4 py-2"
    )}
>
    <div
        class="absolute inset-0 flex w-full transform items-center justify-center text-center transition-transform duration-300 group-hover:-translate-y-full"
    >
        {text1}
    </div>
    <div
        class="absolute inset-0 flex w-full translate-y-full transform items-center justify-center text-center transition-transform duration-300 group-hover:translate-y-0"
    >
        {text2}
    </div>
</div>
