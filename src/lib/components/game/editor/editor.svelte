<script lang="ts">
    import { browser } from "$app/environment";
    import { EditorView } from "@codemirror/view";
    import { EditorData } from "./editor-data.svelte";
    import { cn } from "$lib/utils";

    interface Props {
        class?: string;
        data: EditorData;
        useAbility: (ability: string) => void;
    }

    let { class: className, data, useAbility }: Props = $props();
    let isRickrolled = $state<boolean>(false);
    let editor = $state<HTMLDivElement>();
    let editorView: EditorView;

    $effect(() => {
        editorView = new EditorView({
            parent: editor
        });

        data.link(editorView, useAbility);
        data.setRickroll = (on: boolean) => (isRickrolled = on);

        return () => {
            editorView.destroy();
        };
    });
</script>

{#if browser}
    <div
        bind:this={editor}
        class={cn(className, "relative h-full w-full [&>div]:h-full [&>div]:w-full [&>div]:p-2")}
    >
        {#if isRickrolled}
            <figure class="pointer-events-none absolute left-0 top-0 h-full w-full">
                <iframe
                    id="ytplayer"
                    title="Rick Astley - Never Gonna Give You Up"
                    width="100%"
                    height="100%"
                    class="h-full w-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&disablekb=1&playsinline=1&color=white"
                    frameborder="0"
                    allow="autoplay"
                >
                </iframe>
            </figure>
        {/if}
    </div>
{:else}
    <!-- fallback -->
    <div class="flex h-full w-full items-center justify-center">
        <p>Editor is not available outside the browser environment.</p>
    </div>
{/if}

<style>
</style>
