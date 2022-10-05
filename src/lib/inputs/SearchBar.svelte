<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const eventDispatcher = createEventDispatcher();

	export let searchValue: string = '';

	const clear = () => {
		searchValue = '';
		eventDispatcher('input');
	};
</script>

<div class="h-11 flex items-center justify-center flex-shrink-0">
	<div class="w-96 h-full relative">
		<input
			type="search"
			placeholder="Rechercher par nom ou prénom..."
			class="w-full h-full focus:ring-gray-600 rounded-full border border-gray-600 focus:border-gray-600"
			bind:value={searchValue}
			on:input={() => eventDispatcher('input')}
		/>
		<svg
			class="h-11 absolute top-0 right-4"
			role="presentation"
			viewBox="0 0 32 32"
			width="24"
			height="24"
			fill="none"
			stroke="currentcolor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="3"
		>
			<g id="glass" class="text-gray-600">
				<circle cx="14" cy="14" r="12" />
				<path d="M23 23 L30 30" />
			</g>
			<g id="cross" class="hover:cursor-pointer text-violet-600" on:click={clear}>
				<path d="M4 4 L28 28" />
				<path d="M28 4 L4 28" />
			</g>
		</svg>
	</div>
</div>

<style>
	input + svg #glass {
		visibility: hidden;
	}

	input + svg #cross {
		pointer-events: bounding-box;
		visibility: visible;
	}

	input:placeholder-shown + svg #glass {
		visibility: visible;
	}

	input:placeholder-shown + svg #cross {
		visibility: hidden;
	}

	input::-webkit-search-cancel-button {
		-webkit-appearance: none;
	}
</style>
