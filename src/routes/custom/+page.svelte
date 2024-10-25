<script lang="ts">
    import { browser } from "$app/environment";
    import SuperDebug, { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { toast } from "svelte-sonner";

    import type { PageData } from "./$types";
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";

    import type { CreateRoomSchema, JoinRoomSchema } from "$lib/zod-schemas";
    import Logo from "$assets/icons/logo.svelte";
    import { Button } from "$components/ui/button";

    export let data: PageData;
    let name = "";

    const createRoomForm = superForm<Infer<CreateRoomSchema>>(data.createRoomForm, {
        onResult: ({ result: r }) => {
            if (r?.type === "success") {
                toast.success(`Creating room...`);
                resetName();
            } else {
                toast.error(`Error: ${JSON.stringify(r, null, 2)}`);
            }
        }
    });
    const joinRoomForm = superForm<Infer<JoinRoomSchema>>(data.joinRoomForm, {
        onResult: ({ result: r }) => {
            if (r.type === "success") {
                toast.success(`Joining room...`);
                resetName();
            } else {
                toast.error(`Error: ${JSON.stringify(r, null, 2)}`);
            }
        }
    });

    const {
        form: createRoomFormData,
        errors: createRoomErrors,
        enhance: enhanceCreateRoom,
        message: createRoomMessage
    } = createRoomForm;

    const {
        form: joinRoomFormData,
        errors: joinRoomErrors,
        enhance: enhanceJoinRoom,
        message: joinRoomMessage
    } = joinRoomForm;

    const updateNames = (event) => {
        const value = event.target.value;
        name = value;
        $createRoomFormData.name = value;
        $joinRoomFormData.name = value;
    };

    const resetName = () => {
        name = "";
        $createRoomFormData.name = "";
        $joinRoomFormData.name = "";
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
    <div class="flex flex-col space-y-2">
        <Input class="w-full" placeholder="Enter your name" bind:value={name} on:input={updateNames} />
        {#if $createRoomErrors.name || $joinRoomErrors.name}
            <p class="text-base font-semibold text-destructive">
                {$createRoomErrors.name || $joinRoomErrors.name}
            </p>
        {/if}
    </div>
    <!-- Create room -->
    <form method="POST" use:enhanceCreateRoom action="?/createRoom">
        <!-- Bad code alert: This is for logging the name input above into this form :) -->
        <Form.Field form={createRoomForm} name="name" class="hidden">
            <Form.Control let:attrs>
                <Input
                    {...attrs}
                    placeholder="Enter your name"
                    bind:value={$createRoomFormData.name}
                />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Button class="w-full" type="submit">Create Room</Button>
    </form>
    <!-- {#if browser}
        <SuperDebug data={$createRoomFormData} />
    {/if} -->
    <div class="flex items-center justify-center space-x-2">
        <div class="h-px w-full rounded bg-secondary"></div>
        <span class="text-sm uppercase text-secondary">or</span>
        <div class="h-px w-full rounded bg-secondary"></div>
    </div>
    <!-- Join room -->
    <form class="flex w-full space-x-2" method="POST" use:enhanceJoinRoom action="?/joinRoom">
        <!-- Bad code alert: This is for logging the name input above into this form :) -->
        <Form.Field form={joinRoomForm} name="name" class="hidden flex-1">
            <Form.Control let:attrs>
                <Input
                    {...attrs}
                    placeholder="Enter your name"
                    bind:value={$joinRoomFormData.name}
                />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field form={joinRoomForm} name="roomCode" class="flex-1">
            <Form.Control let:attrs>
                <Input
                    {...attrs}
                    placeholder="Enter room code"
                    bind:value={$joinRoomFormData.roomCode}
                />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Button variant="secondary" type="submit">Join</Button>
    </form>
    <!-- {#if browser}
        <SuperDebug data={$joinRoomFormData} />
    {/if} -->
</div>

<style>
</style>
