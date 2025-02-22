<script lang="ts">
    import { cn } from '$lib/utils';
    const { text1 = '', text2 = '', class: className = '' } = $props();
</script>

<div
    class={cn(
        className,
        "w-full relative border border-secondary rounded-md px-4 py-2 overflow-hidden group h-12"
    )}
>
    <div
        class="absolute inset-0 w-full text-center flex items-center justify-center transition-transform duration-300 transform group-hover:-translate-y-full"
    >
        {text1}
    </div>
    <div
        class="absolute inset-0 w-full text-center flex items-center justify-center transition-transform duration-300 transform translate-y-full group-hover:translate-y-0"
    >
        {text2}
    </div>
</div>