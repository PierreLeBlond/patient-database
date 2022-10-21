<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { afterUpdate } from 'svelte';

	const dispatch = createEventDispatcher();

	export let message = '';

	let timeoutId: any;
	afterUpdate(() => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			dispatch('toasted');
		}, 3000);
	});
</script>

<div
	class="w-60 sm:w-64 h-10 fixed flex items-center justify-center z-50 top-3 left-1/2 -translate-x-1/2 bg-gray-800 border-2 rounded border-gray-200"
	transition:fly={{ y: -100 }}
>
	<div class="text-gray-300 text-xs sm:text-lg">{message}</div>
</div>
