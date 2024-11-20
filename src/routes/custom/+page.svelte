<script lang="ts">
    import { browser } from "$app/environment";
    import SuperDebug, { type Infer, superForm } from "sveltekit-superforms";
    import { toast } from "svelte-sonner";

    import type { PageData } from "./$types";
    import type { CreateRoomSchema, JoinRoomSchema } from "$lib/zod-schemas";

    import Logo from "$assets/icons/logo.svelte";
    import * as Form from "$components/ui/form";
    import { Input } from "$components/ui/input";
    import { Button } from "$components/ui/button";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let name = $state(data.name);

    const createRoomForm = superForm<Infer<typeof CreateRoomSchema>>(data.createRoomForm, {
        onResult: ({ result: r }) => {
            if (r?.type === "success" || r?.status === 303) {
                toast.success(`Creating room...`);
            } else {
                toast.error(`Error: ${JSON.stringify(r, null, 2)}`);
            }
        }
    });
    const joinRoomForm = superForm<Infer<typeof JoinRoomSchema>>(data.joinRoomForm, {
        onResult: ({ result: r }) => {
            if (r?.type === "success" || r?.status === 303) {
                toast.success(`Joining room...`);
            } else {
                toast.error(`Server error: Maybe the server hasn't started yet
                            ${JSON.stringify(r, null, 2)}`);
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

    const updateNames = (event: InputEvent) => {
        const value = (event.target as HTMLInputElement).value;
        $createRoomFormData.name = value;
    };
</script>

<svelte:head>
    <title>BeatCode</title>
</svelte:head>

<div class="mx-auto mt-16 max-w-96 space-y-4 rounded-md border border-secondary p-6">
    <div class="mb-6 flex flex-col items-center">
        <Logo class="h-16 w-16" />
        <h1 class="text-3xl font-icon font-medium">Custom Mode</h1>
    </div>

    <div class="space-y-2">
        <!-- Join room -->
        <form class="flex w-full space-x-2" method="POST" use:enhanceJoinRoom action="?/joinRoom">
            <Form.Field form={joinRoomForm} name="roomCode" class="flex-1">
                <Form.Control>
                    {#snippet children({ props })}
                        <Input
                            {...props}
                            placeholder="Enter room code"
                            bind:value={$joinRoomFormData.roomCode}
                        />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Button variant="secondary" type="submit">Join</Button>
        </form>
        <!-- {#if browser}
            <SuperDebug data={$joinRoomFormData} />
        {/if} -->
        <!-- Create room -->
        <form method="POST" use:enhanceCreateRoom action="?/createRoom">
            <Button class="w-full" type="submit">Create New Room</Button>
        </form>
        <!-- {#if browser}
            <SuperDebug data={$createRoomFormData} />
        {/if} -->
    </div>
    <div class="flex items-center justify-center space-x-2">
        <div class="h-px w-full rounded bg-secondary"></div>
        <span class="text-sm uppercase text-secondary">or</span>
        <div class="h-px w-full rounded bg-secondary"></div>
    </div>
    <Button class="w-full" variant="accent" href="/custom/lobby">Browse Lobby</Button>
 
</div>

<style>
</style>
