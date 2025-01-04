<script lang="ts">
    import { scale } from 'svelte/transition'
    import { backOut } from 'svelte/easing'
    import { onClickOutside } from "runed";
    import {Button} from '$components/ui/button'
    import {Card} from '$components/ui/card'
    import {Input} from '$components/ui/input'
    import { MessageSquare, Send, X } from 'lucide-svelte'
    import type { ChatMessage } from '$models/room';
    import { tick } from 'svelte';

    interface Props {
        username?: string,
        history: ChatMessage[],
        onSend: (message: string) => void
    }

    let { username, history, onSend}: Props = $props();

    let isOpen = $state<boolean>(false);
    let inputValue = $state<string>('');
    let alertNewMessage = $state<boolean>(false);

    let chatMenu = $state<HTMLDivElement | null>(null);
    let chatContainer = $state<HTMLDivElement | null>(null);
    let inputElm = $state<HTMLDivElement | null>(null);

    let currentHistoryLength = $state<number>(history.length);
        
    $effect(() => {
        if (!username && history.length > 0) {
            username = history[0].sender;
        }
    })

    $effect(() => {
        if (!chatContainer) return;

        if (history) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
            });
        }
    })

    $effect(() => {
        if (history.length > currentHistoryLength) {
            if (!isOpen) {
                alertNewMessage = true;
            }
            currentHistoryLength = history.length
        }
    })

    $effect(() => {
        if (isOpen && inputElm) {
            inputElm.focus();
        }
    })

    const handleSend = (event: Event) => {
        event.preventDefault();
        if (inputValue.trim()) {
            onSend(inputValue.trim())
            inputValue = ''
        }
    }

    const handleOpenChat = () => {
        isOpen = true
        alertNewMessage = false
        
    }



    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    onClickOutside(
        () => chatMenu,
        () => isOpen = false,
    )
</script>

<div bind:this={chatMenu} class="fixed bottom-4 right-4 z-50">
    {#if isOpen}
    <div class="origin-bottom-right" transition:scale={{duration: 300, easing: backOut}}>
        <Card class="relative w-80 h-96 flex flex-col overflow-y-hidden">
            <div class="flex justify-between items-center px-3 py-2 bg-background text-foreground border-b border-b-neutral">
                <h3 class="font-semibold">Chat</h3>
                <X class="h-4 w-4 text-foreground cursor-pointer"  onclick={() => (isOpen = false)}/>
            </div>
            <div bind:this={chatContainer} class="flex flex-col h-full overflow-y-auto bg-background-dark px-4 pt-2 pb-4">
                <div class="flex-1"></div>
                <div
                    
                    class="grid grid-rows-[1fr_auto] auto-rows-min w-full  space-y-2 "
                >
                    {#each history as text}
                        <div
                            class="flex items-center gap-2 group {text.sender === username ? 'flex-row-reverse origin-bottom-right' : 'origin-bottom-left'}"
                            transition:scale={{duration: 300, easing: backOut}}
                       
                        >
                        <div
                        class="peer max-w-48 px-4 py-2 rounded-lg break-words whitespace-pre-wrap
                        {text.sender === username ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}"
                        >
                        {text.message}
                    </div>
                    <span class="opacity-0 peer-hover:opacity-100 transition-all duration-150 text-sm text-secondary">{formatTime(text.timestamp)}</span>
                        </div>
                    {/each}
                </div>

            </div>
            
            <div class="p-3 bg-background border-t">
                <form
                    onsubmit={handleSend}
                    class="flex items-center gap-2"
                >
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        bind:value={inputValue}
                        bind:ref={inputElm}
                        containerClass="w-full"
                    />
                    <Button type="submit" size="icon" class="h-full aspect-square">
                        <Send class="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </Card>

    </div>
    {:else}
        <div class="absolute bottom-0 right-0" transition:scale={{duration: 300, easing: backOut}}>

            <div class="relative" >
                <Button
                    variant="default"
                    size="icon"
                    class="rounded-full h-12 w-12 focus:scale-90 transition-all duration-150"
                    onclick={handleOpenChat}
                >
                    <MessageSquare class="h-6 w-6" />
                </Button>
                {#if alertNewMessage}
                    <div class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center origin-center" transition:scale={{duration: 300, easing: backOut}}>
                        <span class="text-white text-xs font-bold">!</span>
                    </div>
                {/if}
            </div>
        </div>
    {/if}
</div>