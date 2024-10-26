<script lang="ts">
    import type { PageData } from "./$types";
    import SuperDebug, { type Infer, superForm } from "sveltekit-superforms";
    import { toast } from "svelte-sonner";

    import type { CreateRoomSchema, JoinRoomSchema } from "$lib/zod-schemas";
    import {
        Button
    } from "$components/ui/button";
    import * as Dialog from "$components/ui/dialog";
    import * as Form from "$components/ui/form";
    import { Input } from "$components/ui/input";

    import { Copy, Link } from "lucide-svelte";

    export let data: PageData;
    let { name, roomCode } = data;
    let isDialogOpen = name === undefined;

    const joinRoomForm = superForm<Infer<typeof JoinRoomSchema>>(data.joinRoomForm, {
        onResult: ({ result: r }) => {
            if (r?.type !== "success") {
                toast.error(`Error: ${JSON.stringify(r, null, 2)}`);
            }
        }
    });

    const {
        form: joinRoomFormData,
        errors: joinRoomErrors,
        enhance: enhanceJoinRoom,
        message: joinRoomMessage
    } = joinRoomForm;

    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    }
</script>

<div class="mx-auto mt-16 flex flex-col items-center">
    <h1 class="font-bold text-5xl mb-4">Game Room</h1>
    <p class="text-xl mb-2">Code: {roomCode}</p>
    <div class="flex items-center gap-2 mb-4">
        <Button variant="outline" size="icon" class="w-8 h-8 p-1.5" on:click={() => copy(roomCode)}>
            <Copy />
        </Button>
        <Button variant="outline" size="icon" class="w-8 h-8 p-1.5" on:click={() => copy(`http://localhost:5173/room/${roomCode}`)}>
            <Link />
        </Button>
    </div>
    <Button size="lg" class="text-lg mt-4">Start Game</Button>
</div>
<!-- If not authenticated - prompt user to enter name -->
<Dialog.Root bind:open={isDialogOpen} closeOnEscape={false} closeOnOutsideClick={false}>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>What's your name?</Dialog.Title>
            <Dialog.Description>
                First time here? Please enter your name to join.
            </Dialog.Description>
        </Dialog.Header>
        <form method="POST" use:enhanceJoinRoom action="?/joinRoom">
            <Form.Field form={joinRoomForm} name="name">
                <Form.Control let:attrs>
                    <Input
                        {...attrs}
                        placeholder="Enter your name"
                        bind:value={$joinRoomFormData.name}
                    />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field form={joinRoomForm} name="roomCode">
                <Form.Control let:attrs>
                    <Input
                        {...attrs}
                        type="hidden"
                        value={roomCode}
                    />
                </Form.Control>
            </Form.Field>
            <Dialog.Footer>
                <Button type="submit">Save changes</Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root>

<style>
</style>
