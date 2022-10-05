<script lang="ts">
	import { fade } from 'svelte/transition';

	export let name = '';
	export let value = '';
	export let placeholder = 'Type text here';

	export let valid = false;

	let visible = false;

	let input: HTMLInputElement;
	let valueMissing = false;
	let patternMismatch = false;
	let tooShort = false;

	$: if (value != undefined && input) {
		const { validity } = input;

		valid = validity.valid;
		valueMissing = validity.valueMissing;
		patternMismatch = validity.patternMismatch;
		tooShort = validity.tooShort;
	}

	let pattern = '[A-Za-z0-9#?!@$ %^&*-]+';
</script>

<div class="w-64">
	<label class="h-8" for={name}>{name}</label>
	<div class="w-full h-11 relative">
		{#if visible}
			<input
				type="text"
				autocomplete="current-password"
				required
				id={name}
				class="text-input w-full h-11 transition-colors duration-300"
				{placeholder}
				bind:value
				bind:this={input}
			/>
		{:else}
			<input
				type="password"
				autocomplete="current-password"
				required
				id={name}
				class="text-input w-full h-11 transition-colors duration-300"
				{placeholder}
				bind:value
				bind:this={input}
			/>
		{/if}
		<div
			class="w-11 h-full absolute flex items-center justify-center top-0 right-0 bg-transparent cursor-pointer"
			on:click={() => (visible = !visible)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				class="absolute"
				viewBox="0 0 16 16"
			>
				{#if visible}
					<path
						d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
					/>
					<path
						d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
					/>
					<path
						d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
					/>
				{:else}
					<path
						d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
					/>
					<path
						d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
					/>
				{/if}
			</svg>
		</div>
	</div>
	<div class="w-full h-6 flex items-center text-red-500 text-xs">
		{#if !valid}
			<span transition:fade={{ duration: 300 }}>
				{#if valueMissing}
					obligatoire
				{/if}
			</span>
		{/if}
	</div>
</div>
