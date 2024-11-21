<script lang="ts">
    import { Button } from "$components/ui/button";
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$components/ui/card";
    import { Input } from "$components/ui/input";
    import { Label } from "$components/ui/label";
    import { Loader2 } from "lucide-svelte";

    let loading = false;
    let email = "";
    let username = "";
    let password = "";
    let confirmPassword = "";

    // Basic password validation
    $: passwordsMatch = password === confirmPassword;
    $: isValidPassword = password.length >= 8;

    async function handleSubmit() {
        loading = true;
        try {
            if (!passwordsMatch || !isValidPassword) {
                return;
            }
            // Add your signup logic here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
        } finally {
            loading = false;
        }
    }
</script>

<div class="flex items-center justify-center min-h-screen bg-background">
    <Card class="w-[350px]">
        <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Sign up for a new account</CardDescription>
        </CardHeader>
        <form on:submit|preventDefault={handleSubmit}>
            <CardContent>
                <div class="grid w-full items-center gap-4">
                    <div class="flex flex-col space-y-1.5">
                        <Label for="username">Username</Label>
                        <Input
                            id="username"
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
                            type="email"
                            bind:value={email}
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
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