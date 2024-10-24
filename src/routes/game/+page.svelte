<script lang="ts">
</script>

<svelte:head>BeatCode - Game</svelte:head>

<div class="flex flex-col overflow-hidden bg-gray-800 px-2.5 pb-2.5 pt-5">
    <div
        class="flex w-full flex-wrap items-end justify-center gap-6 whitespace-nowrap font-medium max-md:max-w-full"
    >
        <div
            class="flex min-w-[240px] flex-1 shrink basis-0 flex-wrap items-center gap-2 max-md:max-w-full"
        >
            <div
                class="my-auto flex h-[50px] w-[50px] shrink-0 self-stretch rounded-full bg-zinc-300"
            />
            <div
                class="my-auto flex min-w-[240px] flex-1 shrink basis-0 flex-col self-stretch max-md:max-w-full"
            >
                <div class="text-lg leading-loose text-neutral-100 max-md:max-w-full">
                    TheWelcomer
                </div>
                <div
                    class="flex min-h-[20px] w-full flex-col items-start overflow-hidden rounded-2xl bg-gray-700 text-sm leading-loose text-green-950 max-md:max-w-full"
                >
                    <div
                        class="h-full w-[436px] max-w-full flex-1 gap-2.5 self-stretch overflow-hidden rounded-2xl bg-emerald-200 p-4"
                    >
                        2689
                    </div>
                </div>
            </div>
        </div>
        <div
            class="flex h-full justify-center gap-0.5 self-stretch text-base leading-7 text-neutral-100"
        >
            <div
                class="flex h-full items-center gap-2.5 overflow-hidden rounded-xl bg-gray-700 px-4 py-1"
            >
                <div class="my-auto flex items-center gap-1 self-stretch">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f87236f1b5f31ef31a3631e147e612e67b146593080f01680e35ef883021fe34?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                        class="my-auto aspect-square w-5 shrink-0 self-stretch object-contain"
                    />
                    <div class="my-auto self-stretch">Run</div>
                </div>
            </div>
            <div
                class="flex h-full items-center gap-2.5 overflow-hidden rounded-none bg-gray-700 px-4 py-1"
            >
                <div class="my-auto flex items-center gap-1 self-stretch">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/07bc44e028ec0b65b0523b235481ccd667cff42b98878071257cf743f853c1d4?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                        class="my-auto aspect-square w-5 shrink-0 self-stretch object-contain"
                    />
                    <div class="my-auto self-stretch">Submit</div>
                </div>
            </div>
        </div>
        <div
            class="flex min-w-[240px] flex-1 shrink basis-0 flex-wrap items-center gap-2 max-md:max-w-full"
        >
            <div
                class="my-auto flex min-w-[240px] flex-1 shrink basis-0 flex-col self-stretch max-md:max-w-full"
            >
                <div class="text-right text-lg leading-loose text-neutral-100 max-md:max-w-full">
                    Weebao
                </div>
                <div
                    class="flex min-h-[20px] w-full flex-col items-end overflow-hidden rounded-2xl bg-gray-700 text-sm leading-loose text-red-950 max-md:max-w-full"
                >
                    <div
                        class="h-full w-[436px] max-w-full flex-1 gap-2.5 self-stretch overflow-hidden rounded-2xl bg-pink-300 p-4"
                    >
                        2689
                    </div>
                </div>
            </div>
            <div
                class="my-auto flex h-[50px] w-[50px] shrink-0 self-stretch rounded-full bg-zinc-300"
            />
        </div>
    </div>
    <div class="mt-3 flex w-full px-0.5 max-md:max-w-full">
        <div class="mr-0 mt-1.5 flex min-h-[926px] flex-auto flex-wrap gap-2">
            <div
                class="flex min-w-[240px] flex-1 shrink basis-0 flex-col overflow-hidden rounded-lg border border-solid border-slate-500 text-sm max-md:max-w-full"
            >
                <div
                    class="flex w-full flex-wrap items-center gap-2 overflow-hidden whitespace-nowrap bg-gray-700 px-4 py-1 font-medium leading-7 text-neutral-100 max-md:max-w-full"
                >
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c684fcd5d125783834b471acf67ba04af09a4df1943d7d5d8929486fe6ec1c8?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                        class="my-auto aspect-square w-4 shrink-0 self-stretch object-contain"
                    />
                    <div class="my-auto self-stretch">Problem</div>
                </div>
                <div class="flex w-full flex-1 flex-col overflow-hidden p-5 max-md:max-w-full">
                    <div class="text-2xl font-semibold leading-none text-white">1. Two Sum</div>
                    <div class="mt-4 flex w-full flex-col leading-7 text-white max-md:max-w-full">
                        <div class="max-md:max-w-full">
                            Given an array of integers <span class="">nums</span> and an integer
                            <span class="">target</span>, return indices of the two numbers such
                            that they add up to target.
                        </div>
                        <div class="mt-2 italic max-md:max-w-full">
                            You may assume that each input would have <span
                                class="font-extrabold italic">exactly one solution</span
                            >, and you may not use the same element twice.
                        </div>
                        <div class="mt-2 max-md:max-w-full">
                            You can return the answer in any order.
                        </div>
                    </div>
                    <div class="mt-4 flex w-full flex-col max-md:max-w-full">
                        <div class="flex w-full flex-col max-md:max-w-full">
                            <div class="leading-7 text-white max-md:max-w-full">Example 1:</div>
                            <div
                                class="mt-1 flex w-full flex-wrap justify-center gap-2.5 text-white max-md:max-w-full"
                            >
                                <div class="flex h-12 w-[3px] shrink-0 rounded-lg bg-gray-700" />
                                <div class="my-auto flex-1 shrink basis-0 max-md:max-w-full">
                                    <span class="font-bold">Input:</span> nums = [2,7,11,15], target
                                    = 9 <span class="font-bold">Output:</span> [0,1]
                                    <span class="font-bold">Explanation: </span>Because nums[0] +
                                    nums[1] == 9, we return [0, 1].
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 flex w-full flex-col max-md:max-w-full">
                            <div class="leading-7 text-white max-md:max-w-full">Example 2:</div>
                            <div
                                class="mt-1 flex w-full flex-wrap justify-center gap-2.5 text-white max-md:max-w-full"
                            >
                                <div class="flex h-8 w-[3px] shrink-0 rounded-lg bg-gray-700" />
                                <div class="my-auto flex-1 shrink basis-0 max-md:max-w-full">
                                    <span class="font-bold">Input:</span> nums = [3,2,4], target = 6
                                    <span class="font-bold">Output:</span> [1,2]
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 flex w-full flex-col max-md:max-w-full">
                            <div class="leading-7 text-white max-md:max-w-full">Example 3:</div>
                            <div
                                class="mt-1 flex w-full flex-wrap justify-center gap-2.5 text-white max-md:max-w-full"
                            >
                                <div class="flex h-8 w-[3px] shrink-0 rounded-lg bg-gray-700" />
                                <div class="my-auto flex-1 shrink basis-0 max-md:max-w-full">
                                    <span class="font-bold">Input:</span> nums = [3,3], target = 6
                                    <span class="font-bold">Output:</span> [0,1]
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex min-w-[240px] flex-1 shrink basis-0 flex-col max-md:max-w-full">
                <div
                    class="flex w-full flex-1 flex-col overflow-hidden rounded-lg border border-solid border-slate-500 text-sm max-md:max-w-full"
                >
                    <div
                        class="flex w-full flex-wrap items-center gap-2 overflow-hidden whitespace-nowrap bg-gray-700 px-4 py-1 font-medium leading-7 text-neutral-100 max-md:max-w-full"
                    >
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5d1d8ad9b1a0459d1a7ac1d79adf93feed7f6fc286937ac043b8ed69001f3c0?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                            class="my-auto aspect-square w-4 shrink-0 self-stretch object-contain"
                        />
                        <div class="my-auto self-stretch">Code</div>
                    </div>
                    <div
                        class="flex size-full flex-1 flex-wrap items-start gap-4 bg-neutral-800 p-3 font-bold max-md:max-w-full"
                    >
                        <div class="flex flex-col items-end whitespace-nowrap text-gray-500">
                            <div class="overflow-hidden px-2.5 py-1">1</div>
                            <div class="overflow-hidden px-2.5 py-1">2</div>
                            <div class="overflow-hidden px-2.5 py-1">3</div>
                            <div class="overflow-hidden px-2.5 py-1">4</div>
                            <div class="overflow-hidden px-2.5 py-1">5</div>
                            <div class="overflow-hidden px-2.5 py-1">6</div>
                            <div class="overflow-hidden px-2.5 py-1">7</div>
                            <div class="overflow-hidden px-2.5 py-1 text-slate-300">8</div>
                        </div>
                        <div
                            class="flex min-w-[240px] flex-1 shrink basis-0 flex-col text-slate-300 max-md:max-w-full"
                        >
                            <div class="w-full rounded py-1 text-neutral-300 max-md:max-w-full">
                                <span class="text-blue-400">class</span>
                                <span class="text-emerald-400">Solution</span><span
                                    class="text-neutral-100">:</span
                                >
                            </div>
                            <div
                                class="w-full overflow-hidden bg-rose-300 bg-opacity-20 py-1 max-md:max-w-full"
                            >
                                <span class="text-blue-400">def</span>
                                <span class="text-lime-200">solution</span><span
                                    class="text-neutral-300">(</span
                                ><span class="text-blue-300">self</span><span
                                    class="text-neutral-300"
                                    >,
                                </span><span class="text-blue-300">nums</span><span
                                    class="text-neutral-300"
                                    >,
                                </span><span class="text-blue-300">target</span><span
                                    class="text-neutral-300"
                                    >):
                                </span><span class="text-red-400">deletio</span>
                            </div>
                            <div class="w-full rounded py-1 max-md:max-w-full">
                                hashmap = &123;&125;
                            </div>
                            <div class="w-full rounded py-1 max-md:max-w-full">
                                <span class="text-zinc-400">for</span> i, num
                                <span class="text-zinc-400">in</span>
                                <span class="text-lime-200">enumerate</span>(nums):
                            </div>
                            <div class="w-full rounded py-1 max-md:max-w-full">
                                diff = target - num
                            </div>
                            <div class="w-full rounded py-1 max-md:max-w-full">
                                <span class="text-zinc-400">if</span> diff
                                <span class="text-blue-400">in</span> hashmap:
                            </div>
                            <div class="w-full rounded py-1 max-md:max-w-full">
                                <span class="text-zinc-400">return</span> [hashmap[diff], i]
                            </div>
                            <div class="w-full rounded py-1 max-md:max-w-full">
                                hashmap[num] = i
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="mt-3 flex min-h-[361px] w-full flex-col overflow-hidden rounded-lg border border-solid border-slate-500 leading-7 max-md:max-w-full"
                >
                    <div
                        class="flex w-full flex-wrap items-center gap-2.5 overflow-hidden bg-gray-700 px-4 py-1 text-sm font-medium text-slate-500 max-md:max-w-full"
                    >
                        <div class="my-auto flex items-center gap-1 self-stretch whitespace-nowrap">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/af741d1e6bc3378773c3440cdb3cf950b1473128ef85c38e68b2326a2cea8f54?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                                class="my-auto aspect-square w-4 shrink-0 self-stretch object-contain"
                            />
                            <div class="my-auto self-stretch">Testcase</div>
                        </div>
                        <div
                            class="my-auto flex h-5 w-px shrink-0 self-stretch rounded-lg bg-slate-500"
                        />
                        <div class="my-auto flex items-center gap-1 self-stretch">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9148e54c59957cd08e197bed2d7d9a197448c700ab72dcc08c281281b7c799d1?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                                class="my-auto aspect-square w-4 shrink-0 self-stretch object-contain"
                            />
                            <div class="my-auto self-stretch">Test Result</div>
                        </div>
                        <div
                            class="my-auto flex h-5 w-px shrink-0 self-stretch rounded-lg bg-slate-500"
                        />
                        <div
                            class="my-auto flex items-center gap-1 self-stretch whitespace-nowrap text-neutral-100"
                        >
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4eca3d886822941caa4729a8fa7dd369b4f40426a3ebd600ba48a33abb5452ce?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                                class="my-auto aspect-square w-4 shrink-0 self-stretch object-contain"
                            />
                            <div class="my-auto self-stretch">Skills</div>
                        </div>
                        <div
                            class="my-auto flex h-5 w-px shrink-0 self-stretch rounded-lg bg-slate-500"
                        />
                        <div class="my-auto flex items-center gap-1 self-stretch whitespace-nowrap">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d1ce74e32850160ad6a359b80b1770c30a07a16f9292de8dd9553dd37d9844fd?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                                class="my-auto aspect-square w-4 shrink-0 self-stretch object-contain"
                            />
                            <div class="my-auto self-stretch">Chat</div>
                        </div>
                    </div>
                    <div
                        class="flex w-full flex-1 flex-col overflow-hidden px-5 pt-6 max-md:max-w-full"
                    >
                        <div class="flex w-full flex-col max-md:max-w-full">
                            <div
                                class="gap-2.5 self-start whitespace-nowrap rounded bg-pink-300 px-2 text-base font-bold text-stone-600"
                            >
                                deletio
                            </div>
                            <div
                                class="mt-5 flex w-full flex-wrap items-center text-sm max-md:max-w-full"
                            >
                                <div
                                    class="my-auto flex w-[189px] shrink grow flex-col self-stretch overflow-hidden rounded-lg border border-solid border-slate-500 p-3"
                                >
                                    <div class="text-white">
                                        Delete one random line of your opponent’s code
                                    </div>
                                    <div
                                        class="mt-4 w-full gap-1 self-stretch whitespace-nowrap rounded bg-gray-700 px-2 py-0.5 text-neutral-100"
                                    >
                                        Available
                                    </div>
                                </div>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6138ad70b126140e43885673f36a24bfca3362e8547f0fb9ae088e41f325982?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                                    class="my-auto aspect-[2.72] w-[38px] shrink-0 self-stretch stroke-slate-500 stroke-[2px] object-contain"
                                />
                                <div
                                    class="my-auto flex w-[189px] shrink grow flex-col self-stretch overflow-hidden rounded-lg border border-solid border-slate-500 p-3"
                                >
                                    <div class="text-white">Upgrade to 2 lines of code deleted</div>
                                    <div
                                        class="mt-4 w-full gap-1 self-stretch rounded bg-slate-500 px-2 py-0.5 text-neutral-100"
                                    >
                                        Buy: 2 SP
                                    </div>
                                </div>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6138ad70b126140e43885673f36a24bfca3362e8547f0fb9ae088e41f325982?placeholderIfAbsent=true&apiKey=bc3d0587a3cd430bad549de1fba2e645"
                                    class="my-auto aspect-[2.72] w-[38px] shrink-0 self-stretch stroke-slate-500 stroke-[2px] object-contain"
                                />
                                <div
                                    class="my-auto flex w-[189px] shrink grow flex-col self-stretch overflow-hidden rounded-lg border border-solid border-slate-500 p-3"
                                >
                                    <div class="text-white">Upgrade to 3 lines of code deleted</div>
                                    <div
                                        class="mt-4 w-full gap-1 self-stretch rounded bg-gray-700 px-2 py-0.5 text-neutral-100"
                                    >
                                        Buy: 4 SP
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-10 flex w-full flex-col max-md:max-w-full">
                            <div
                                class="gap-2.5 self-start whitespace-nowrap rounded bg-slate-800 px-2 text-base font-bold text-green-400"
                            >
                                syntaxio
                            </div>
                            <div
                                class="mt-5 flex w-full flex-wrap items-center gap-9 text-sm text-white max-md:max-w-full"
                            >
                                <div
                                    class="my-auto w-[157px] shrink grow self-stretch overflow-hidden rounded-lg border border-solid border-slate-500 p-3"
                                >
                                    Delete one random line of your opponent’s code
                                </div>
                                <div
                                    class="my-auto w-[157px] shrink grow self-stretch overflow-hidden rounded-lg border border-solid border-slate-500 p-3"
                                >
                                    Upgrade to 2 lines of code deleted
                                </div>
                                <div
                                    class="my-auto w-[157px] shrink grow self-stretch overflow-hidden rounded-lg border border-solid border-slate-500 p-3"
                                >
                                    Upgrade to 3 lines of code deleted
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="self-start overflow-hidden rounded-xl bg-white px-4 py-2.5 text-base font-medium text-black max-md:pr-5"
        >
            Weebao attacked with deletio 💀
        </div>
    </div>
</div>
