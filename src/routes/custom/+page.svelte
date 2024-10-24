<script lang="ts">
  import Logo from "$lib/assets/icons/logo.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
</script>

<svelte:head>
  <title>BeatCode</title>
</svelte:head>

<div class="max-w-96 mx-auto mt-16 p-6 border border-secondary rounded-md space-y-4">
  <div class="flex flex-col items-center mb-8">
    <Logo className="w-16 h-16" />
    <h1 class="font-semibold text-xl">Let's get started</h1>
  </div>
  <Input class="w-full" placeholder="Enter your name" />
  <Button class="w-full">Create Room</Button>
  <div class="flex items-center justify-center space-x-2">
    <div class="h-px w-full bg-secondary rounded"></div>
    <span class="text-secondary uppercase text-sm">or</span>
    <div class="h-px w-full bg-secondary rounded"></div>
  </div>
  <div class="flex space-x-2">
    <Input class="flex-1" placeholder="Enter room code" />
    <Button variant="secondary">Join</Button>
  </div>
</div>

<style>
</style>