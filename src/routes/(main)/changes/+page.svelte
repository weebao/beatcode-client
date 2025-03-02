<script lang="ts">
    import { Separator } from "$components/ui/separator";
    import Markdown from "@magidoc/plugin-svelte-marked";
    import changes from "$docs/changes.md?raw";
    import ScrollUpButton from "$components/misc/scroll-up-button.svelte";
</script>

<svelte:head>
    <title>Change Logs - BeatCode</title>
</svelte:head>

<main class="mx-auto prose prose-invert prose-h1:font-medium prose-h1:font-icon prose-h2:font-icon prose-h2:text-secondary prose-h3:!mt-4 prose-ul:!mt-0 prose-a:text-primary prose-a:font-semibold text-foreground my-4 ld:my-16 max-w-[900px] space-y-6 p-4 text-sm leading-relaxed lg:text-base">
    <Markdown source={changes} />
</main>
<ScrollUpButton screenWidth={900} />