<script lang="ts">
	import { fade } from 'svelte/transition';

	export let name = '';
	export let value = '';
	export let placeholder = '';
	export let autocomplete = 'on';

	export let pattern = '.*';
	export let required = false;

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

<div class="w-full h-full relative flex-col">
	<label class="w-full h-6 block" for={name}>{name}</label>
	<input
		type="email"
		{required}
		{pattern}
		id={name}
		class="text-input w-full h-11 transition-colors duration-300"
		{placeholder}
		{autocomplete}
		bind:value
		bind:this={input}
	/>
	<div class="w-full h-6 flex items-center text-red-500 text-xs">
		{#if !valid}
			<span transition:fade={{ duration: 300 }}>
				{#if valueMissing}
					obligatoire
				{:else if patternMismatch}
					adresse mail non valide
				{/if}
			</span>
		{/if}
	</div>
</div>
