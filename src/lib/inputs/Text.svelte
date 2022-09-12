<script lang="ts">
	import { fade } from 'svelte/transition';

	export let name = '';
	export let value = '';
	export let placeholder = 'Type text here';

	export let valid = false;

	let input: HTMLInputElement;
	let valueMissing = false;
	let patternMismatch = false;

	$: if (value != undefined && input) {
		const { validity } = input;

		valid = validity.valid;
		valueMissing = validity.valueMissing;
		patternMismatch = validity.patternMismatch;
	}
</script>

<div class="w-64">
	<label class="h-8" for={name}>{name}</label>
	<input
		type="text"
		required
		pattern="[A-Za-z -]+"
		{name}
		class="text-input w-full h-11 transition-colors duration-300"
		{placeholder}
		bind:value
		bind:this={input}
	/>
	<div class="w-full h-6 flex items-end text-red-500 text-xs">
		{#if valueMissing}
			<span transition:fade={{ duration: 300 }}>
				{name} is required
			</span>
		{:else if patternMismatch}
			<span transition:fade={{ duration: 300 }}> letters, spaces and hyphen only </span>
		{/if}
	</div>
</div>
