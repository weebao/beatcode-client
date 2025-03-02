<script lang="ts">
    import Markdown from "@magidoc/plugin-svelte-marked";
    import changes from "$docs/changes.md?raw";
    import ScrollUpButton from "$components/misc/scroll-up-button.svelte";
</script>

<svelte:head>
    <title>Change Logs - BeatCode</title>
</svelte:head>

<main
    class="ld:my-16 prose prose-invert mx-auto my-4 max-w-[900px] space-y-6 p-4 text-sm leading-relaxed text-foreground prose-h1:font-icon prose-h1:font-medium prose-h2:font-icon prose-h2:text-secondary prose-h3:!mt-4 prose-a:font-semibold prose-a:text-primary prose-ul:!mt-0 lg:text-base"
>
    <Markdown source={changes} />
</main>
<ScrollUpButton screenWidth={900} />
