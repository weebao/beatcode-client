<script lang="ts">
    import HeroImg from "$lib/assets/images/hero.png";
    import { Button } from "$lib/components/ui/button";

    let count = 0;
</script>

<section class="flex flex-col items-center overflow-hidden">
    <div
        class="mb-4 mt-24 flex flex-col items-center text-5xl leading-none max-md:mt-10 max-md:max-w-full max-md:text-4xl"
    >
        <h1 class="text-center font-semibold text-neutral-100 max-md:max-w-full max-md:text-4xl">
            Head-to-head live coding battle
        </h1>
        <div class="mt-3 flex items-center justify-center gap-4 whitespace-nowrap max-md:text-4xl">
            <span
                class="my-auto gap-2.5 self-stretch pb-2 font-semibold text-neutral-100 max-md:text-4xl"
            >
                with
            </span>
            <span
                class="my-auto gap-2.5 self-stretch bg-rose px-2 py-0.5 font-mono text-rose-foreground max-md:text-4xl"
            >
                magic
            </span>
        </div>
    </div>
    <a href="/custom">
        <Button class="text-lg font-medium">Start now</Button>
    </a>
    <img loading="lazy" src={HeroImg} alt="Hero" class="w-[50%] object-contain max-md:w-[80%]" />
</section>
