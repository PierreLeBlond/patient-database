<script lang="ts">
	import { onMount } from 'svelte';
	import Toast from './toast.svelte';
	import { feedback } from '$lib/stores/feedback';

	const removeToast = () => {
		$feedback = '';
	};

	let display = false;
	onMount(() => {
		display = true;
	});
</script>

{#if display && $feedback != ''}
	<Toast on:toasted={removeToast} message={$feedback} />
{/if}
