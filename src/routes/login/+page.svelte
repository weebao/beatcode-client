<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import { toast } from "svelte-sonner";
    import SuperDebug, { type Infer, superForm } from "sveltekit-superforms";

    import * as Card from "$lib/components/ui/card";
    import * as Form from "$components/ui/form";
    import { Input } from "$components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button } from "$components/ui/button";
    import { Loader2 } from "lucide-svelte";

    import type { PageData } from "./$types";
    import type { LoginSchema } from "$models/auth";
    import { announce } from "$lib/utils";

    interface Props {
        data: PageData;
    }

    let { data } = $props();
    let loading = $state(false);

    const loginForm = superForm<Infer<typeof LoginSchema>>(data.form, {
        onResult: async ({ result }) => {
            loading = false;
            announce(result, "Logged in successfully");
        }
    });

    const {
        form: loginFormData,
        errors: loginErrors,
        enhance: enhanceLogin
    } = loginForm;
</script>

<div class="flex min-h-navscreen items-center justify-center bg-background">
    <Card.Root class="w-[350px]">
        <Card.Header>
            <Card.Title>Login</Card.Title>
            <Card.Description>Enter your credentials to access your account</Card.Description>
        </Card.Header>
        <form method="POST" use:enhanceLogin>
            <Card.Content>
                <!-- {#if authError || form?.error}
                    <div class="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                        {#if form?.error === "Email not verified"}
                            Please verify your email before logging in. Check your inbox for the
                            verification link.
                        {:else if authError}
                            {authError}
                        {:else}
                            {form?.error}
                        {/if}
                    </div>
                {/if} -->
                <div class="grid w-full items-center gap-4">
                    <div class="flex flex-col space-y-1.5">
                        <Label for="username">Email or Username</Label>
                        <Form.Field form={loginForm} name="username">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                    />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="password">Password</Label>
                        <Form.Field form={loginForm} name="password">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                    />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </div>
                </div>
            </Card.Content>
            <Card.Footer class="flex flex-col gap-2">
                <Button class="w-full" type="submit" disabled={loading}>
                    {#if loading}
                        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                    {/if}
                    Sign In
                </Button>
                <p class="text-center text-sm text-muted-foreground">
                    Don't have an account? <a href="/sign-up" class="text-primary hover:underline"
                        >Sign up</a
                    >
                </p>
            </Card.Footer>
        </form>
    </Card.Root>
</div>
