<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { cn } from '$lib/utils';
    import { ArrowUp } from 'lucide-svelte';

    interface Props {
        screenWidth?: number;
        class?: string;
    }

    const { screenWidth = 0, class: className = '' }: Props = $props();
    let rightOffset = $state<string>('1rem');
    let showButton = $state<boolean>(false);

    let vw = writable(0);
    vw.subscribe((val) => {
        rightOffset = screenWidth > 0 && val > screenWidth
        ? `${($vw - screenWidth) / 2}px`
        : '1rem';
    })
    
    const updateShowButton = () => {
        showButton = window.scrollY > 200;
    };

    onMount(() => {
        if (typeof window !== 'undefined') {
            vw.set(window.innerWidth);
            window.addEventListener('resize', () => vw.set(window.innerWidth));
            
            window.addEventListener('scroll', updateShowButton);
            updateShowButton();

            return () => {
                window.removeEventListener('resize', () => vw.set(window.innerWidth));
                window.removeEventListener('scroll', updateShowButton);
            };
        }
    });
</script>

<div
    class={cn(
        "fixed bottom-4 transition-all duration-300 z-10",
        showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none',
        "bg-background-dark border border-secondary text-white rounded-full p-2 shadow-lg hover:scale-110",
        className
    )}
    style={`right: ${rightOffset};`}
    role="button"
    tabindex="0"
    onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    onkeydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }}
>
    <ArrowUp class="text-secondary" />
</div>