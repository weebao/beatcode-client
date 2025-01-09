<script lang="ts">
    import type { PageData } from "../$types";
    import { type Infer, superForm } from "sveltekit-superforms";
    import { ProfileSchema } from "$models/user";

    import { Input } from "$components/ui/input";
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

<div class="flex h-navscreen justify-center bg-background">
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
                        />
                    {/snippet}
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>

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
