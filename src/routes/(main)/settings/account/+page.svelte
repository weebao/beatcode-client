<script lang="ts">
    import type { PageData } from "../$types";
    import { type Infer, superForm } from "sveltekit-superforms";
    import { ProfileSchema } from "$models/user";

    import { Input } from "$components/ui/input";
    import { Label } from "$components/ui/label";
    import { Button } from "$components/ui/button";
    import * as Form from "$components/ui/form";
    import { toast } from "svelte-sonner";
    import { Loader2 } from "lucide-svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const form = superForm<Infer<typeof ProfileSchema>>(data.form, {
        onResult: async ({ result }) => {
            if (result.type === "success") {
                toast.success("Profile updated successfully");
            }
        }
    });

    const { form: formData, enhance, submitting } = form;
</script>

<svelte:head>
    <title>Profile - BeatCode</title>
</svelte:head>

<div class="flex max-w-xl bg-background">
    <form method="POST" use:enhance action="?/updateProfile" class="w-full">
        <div class="space-y-4">
            <Form.Field {form} name="username">
                <Form.Control>
                    {#snippet children({ props })}
                        <Label for="username">Username</Label>
                        <Input
                            {...props}
                            bind:value={$formData.username}
                            name="username"
                            type="text"
                            required
                            readonly
                        />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="display_name">
                <Form.Control>
                    {#snippet children({ props })}
                        <Label for="display_name">Display Name</Label>
                        <Input
                            {...props}
                            bind:value={$formData.display_name}
                            name="display_name"
                            type="text"
                            required
                        />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <Form.Field {form} name="email">
                <Form.Control>
                    {#snippet children({ props })}
                        <Label for="email">Email</Label>
                        <Input
                            {...props}
                            bind:value={$formData.email}
                            name="email"
                            type="email"
                            required
                            readonly
                        />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

            <div class="space-y-2">
                <Label for="password">Password</Label>
                <Input type="password" placeholder="••••••••" disabled disableEye required />
                <a href="/forgot-password" class="text-sm text-secondary hover:underline"
                    >Reset password</a
                >
            </div>

            <Button type="submit" disabled={$submitting}>
                {#if $submitting}
                    <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                {/if}
                Save Changes
            </Button>
        </div>
    </form>
</div>

<style>
</style>
