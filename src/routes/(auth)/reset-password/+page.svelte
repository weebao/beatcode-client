<script lang="ts">
    import type { PageData } from "./$types";
    import { type Infer, superForm } from "sveltekit-superforms";

    import Logo from "$assets/icons/logo.svelte";

    import * as Card from "$components/ui/card";
    import { Button } from "$components/ui/button";
    import { Input } from "$components/ui/input";
    import * as Form from "$components/ui/form";

    import { announce } from "$lib/utils";
    import type { ResetPasswordSchema } from "$models/auth";

    import { Loader2 } from "lucide-svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const form = superForm<Infer<typeof ResetPasswordSchema>>(data.form, {
        onResult: async ({ result }) => {
            if (result.type === "success" || result.type === "redirect") {
                announce(result, "Password reset successfully");
            }
        }
    });

    const { form: formData, submitting, enhance } = form;
</script>

<svelte:head>
    <title>Password reset - BeatCode</title>
</svelte:head>

<div class="flex justify-center bg-background">
    <Card.Root class="mt-12 h-fit px-2">
        <Card.Header>
            <div class="flex w-full flex-col items-center px-8">
                <Logo class="h-24 w-24" />
                <h1 class="text-bold font-icon text-2xl font-bold">Reset your password</h1>
            </div>
        </Card.Header>
        <Card.Content>
            <form method="POST" use:enhance>
                <div class="grid w-full items-center space-y-2">
                    <input type="text" name="token" bind:value={$formData.token} hidden />
                    <div class="flex flex-col">
                        <Form.Field {form} name="password">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        bind:value={$formData.password}
                                        type="password"
                                        placeholder="New Password"
                                        required
                                    />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </div>
                    <div class="flex flex-col">
                        <Form.Field {form} name="confirm_password">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        bind:value={$formData.confirm_password}
                                        type="password"
                                        placeholder="Confirm New Password"
                                        required
                                    />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </div>
                </div>
                <Button class="mt-4 w-full" type="submit" disabled={$submitting}>
                    {#if $submitting}
                        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                    {/if}
                    Reset Password
                </Button>
            </form>
        </Card.Content>
    </Card.Root>
</div>
