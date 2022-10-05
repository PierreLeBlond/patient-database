<script lang="ts">
	import { navigating } from '$app/stores';
	import { load } from './load';
</script>

{#if $navigating}
	<div in:load={{}} class="w-full h-1 z-30 bg-orange-600" />
{/if}
