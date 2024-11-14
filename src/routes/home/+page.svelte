<script lang="ts">
  import type { PageData } from "./$types";

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  let { name } = $state(data);
</script>

<div class="w-full h-full">

</div>

<style>
</style>