<script lang="ts">
    import HeroImg from "$assets/images/hero.png";
    import { Button } from "$components/ui/button";

    let count = 0;
</script>

<section class="flex flex-col items-center overflow-hidden">
    <div
        class="mb-4 mt-24 flex flex-col items-center px-4 text-2xl leading-none max-md:mt-10 max-md:max-w-full md:text-5xl"
    >
        <h1
            class="text-center text-2xl font-semibold text-neutral-100 max-md:max-w-full md:text-4xl"
        >
            Head-to-head live coding battle
        </h1>
        <div
            class="mt-3 flex items-center justify-center gap-2 whitespace-nowrap text-2xl md:gap-4 md:text-4xl"
        >
            <span
                class="my-auto gap-2.5 self-stretch pb-2 text-2xl font-semibold text-neutral-100 md:text-4xl"
            >
                with
            </span>
            <span
                class="my-auto gap-2.5 self-stretch bg-rose px-1 py-0 font-mono text-2xl text-rose-foreground md:px-2 md:py-0.5 md:text-4xl"
            >
                magic
            </span>
        </div>
    </div>
    <a href="/custom">
        <Button class="text-md font-medium lg:text-lg">Start now</Button>
    </a>
    <img loading="lazy" src={HeroImg} alt="Hero" class="w-[50%] object-contain max-md:w-[80%]" />
</section>
