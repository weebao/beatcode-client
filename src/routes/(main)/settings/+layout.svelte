<script lang="ts">
    import type { LayoutProps } from "./$types";
    import { Separator } from "$components/ui/separator";
    import { Sidebar } from "$components/main/sidebar";

    let { children }: LayoutProps = $props();

    const sidebarNavItems = [
        {
            title: "Account",
            href: "/settings/account"
        }
    ];
</script>

<div class="mx-auto max-w-[1280px] space-y-6 py-10">
    <div class="space-y-0.5">
        <h2 class="font-icon text-4xl font-semibold tracking-tight">Settings</h2>
        <p class="text-muted-foreground">Manage your account settings here</p>
    </div>
    <Separator class="my-6" />
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside class="lg:w-1/5">
            <Sidebar items={sidebarNavItems} />
        </aside>
        <div class="flex-1 lg:max-w-4xl">
            {@render children?.()}
        </div>
    </div>
</div>
