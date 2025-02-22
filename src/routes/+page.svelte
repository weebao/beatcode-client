<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import { TextPlugin } from "gsap/TextPlugin";

    gsap.registerPlugin(TextPlugin);

    import { SparkleIcon } from "lucide-svelte";

    import User1 from "$assets/images/landing/user1.png?enhanced";
    import User2 from "$assets/images/landing/user2.png?enhanced";

    import { Button } from "$components/ui/button";
    import GradientBlob from "$components/misc/gradient-blob.svelte";
    import TextSlideButton from "$components/misc/text-slide-button.svelte";
    import ScrollUpButton from "$components/misc/scroll-up-button.svelte";

    import { cn } from "$lib/utils.js";

    let isNotMounted = true;

    onMount(() => {
        isNotMounted = false;
        gsap.registerPlugin(TextPlugin);
        const tl = gsap.timeline();
        tl.to(".header-1", {
            duration: 1.5,
            text: "Head-to-head coding battle",
            ease: "none"
        });
        tl.to(".header-2", {
            duration: 0.25,
            text: "with",
            ease: "none"
        });
        tl.from(".header-3", {
            opacity: 0
        });
        tl.to(".header-3", {
            duration: 1,
            text: "magic",
            ease: "none"
        });
        tl.from(".sparkle", {
            duration: 0.5,
            opacity: 0,
            scale: 0,
            ease: "back.out(2)"
        });
        tl.to(".sparkle", {
            duration: 3,
            rotation: 360,
            ease: "elastic.out(1,0.5)",
            repeat: -1,
            repeatDelay: 0
        });
    });
</script>

<section class="relative mb-12 flex flex-col items-center">
    <div class="mb-8 mt-20 flex flex-col items-center md:mt-24">
        <h1 class="clip-path-inset absolute h-px w-px overflow-hidden whitespace-nowrap">
            Head-to-head coding battle with magic
        </h1>
        <div
            class="relative mb-4 flex h-32 flex-col gap-2 text-center text-5xl font-semibold text-neutral-100 md:mb-0 md:text-6xl"
        >
            <span class="header-1 w-full"></span>
            <span class="flex w-full justify-center">
                <span class="header-2"></span>
                &nbsp;
                <span
                    class="header-3 mt-1 rounded-sm bg-rose/10 px-2 font-mono text-rose shadow-rose text-shadow-center md:mt-1.5"
                    class:hidden={isNotMounted}
                ></span>
                <SparkleIcon
                    class={cn(
                        "sparkle ml-2 mt-2 h-12 w-12 stroke-rose text-rose shadow-rose text-shadow-[0_0_12px_#EBADC1]",
                        isNotMounted ? "hidden" : ""
                    )}
                    fill="#EBADC1"
                />
            </span>
        </div>
    </div>
    <Button class="text-md font-medium lg:text-lg" href="/login">Start now</Button>
    <div class="relative mt-24 flex w-3/4 max-w-[1000px] justify-center lg:w-1/2">
        <div class="-translate-x-12 rounded-sm border-2 border-neutral shadow-xl">
            <enhanced:img src={User1} alt="Gameplay" class="rounded-sm object-contain" />
        </div>
        <div
            class="absolute -right-1 -top-12 -z-10 h-full w-full rounded-sm border-2 border-neutral shadow-xl md:-right-8"
        >
            <enhanced:img src={User2} alt="Gameplay" class="rounded-sm object-contain" />
        </div>
    </div>
    <GradientBlob class="absolute left-0 top-2/3 -z-20 h-1/2 w-full -translate-y-1/2 opacity-50" />
    <GradientBlob
        class="absolute right-0 top-2/3 -z-20 h-1/2 w-1/2 -translate-y-3/4 opacity-50"
        blobClass="bg-amber-200/80"
    />
</section>

<section class="mb-12 flex flex-col items-center overflow-hidden">
    <div class="mb-6 flex flex-col items-center">
        <h2 class="font-icon text-4xl">How to play?</h2>
    </div>
    <iframe
        src="https://www.youtube.com/embed/O7C7Tl8N2rY?si=ZAHdwBFe4OrhlUMm"
        class="aspect-video min-h-[400px]"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
</section>

<section class="mx-auto mb-12 flex max-w-[500px] flex-col items-center overflow-hidden">
    <div class="mb-6 flex flex-col items-center">
        <h2 class="mb-2 font-icon text-4xl">Features</h2>
        <p class="text-secondary">Hover for details. No fancy images sorry :)</p>
    </div>
    <div class="w-full space-y-2 mb-4">
        <TextSlideButton
            text1="Real-time Battles"
            text2="Fight random people or create a custom room with your friends!"
        />
        <TextSlideButton
            text1="Multiple Languages (Python, Java, C++)"
            text2="Since some people are allergic to Python"
        />
        <TextSlideButton
            text1="Runtime Analysis"
            text2="Instantly know the time complexity of your code after it passed"
        />
        <TextSlideButton
            text1="Special Abilities"
            text2="8 ways to make your opponent crash out. Try it out below"
        />
    </div>
    <Button href="/playground" class="w-full">Try out abilities in the playground</Button>
</section>

<ScrollUpButton screenWidth={1280} />

<style></style>
