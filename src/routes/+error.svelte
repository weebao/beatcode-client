<script>
    /** @type {{status: any}} */
    let { status } = $props();
</script>

<div class="flex h-navscreen flex-col items-center justify-center text-center">
    <div class="mb-4 text-5xl font-bold">Error {status}</div>
    <a class="text-xl font-semibold text-primary hover:underline" href="/">Go to Main Page</a>
</div>
