<script lang="ts">
    import type { PageData } from "./$types";
    import * as Card from "$components/ui/card";
    import Logo from "$assets/icons/logo.svelte";
    import { Button } from "$components/ui/button";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
</script>

<div class="flex h-navscreen justify-center bg-background">
    <Card.Root class="mt-12 h-fit max-w-[600px] px-4">
        <Card.Header>
            <div class="flex w-full flex-col items-center">
                <Logo class="h-24 w-24" />
                {#if data.status === "success"}
                    <h1 class="text-bold font-icon text-3xl font-bold">Success</h1>
                {:else}
                    <h1 class="text-bold font-icon text-3xl font-bold">Verification Failed</h1>
                {/if}
            </div>
        </Card.Header>
        <Card.Content class="pt-2 text-center">
            {#if data.status === "success"}
                <p>Your email has been successfully verified.</p>
                <Button class="mt-4" href="/login">Log in</Button>
            {:else}
                <p>An error occurred during email verification.</p>
                <p>{data.message}</p>
                <p>Please make sure you used the correct link or the token might have expired.</p>
            {/if}
        </Card.Content>
    </Card.Root>
</div>
