<script>
    import { FrownIcon } from "lucide-svelte";
    /** @type {{status: any}} */
    let { status } = $props();
</script>

<div class="flex h-navscreen flex-col items-center justify-center text-center">
    <FrownIcon />
    <div class="mb-4 text-5xl font-bold">Error {status}</div>
    <p>Seems like there have been an issue...</p>
    <a class="text-xl font-semibold text-primary hover:underline" href="/">Go to Main Page</a>
</div>
