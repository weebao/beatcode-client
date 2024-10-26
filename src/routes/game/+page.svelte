<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
	import * as monaco from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

  import * as Avatar from '$components/ui/avatar';
  import {Button} from '$components/ui/button';

  import { Play, Send } from 'lucide-svelte';

	let editorElement: HTMLDivElement;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let model: monaco.editor.ITextModel;

  function loadCode(code: string) {
    model = monaco.editor.createModel(code, 'python');

    editor.setModel(model);
  }

  onMount(async () => {
    self.MonacoEnvironment = {
      getWorker: function () {
        return new editorWorker();
      }
    };

    editor = monaco.editor.create(editorElement, {
      automaticLayout: true,
      theme: 'vs-dark',
      language: 'python'
    });
  });

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose());
    editor?.dispose();
  });
</script>

<svelte:head>BeatCode - Game</svelte:head>

<div class="min-h-screen flex flex-col overflow-hidden bg-gray-800 px-2.5 pb-2.5 pt-5">
  <div class="flex items-center justify-between p-4 bg-gray-800 text-white">
    <Avatar.Root>
      <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar.Root>
    <div class="flex space-x-2">
      <Button variant="secondary" size="sm">
        <Play class="w-4 h-4 mr-2" />
        Run
      </Button>
      <Button variant="secondary" size="sm">
        <Send class="w-4 h-4 mr-2" />
        Submit
      </Button>
    </div>
    <Avatar.Root>
      <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
      <Avatar.Fallback>AS</Avatar.Fallback>
    </Avatar.Root>
  </div>

  <div class="flex flex-1 overflow-hidden">
    <div class="w-1/2 p-4 overflow-y-auto bg-background">
      <h2 class="text-2xl font-bold mb-4">Binary Search</h2>
      <p class="mb-4">
        Implement a binary search algorithm to find the position of a target value within a sorted array.
      </p>
      <h3 class="text-xl font-semibold mb-2">Example:</h3>
      <pre class="bg-secondary p-2 rounded">
        Input: nums = [-1,0,3,5,9,12], target = 9
        Output: 4
        Explanation: 9 exists in nums and its index is 4
      </pre>
    </div>

    <div class="w-1/2 flex flex-col">
      <div class="flex-1">
        <div class="w-full h-full" bind:this={editorElement} />
      </div>

      <div class="h-1/3 p-4 bg-secondary overflow-y-auto">
        <h3 class="text-lg font-semibold mb-2">Test Cases</h3>
        <ul class="space-y-2">
          <li>
            <Button variant="outline" size="sm" class="w-full justify-start">
              Test Case 1: [-1,0,3,5,9,12], target = 9
            </Button>
          </li>
          <li>
            <Button variant="outline" size="sm" class="w-full justify-start">
              Test Case 2: [-1,0,3,5,9,12], target = 2
            </Button>
          </li>
          <li>
            <Button variant="outline" size="sm" class="w-full justify-start">
              Test Case 3: [1,2,3,4,5,6], target = 6
            </Button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
