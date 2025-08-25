<script lang="ts">
    import type { PageProps } from "./$types";

    import { type Infer, superForm } from "sveltekit-superforms";
    import { RegisterWithGoogleSchema } from "$models/auth";

    import * as Card from "$components/ui/card";
    import { Button } from "$components/ui/button";
    import * as Form from "$components/ui/form";
    import { Input } from "$components/ui/input";
    import { Skeleton } from "$components/ui/skeleton";

    import Logo from "$assets/icons/logo.svelte";
    import { Loader2 } from "lucide-svelte";

    import { announce } from "$lib/utils";
    import { onMount } from "svelte";

    let { data }: PageProps = $props();

    let form = $state<any>();
    let formData = $state<any>();
    let submitting = $state<any>();
    let enhance = $state<any>();

    onMount(() => {
        if (data.status === "success" && data.form) {
            const registerForm = superForm<Infer<typeof RegisterWithGoogleSchema>>(data.form, {
                onResult: async ({ result }) => {
                    if (result.type === "redirect") {
                        announce(result, "Account created successfully");
                    }
                }
            });
            form = registerForm;
            const { form: fd, submitting: sub, enhance: enh } = registerForm;
            formData = fd;
            submitting = sub;
            enhance = enh;
        }
    });
</script>

<svelte:head>
    <title>Log in with Google - BeatCode</title>
</svelte:head>

<div class="flex justify-center bg-background">
    <Card.Root class="mt-12 h-fit max-w-[600px] px-8 py-4">
        <Card.Header>
            <div class="flex w-full flex-col items-center">
                <Logo class="h-12 w-full" />
                {#if data.info}
                    <div class="mt-4 space-y-1 text-center">
                        <h1 class="font-icon text-3xl font-semibold">
                            Welcome, {data.info.name}!
                        </h1>
                        <h3>Glad to have you here! Please complete your profile below.</h3>
                    </div>
                {/if}
            </div>
        </Card.Header>
        <Card.Content>
            {#if form && formData}
                <form method="POST" use:enhance>
                    <div class="space-y-4">
                        <Form.Field {form} name="username">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        bind:value={$formData.username}
                                        type="text"
                                        placeholder="Username"
                                        required
                                    />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>

                        <Form.Field {form} name="display_name">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        bind:value={$formData.display_name}
                                        type="text"
                                        placeholder="Display Name"
                                        required
                                    />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>

                        <Form.Field {form} name="email">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        bind:value={$formData.email}
                                        type="email"
                                        placeholder="Email"
                                        required
                                        readonly
                                    />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>

                        <input type="hidden" name="google_id" bind:value={$formData.google_id} />
                        <input type="hidden" name="avatar_url" bind:value={$formData.avatar_url} />

                        <Button type="submit" disabled={submitting ? $submitting : false}>
                            {#if submitting && $submitting}
                                <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            {:else}
                                Save profile
                            {/if}
                        </Button>
                    </div>
                </form>
            {:else if data.status === "error"}
                <div class="mb-4 space-y-2">
                    <p class="text-2xl font-semibold">Something went wrong.</p>
                    <p>{data.message}</p>
                </div>
                <Button href="/login">Go back</Button>
            {:else}
                <div class="flex flex-col items-center space-y-4">
                    <Skeleton class="h-8 w-full" />
                    <Skeleton class="h-8 w-full" />
                    <Skeleton class="h-8 w-full" />
                </div>
            {/if}
        </Card.Content>
    </Card.Root>
</div>
