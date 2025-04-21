<script lang="ts">
    import { onMount } from "svelte";
    import type { PageProps } from "./$types";
    import { gsap } from "gsap";
    import { TextPlugin } from "gsap/TextPlugin";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { cn } from "$lib/utils";

    gsap.registerPlugin(TextPlugin);
    gsap.registerPlugin(ScrollTrigger);

    import User1 from "$assets/images/landing/user1.png?enhanced";
    import User2 from "$assets/images/landing/user2.png?enhanced";
    import {
        AbiltiesImg,
        LangsImg,
        RanksImg,
        RuntimeImg,
        AvatarImg,
        HeroImg
    } from "$assets/images/landing";

    import { Button } from "$components/ui/button";
    import ScrollUpButton from "$components/misc/scroll-up-button.svelte";

    // let { data }: PageProps = $props();
    let mounted = $state<boolean>(false);

    let img1: HTMLElement;
    let img2: HTMLElement;

    const features = [
        {
            icon: RanksImg,
            title: "Ranked Mode",
            description: "Level up by testing your LeetCode skills against others (Elo-based)"
        },
        {
            icon: HeroImg,
            title: "Custom Room",
            description: "Challenge your friends and practice together"
        },
        {
            icon: AvatarImg,
            title: "Practice Mode (New✨)",
            description: "No need to wait for long. You can play right away with a bot!"
        },
        {
            icon: LangsImg,
            title: "Multiple Languages",
            description: "Code in your favorite language"
        },
        {
            icon: RuntimeImg,
            title: "Runtime Analysis",
            description: "Improve by learning the time complexity of your code"
        },
        {
            icon: AbiltiesImg,
            title: "Special Abilities",
            description: "8 ways to make your opponent crash out. Try them out below"
        }
    ];

    onMount(() => {
        mounted = true;
        const tl = gsap.timeline();
        // Use query selectors for the words
        const titleSelectors = [1, 2, 3, 4].map((i) => `.word-${i}`);
        tl.from(titleSelectors, {
            opacity: 0,
            y: 10,
            filter: "blur(10px)",
            duration: 0.5,
            ease: "ease.out",
            stagger: 0.2
        });
        tl.from(".word-5", {
            duration: 0.1,
            opacity: 0
        });
        tl.to(".word-5", {
            duration: 0.3,
            text: "magic",
            ease: "none"
        });

        gsap.from([img1, img2], {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "ease.out",
            delay: 0.3
        });

        gsap.from(".feature-card", {
            scrollTrigger: {
                trigger: ".features-section",
                start: "top 80%"
            },
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15
        });
    });
</script>

<section class="relative mb-12 flex flex-col items-center">
    <div class="mb-8 mt-20 flex flex-col items-center md:mt-24">
        <h1 class="clip-path-inset absolute h-px w-px overflow-hidden whitespace-nowrap">
            Head-to-head coding battle with magic
        </h1>
        <div
            aria-hidden="true"
            class={cn(
                mounted ? "" : "opacity-0", // Initially hidden until mounted and animated
                "hero-title relative mb-4 flex h-32 flex-col gap-2 text-center text-5xl font-semibold text-neutral-100 md:mb-0 md:text-6xl"
            )}
        >
            <div>
                <span class="word-1 inline-block">Head-to-head</span>
                <span class="word-2 inline-block">coding</span>
                <span class="word-3 inline-block">battle</span>
            </div>
            <div class="flex w-full justify-center">
                <span class="word-4 inline-block">with</span>
                &nbsp;
                <span
                    class="word-5 mt-1 inline-block rounded-sm bg-rose/10 px-2 font-mono
                         text-rose shadow-rose text-shadow-center md:mt-1.5"
                ></span>
            </div>
        </div>
    </div>
    <Button class="text-md font-medium lg:text-lg" href="/practice">Play now</Button>
    <div
        class={cn(
            mounted ? "" : "opacity-0",
            "relative mt-20 flex w-3/4 max-w-[1280px] justify-center lg:w-1/2"
        )}
    >
        <div
            bind:this={img1}
            class="-translate-x-6 rounded-sm border-2 border-neutral shadow-xl lg:-translate-x-12"
        >
            <enhanced:img src={User1} alt="Gameplay" class="rounded-sm object-contain" />
        </div>
        <div
            bind:this={img2}
            class="absolute -right-1 -top-12 -z-10 h-full w-full rounded-sm border-2 border-neutral shadow-xl md:-right-8"
        >
            <enhanced:img src={User2} alt="Gameplay" class="rounded-sm object-contain" />
        </div>
    </div>
</section>

<section class="mb-12 flex flex-col items-center overflow-hidden">
    <div class="mb-6 flex flex-col items-center">
        <h2 class="font-icon text-4xl">How to play?</h2>
    </div>
    <iframe
        src="https://www.youtube.com/embed/O7C7Tl8N2rY?si=ZAHdwBFe4OrhlUMm"
        class="aspect-video max-w-xl"
        width="100%"
        height="100%"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
</section>

<section
    class="features-section mx-auto mb-12 flex max-w-[1280px] flex-col
         items-center overflow-hidden"
>
    <div class="mb-6 flex flex-col items-center">
        <h2 class="mb-2 font-icon text-4xl">Features</h2>
    </div>
    <div class="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each features as feature}
            <div
                class="feature-card group flex flex-col items-center
                       justify-center rounded-md border-2 border-secondary p-4"
            >
                <feature.icon class="h-32 w-64 stroke-[1.5] p-2" />
                <h3 class="mt-2 text-center text-lg font-semibold">{feature.title}</h3>
                <p class="max-w-[40ch] text-center text-secondary">{feature.description}</p>
            </div>
        {/each}
    </div>
    <Button href="/playground">Try out abilities on playground</Button>
</section>

<ScrollUpButton screenWidth={1280} />

<style></style>
