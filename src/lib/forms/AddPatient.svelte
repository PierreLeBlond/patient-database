<script lang="ts">
	import Text from '$lib/inputs/Text.svelte';
	import { createEventDispatcher } from 'svelte';

	const eventDispatcher = createEventDispatcher();

	let firstName: string = '';
	let lastName: string = '';

	let validFirstName = false;
	let validLastName = false;

	export let blocked: boolean;

	$: valid = validFirstName && validLastName;
	$: disabled = blocked || !valid;

	const handleClick = (event: any) => {
		eventDispatcher('submit', {
			firstName,
			lastName
		});
	};
</script>

<div
	class="w-96 h-96 flex items-center justify-center space-y-4 flex-col bg-violet-200 rounded border-2 border-violet-400"
>
	<Text name="first name" bind:value={firstName} bind:valid={validFirstName} placeholder="Lucas" />
	<Text name="last name" bind:value={lastName} bind:valid={validLastName} placeholder="Taract" />
	<div class="pt-8">
		<button
			{disabled}
			class="w-64 h-11  text-violet-800 disabled:text-gray-300 bg-gray-200 rounded border border-violet-600 disabled:border-gray-300 transition-colors duration-300"
			on:click={handleClick}>Add patient</button
		>
	</div>
</div>
