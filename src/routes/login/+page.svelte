<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Loader2 } from "lucide-svelte";
    import { goto } from "$app/navigation";

    let loading = false;
    let email = "";
    let password = "";

    async function handleSubmit() {
        loading = true;
        try {
            // Add your login logic here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
        } finally {
            loading = false;
        }
    }
</script>

<div class="flex items-center justify-center min-h-screen bg-background">
  <Card class="w-[350px]">
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Enter your credentials to access your account</CardDescription>
    </CardHeader>
    <form on:submit|preventDefault={handleSubmit}>
      <CardContent>
        <div class="grid w-full items-center gap-4">
          <div class="flex flex-col space-y-1.5">
            <Label for="email">Email</Label>
            <Input id="email" type="email" bind:value={email} placeholder="name@example.com" />
          </div>
          <div class="flex flex-col space-y-1.5">
            <Label for="password">Password</Label>
            <Input id="password" type="password" bind:value={password} />
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