<script lang="ts">
    import type { PageData } from "./$types";
    import { Editor, EditorData } from "$components/macro/editor";
    import { Game } from "$components/macro/game";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    let { name } = $state(data);
    const editorData = new EditorData();

    const setInitialCode = () => {
        console.log("set code")
        editorData.setCode(`class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        s1_len = len(s1)
        s2_len = len(s2)
        if (s1_len > s2_len):
            return False
        s1_freq = [0] * 26
        window_freq = [0] * 26
        ord_a = ord('a')
        for i in range(s1_len):
            idx1 = ord(s1[i]) - ord_a
            idx2 = ord(s2[i]) - ord_a
            
            s1_freq[idx1] += 1
            window_freq[idx2] += 1
        print(s1_freq, window_freq)
        for i in range(s2_len - s1_len):
            if s1_freq == window_freq:
                return True
            window_freq[ord(s2[i]) - ord_a] -= 1
            window_freq[ord(s2[i + s1_len]) - ord_a] += 1
        return s1_freq == window_freq`);
    }

    const submitCode = () => {
        console.log(editorData.getCode());
    }
</script>

<div class="h-navscreen w-full">
    <!-- <button
        onclick={setInitialCode}
    >Ehehehehe</button>
    <button
        onclick={submitCode}
    >Huhuhuhuhuh</button>
    <Editor data={editorData} /> -->
    <Game
        userInfo={undefined}
        opponentInfo={undefined}
        challengeInfo={undefined}
        executionResults={undefined}
        isExecuting={undefined}
        winner={null}
        submitCode={submitCode}
    />
</div>

<style>
</style>
