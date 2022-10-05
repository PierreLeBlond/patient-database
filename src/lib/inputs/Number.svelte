<script lang="ts">
	import { fade } from 'svelte/transition';

	export let name = '';
	export let value = 0;
	export let placeholder = 'Enter number here';

	export let required = false;

	export let valid = false;

	let input: HTMLInputElement;
	let valueMissing = false;

	$: if (value != undefined && input) {
		const { validity } = input;

		valid = validity.valid;
		valueMissing = validity.valueMissing;
	}
</script>

<div class="w-full">
	<label class="h-8" for={name}>{name}</label>
	<input
		type="number"
		{required}
		id={name}
		class="text-input w-full h-11 transition-colors duration-300"
		{placeholder}
		bind:value
		bind:this={input}
	/>
	<div class="w-full h-6 flex items-end text-red-500 text-xs">
		{#if valueMissing}
			<span transition:fade={{ duration: 300 }}> required </span>
		{/if}
	</div>
</div>
