<script lang="ts">
	import Text from '$lib/inputs/Text.svelte';
	import { createEventDispatcher } from 'svelte';

	const eventDispatcher = createEventDispatcher();

	export let validName: string;

	let name: string = '';

	$: valid = name == validName;

	$: disabled = !valid;

	const handleClick = (event: any) => {
		eventDispatcher('submit');
	};
</script>

<div
	class="w-full h-full flex items-center justify-center space-y-4 flex-col bg-gray-300 rounded border-2 border-gray-800"
>
	<span class="w-64 text-center"
		>Rentrez <code>{validName}</code> avant de supprimer la fiche patient</span
	>
	<div class="w-64">
		<Text name="" bind:value={name} placeholder="" />
	</div>
	<div class="pt-8">
		<button
			{disabled}
			class="w-64 h-11 text-gray-300 bg-gray-800 disabled:bg-gray-200 rounded disabled:border disabled:border-gray-300 transition-colors duration-300"
			on:click={handleClick}>Confirmer la suppression</button
		>
	</div>
</div>
