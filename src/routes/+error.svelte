<script>
    import { FrownIcon } from "lucide-svelte";
    /** @type {{status: any}} */
    let { status } = $props();
</script>

<div class="flex flex-col items-center py-10 text-center">
    <FrownIcon class="mb-4 h-80 w-80 stroke-secondary stroke-1" />
    <h1 class="mb-2 text-5xl font-bold">Error {status}</h1>
    <p class="mb-4">Seems like there have been an issue...</p>
    <a class="text-xl font-semibold text-primary hover:underline" href="/">Go to Main Page</a>
</div>
