<script lang="ts">
    import { enhance } from '$app/forms';
    import Logo from '$assets/icons/logo.svelte';
    import { Button } from '$components/ui/button';
    import { Input } from '$components/ui/input';

    let name = "";

    const addName = ({ formData }) => {
        formData.append('name', name);
    };
</script>

<svelte:head>
    <title>BeatCode</title>
</svelte:head>

<div class="mx-auto mt-16 max-w-96 space-y-4 rounded-md border border-secondary p-6">
    <div class="mb-8 flex flex-col items-center">
        <Logo className="w-16 h-16" />
        <h1 class="text-xl font-semibold">Let's get started</h1>
    </div>
    <!-- Input name -->
    <Input class="w-full" placeholder="Enter your name" bind:value={name} />
    <!-- Create room -->
    <form method="POST" use:enhance={addName} action="?/createRoom">
        <Button class="w-full" type="submit">Create Room</Button>
    </form>
    <div class="flex items-center justify-center space-x-2">
        <div class="h-px w-full rounded bg-secondary"></div>
        <span class="text-sm uppercase text-secondary">or</span>
        <div class="h-px w-full rounded bg-secondary"></div>
    </div>
    <!-- Join room -->
    <form class="flex space-x-2" method="POST" use:enhance={addName} action="?/joinRoom">
        <Input class="flex-1" name="roomCode" placeholder="Enter room code" />
        <Button variant="secondary" type="submit">Join</Button>
    </form>
</div>

<style>
</style>
