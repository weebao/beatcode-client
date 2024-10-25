<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    let { name, roomId } = data;
</script>

<div>
    <h1>Game Room</h1>
    <p>Room ID: {roomId}</p>
    <p>Name: {name}</p>
</div>

<style>
</style>
