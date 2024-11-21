<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from "$app/navigation";
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Loader2 } from "lucide-svelte";
    import {handleLoginResponse, user} from '$models/user';

    export let form;
    let loading = false;

    function handleSubmit() {
        loading = true;
    }
</script>

<div class="flex items-center justify-center min-h-screen bg-background">
  <Card class="w-[350px]">
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Enter your credentials to access your account</CardDescription>
    </CardHeader>
    <form
        method="POST"
        use:enhance={() => {
            loading = true;
            return async ({ result }) => {
                loading = false;
                if (result.type === 'success' && result.data?.tokens) {
                    await handleLoginResponse(result.data.tokens);
                    goto('/');
                }
            };
        }}
    >
      <CardContent>
        {#if form?.error}
          <div class="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4">
            {#if form.error === 'Email not verified'}
              Please verify your email before logging in. Check your inbox for the verification link.
            {:else}
              {form.error}
            {/if}
          </div>
        {/if}
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="email">Email or Username</Label>
            <Input
                id="email"
                name="email"
                type="text"
                placeholder="name@example.com or username"
                required
            />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="password">Password</Label>
            <Input
                id="password"
                name="password"
                type="password"
                required
            />
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex flex-col gap-2">
        <Button class="w-full" type="submit" disabled={loading}>
          {#if loading}
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
          {/if}
          Sign In
        </Button>
        <p class="text-sm text-muted-foreground text-center">
          Don't have an account? <a href="/sign-up" class="text-primary hover:underline">Sign up</a>
        </p>
      </CardFooter>
    </form>
  </Card>
</div>