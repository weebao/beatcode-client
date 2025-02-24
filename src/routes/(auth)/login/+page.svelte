<script lang="ts">
    import { goto } from "$app/navigation";
    import type { PageProps } from "./$types";
    import { type Infer, superForm } from "sveltekit-superforms";

    import * as Card from "$components/ui/card";
    import * as Dialog from "$components/ui/dialog";
    import * as Form from "$components/ui/form";
    import { Input } from "$components/ui/input";
    import { Button } from "$components/ui/button";
    import { Separator } from "$components/ui/separator";

    import DrawingCloud from "$components/misc/drawing-cloud.svelte";

    import { announce } from "$lib/utils";
    import type { LoginSchema } from "$models/auth";

    import { Loader2 } from "lucide-svelte";

    import Google from "$assets/icons/google.svelte";
    import LogoVertical from "$assets/images/logo-vertical.svelte";

    let { data }: PageProps = $props();
    let isLoggingIn = $state<boolean>(false);

    const form = superForm<Infer<typeof LoginSchema>>(data.form, {
        onResult: async ({ result }) => {
            announce(result, "Logged in successfully");
            if (result.type === "redirect") {
                goto("/home");
            }
        }
    });

    const { form: formData, enhance, submitting } = form;
</script>

<svelte:head>
    <title>Log in - BeatCode</title>
</svelte:head>

<div class="flex justify-center bg-background">
    <Card.Root class="mt-12 h-fit w-[350px]">
        <Card.Header>
            <div class="my-3 flex w-full justify-center">
                <LogoVertical />
            </div>
        </Card.Header>
        <form method="POST" use:enhance action="?/account">
            <Card.Content>
                <div class="grid w-full items-center space-y-2">
                    <div class="flex flex-col">
                        <Form.Field {form} name="username">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        bind:value={$formData.username}
                                        type="text"
                                        placeholder="Username or Email"
                                        required
                                    />
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </div>
                    <div class="flex flex-col">
                        <Form.Field {form} name="password">
                            <Form.Control>
                                {#snippet children({ props })}
                                    <Input
                                        {...props}
                                        bind:value={$formData.password}
                                        type="password"
                                        placeholder="Password"
                                        required
                                    />
                                    <a
                                        href="/forgot-password"
                                        class="text-right text-sm text-secondary hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                {/snippet}
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </div>
                </div></Card.Content
            >
            <Card.Footer class="flex flex-col gap-2">
                <Button class="w-full" type="submit" disabled={$submitting}>
                    {#if $submitting}
                        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                    {/if}
                    Sign In
                </Button>
                <Separator text="OR" class="my-4 w-full" />
                <Button
                    class="flex w-full items-center gap-4 pr-4 text-secondary"
                    href="/login/google"
                    variant="outline"
                >
                    <Google />
                    Sign in with Google
                </Button>
                <div class="flex flex-col space-y-2">
                    <p class="mt-4 text-center text-sm text-muted-foreground">
                        Don't have an account yet?
                        <a href="/register" class="text-primary hover:underline"> Sign up </a>
                    </p>
                    <button
                        type="submit"
                        class="text-center text-sm text-muted-foreground hover:underline"
                        formaction="?/guest"
                        formnovalidate
                        onclick={() => {
                            isLoggingIn = true;
                        }}
                    >
                        Sign in as guest
                    </button>
                </div>
            </Card.Footer>
        </form>
    </Card.Root>
</div>
<Dialog.Root open={isLoggingIn}>
    <Dialog.Content class="sm:max-w-[425px]" hideCloseButton interactOutsideBehavior="ignore">
        <div class="my-4 flex flex-col items-center space-y-4">
            <DrawingCloud />
            <div class="text-2xl">Signing in as guest...</div>
        </div>
    </Dialog.Content>
</Dialog.Root>
