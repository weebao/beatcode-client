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

<svelte:head>
    <title>Password reset - BeatCode</title>
</svelte:head>

<div class="flex h-navscreen justify-center bg-background">
    <Card.Root class="mt-12 h-fit max-w-[600px] px-4">
        <Card.Header>
            <div class="flex w-full flex-col items-center">
                <Logo class="h-24 w-24" />
                {#if data.status === "success"}
                    <h1 class="text-bold font-icon text-3xl font-bold">Password reset</h1>
                {:else}
                    <h1 class="text-bold font-icon text-3xl font-bold">Something went wrong</h1>
                {/if}
            </div>
        </Card.Header>
        <Card.Content class="pt-2 text-center">
            {#if data.status === "success"}
                <div class="mb-4">
                    <p>We have sent an email to <a
                        href="https://mail.google.com/mail/u/0/#inbox"
                        class="font-icon font-semibold text-primary hover:underline">{data.user?.email}</a
                    >. Please check your inbox for the password reset link.</p>
                </div>
            {:else}
                <p>An error occurred during password reset.</p>
                <p>{data.message}</p>
            {/if}
        </Card.Content>
    </Card.Root>
</div>
