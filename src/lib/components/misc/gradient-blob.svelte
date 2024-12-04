<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { gbc } from "@yuvalkarif/gradient-blob";

    interface Props {
        class?: string;
        blobClass?: string;
        blur?: number;
        speed?: number;
        complexity?: number;
        size?: number;
    }

    let {
        class: className = "w-full h-96",
        blobClass = "bg-primary",
        blur = 100,
        speed = 3000, // increased from 2000 to allow smoother transitions
        complexity = 20
    }: Props = $props();

    let path = $state("0% 0%");

    const gbInstance = gbc({ cacheChance: 50 });

    let intervalId: ReturnType<typeof setInterval>;

    function change() {
        path = gbInstance.gb(complexity, {
            x: { min: 0, max: 100 },
            y: { min: 0, max: 100 },
            clipPathProperty: true
        });
    }

    onMount(() => {
        change();
        intervalId = setInterval(change, speed);
    });

    onDestroy(() => {
        clearInterval(intervalId);
    });
</script>

<div class={className} style="filter: blur({blur}px); opacity: 80%;">
    <div class="blob {blobClass}" style={path}></div>
</div>

<style>
    .blob {
        height: 100%;
        transition: clip-path 4s linear;
    }
</style>
