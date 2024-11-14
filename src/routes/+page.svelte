<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
    import TextPlugin from "gsap/TextPlugin";
    
    import { SparkleIcon } from "lucide-svelte";

    import HeroImg from "$assets/images/hero.png";
    import { Button } from "$components/ui/button";

    onMount(() => {
        gsap.registerPlugin(TextPlugin);
        const tl = gsap.timeline();
        tl.to(".header-1", {
            duration: 1.5,
            text: "Live LeetCode battle",
            ease: "none",
        });
        tl.to(".header-2", {
            duration: 0.25,
            text: "with",
            ease: "none",
        });
        tl.from(".header-3", {
            opacity: 0
        });
        tl.to(".header-3", {
            duration: 1,
            text: "magic",
            ease: "none",
        });
        tl.from(".sparkle", {
            duration: 0.5,
            opacity: 0,
            scale: 0,
            ease: "back.out(2)",
        });
        tl.to(".sparkle", {
            duration: 2,
            rotation: 360,
            ease: "elastic.out(1,0.5)",
            repeat: -1,
            repeatDelay: 0,
        });
    });
</script>

<section class="flex flex-col items-center overflow-hidden">
    <div
        class="mb-8 mt-24 flex flex-col items-center"
    >   
        <h1 class="absolute clip-path-inset h-px overflow-hidden whitespace-nowrap w-px">Live LeetCode battle with magic</h1>
        <div
            class="relative text-center text-5xl md:text-7xl flex flex-col gap-2 font-semibold text-neutral-100"
        >
            <span class="header-1 w-full"></span>
            <span class="flex justify-center w-full">
                <span class="header-2"></span>
                &nbsp;
                <span class="mt-1 md:mt-1.5 header-3 font-mono px-2 rounded-sm bg-rose/10 text-rose shadow-rose text-shadow-center"></span>
                <SparkleIcon class="ml-2 mt-2 w-12 h-12 sparkle text-rose shadow-rose text-shadow-[0_0_12px_#EBADC1]" fill="#EBADC1" />
            </span>
        </div>
    </div>
    <a href="/custom">
        <Button class="text-md font-medium lg:text-lg">Start now</Button>
    </a>
    <img loading="lazy" src={HeroImg} alt="Hero" class="w-2/3 object-contain max-w-[1280px]" />
</section>
