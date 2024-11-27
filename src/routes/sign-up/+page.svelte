<script lang="ts">
    export let form;
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button";
    import {
        Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle
    } from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Loader2 } from "lucide-svelte";
    import { onDestroy } from "svelte";

    let loading = false;
    let error: string | null = null;
    let isCheckingEmail = false;
    let emailError: string | null = null;
    let emailCheckTimeout: NodeJS.Timeout;

    let email = "";
    let username = "";
    let displayName = "";
    let password = "";
    let confirmPassword = "";

    const VALIDATION = {
        USERNAME: {
            MIN_LENGTH: 3,
            MAX_LENGTH: 20,
            REGEX: /^[a-zA-Z0-9_-]+$/
        },
        DISPLAY_NAME: {
            MIN_LENGTH: 3,
            MAX_LENGTH: 20,
            REGEX: /.*/
        },
        PASSWORD: {
            MIN_LENGTH: 8
        },
        EMAIL: {
            // RFC 5322 compliant email regex
            REGEX: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        }
    };

    // Add this with other reactive statements
    $: isValidEmail = email && VALIDATION.EMAIL.REGEX.test(email);
    $: isValidUsername =
        username.length >= VALIDATION.USERNAME.MIN_LENGTH &&
        username.length <= VALIDATION.USERNAME.MAX_LENGTH &&
        VALIDATION.USERNAME.REGEX.test(username);
    $: passwordValidation = {
        isLengthValid: password.length >= VALIDATION.PASSWORD.MIN_LENGTH,
        isMatching: password === confirmPassword && password.length > 0
    };

    $: isPasswordValid = passwordValidation.isLengthValid && passwordValidation.isMatching;

    function handleSubmit() {
        const errors = [];

        if (!isValidUsername) {
            errors.push("Username is invalid");
        }
        if (!isValidEmail) {
            errors.push("Please enter a valid email address");
        }
        if (!passwordValidation.isLengthValid) {
            errors.push(`Password must be at least ${VALIDATION.PASSWORD.MIN_LENGTH} characters`);
        }
        if (!passwordValidation.isMatching) {
            errors.push("Passwords do not match");
        }

        if (errors.length > 0) {
            error = errors.join(". ");
            return;
        }

        loading = true;
    }

    async function checkEmailAvailability(emailToCheck: string) {
        if (!isValidEmail) {
            emailError = null;
            return;
        }

        isCheckingEmail = true;
        emailError = null;

        try {
            const response = await fetch("/api/check-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: emailToCheck })
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.detail === "Email already registered") {
                    emailError = "This email is already registered";
                }
            }
        } catch (e) {
            console.error("Failed to check email availability:", e);
        } finally {
            isCheckingEmail = false;
        }
    }

    $: if (email && isValidEmail) {
        clearTimeout(emailCheckTimeout);
        emailCheckTimeout = setTimeout(() => {
            checkEmailAvailability(email);
        }, 500);
    }

    onDestroy(() => {
        if (emailCheckTimeout) {
            clearTimeout(emailCheckTimeout);
        }
    });
</script>

<div class="flex min-h-screen items-center justify-center bg-background">
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
                    if (result.type === "success") {
                        goto("/login");
                    } else if (result.type === "failure") {
                        error = result.data?.error;
                    }
                };
            }}
            on:submit|preventDefault={handleSubmit}
        >
            <CardContent>
                {#if error}
                    <div class="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
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
                        {#if username && !isValidUsername}
                            <p class="text-xs text-destructive">
                                Username must be {VALIDATION.USERNAME.MIN_LENGTH}-{VALIDATION
                                    .USERNAME.MAX_LENGTH} characters and contain only letters, numbers,
                                underscores, and hyphens
                            </p>
                        {/if}
                    </div>

                    <div class="flex flex-col space-y-1.5">
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            bind:value={email}
                            placeholder="name@example.com"
                            class={email && !isValidEmail ? "border-destructive" : ""}
                            required
                        />
                        {#if email && !isValidEmail}
                            <p class="text-xs text-destructive">
                                Please enter a valid email address
                            </p>
                        {/if}
                    </div>

                    <div class="flex flex-col space-y-1.5">
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            bind:value={password}
                            class={password && !passwordValidation.isLengthValid
                                ? "border-destructive"
                                : ""}
                            required
                        />
                        {#if password && !passwordValidation.isLengthValid}
                            <p class="text-xs text-destructive">
                                Password must be at least {VALIDATION.PASSWORD.MIN_LENGTH} characters
                            </p>
                        {/if}
                    </div>

                    <div class="flex flex-col space-y-1.5">
                        <Label for="confirm-password">Confirm Password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            bind:value={confirmPassword}
                            class={confirmPassword && !passwordValidation.isMatching
                                ? "border-destructive"
                                : ""}
                            required
                        />
                        {#if confirmPassword && !passwordValidation.isMatching}
                            <p class="text-xs text-destructive">Passwords do not match</p>
                        {/if}
                    </div>
                </div>
            </CardContent>
            <CardFooter class="flex flex-col gap-2">
                <Button
                    class="w-full"
                    type="submit"
                    disabled={loading || !isValidUsername || !isValidEmail || !isPasswordValid}
                >
                    {#if loading}
                        <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                    {/if}
                    Create Account
                </Button>
                <p class="text-center text-sm text-muted-foreground">
                    Already have an account? <a href="/login" class="text-primary hover:underline"
                        >Sign in</a
                    >
                </p>
            </CardFooter>
        </form>
    </Card>
</div>
