<script lang="ts">
	import { jsonToXlsx } from '$lib/io/exportToXlsx';

	let blocked = false;
	$: disabled = blocked;

	// const importFromXlsx = async () => {};

	const exportToXlsx = async () => {
		blocked = true;
		const response = await fetch(`/patients.json`);
		const data = await response.json();
		const { patients } = data;
		await jsonToXlsx(patients);
		blocked = false;
	};
</script>

<!-- <div class="p-4">
	<button
		{disabled}
		class="w-32 sm:w-64 h-11 text-gray-300 bg-gray-800 disabled:bg-gray-200 rounded border border-gray-300 transition-colors duration-300"
		on:click|preventDefault={importFromXlsx}
	>
		Import from .xlsx
	</button>
</div> -->

<div class="p-4">
	<button
		{disabled}
		class="w-32 sm:w-64 h-11 text-gray-300 bg-gray-800 disabled:bg-gray-200 rounded border border-gray-300 transition-colors duration-300"
		on:click|preventDefault={exportToXlsx}
	>
		Export to .xlsx
	</button>
</div>
