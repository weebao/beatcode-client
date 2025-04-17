<script lang="ts">
    import type { User } from "$models/user";
    import { Button } from "$components/ui/button";
    import * as Dialog from "$components/ui/dialog";

    interface Props {
        user?: User;
        loginUrl: string;
        guestAction?: string;
    }
    let { user, loginUrl, guestAction }: Props = $props();
</script>

<Dialog.Root open={!user}>
    <Dialog.Content class="sm:max-w-[425px]" hideCloseButton interactOutsideBehavior="ignore">
        <Dialog.Header>
            <Dialog.Title>Umm, akshually you can't play yet ☝️🤓</Dialog.Title>
            <Dialog.Description>Please click one below to play</Dialog.Description>
        </Dialog.Header>
        <form method="POST" action={guestAction ?? ""}>
            <Button href={loginUrl}>Sign in</Button>
            {#if guestAction}
                <Button type="submit" variant="secondary">Play as guest</Button>
            {/if}
            <Button href="/" variant="ghost">Go home</Button>
        </form>
    </Dialog.Content>
</Dialog.Root>
