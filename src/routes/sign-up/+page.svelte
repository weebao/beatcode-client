<script lang="ts">
    export let form;
    console.log("Current form state:", form);
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Loader2 } from "lucide-svelte";

    let loading = false;
    let error: string | null = null;

    let email = "";
    let username = "";
    let displayName = "";
    let password = "";
    let confirmPassword = "";

    // Basic password validation
    $: passwordsMatch = password === confirmPassword;
    $: isValidPassword = password.length >= 8;

    function handleSubmit() {
        if (!passwordsMatch || !isValidPassword) {
            error = "Please fix the validation errors";
            return;
        }
        loading = true;
        // The actual submission is handled by the enhance action
    }
</script>

<div class="flex items-center justify-center min-h-screen bg-background">
    <Card class="w-[350px]">
        <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Sign up for a new account</CardDescription>
        </CardHeader>
        <form
            method="POST"
            use:enhance={() => {
                return async ({ result }) => {
                    loading = false;
                    if (result.type === 'success') {
                        goto('/login');
                    } else if (result.type === 'failure') {
                        error = result.data?.error;
                    }
                };
            }}
            on:submit|preventDefault={handleSubmit}
        >
            <CardContent>
                {#if error}
                    <div class="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">
                        {error}
                    </div>
                {/if}

                <div class="grid w-full items-center gap-4">
                    <div class="flex flex-col space-y-1.5">
                        <Label for="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            bind:value={username}
                            placeholder="your_username"
                            required
                        />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            bind:value={email}
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="displayName">Display Name</Label>
                        <Input
                            id="displayName"
                            name="displayName"
                            type="text"
                            bind:value={displayName}
                            placeholder="How others will see you"
                        />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            bind:value={password}
                            required
                        />
                        {#if password && !isValidPassword}
                            <p class="text-xs text-destructive">Password must be at least 8 characters</p>
                        {/if}
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="confirm-password">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            bind:value={confirmPassword}
                            required
                        />
                        {#if confirmPassword && !passwordsMatch}
                            <p class="text-xs text-destructive">Passwords do not match</p>
                        {/if}
                    </div>
                </div>
            </CardContent>
            <CardFooter class="flex flex-col gap-2">
                <Button
                    class="w-full"
                    type="submit"
                    disabled={loading || !passwordsMatch || !isValidPassword}
                >
                    {#if loading}
                        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                    {/if}
                    Create Account
                </Button>
                <p class="text-sm text-muted-foreground text-center">
                    Already have an account? <a href="/login" class="text-primary hover:underline">Sign in</a>
                </p>
            </CardFooter>
        </form>
    </Card>
</div>