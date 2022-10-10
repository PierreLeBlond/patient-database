<script lang="ts">
	import { jsonToXlsx } from '$lib/io/exportToXlsx';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data);

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

<div class="p-4 space-y-4">
	<button
		{disabled}
		class="w-32 sm:w-64 h-11 text-gray-300 bg-gray-800 disabled:bg-gray-200 rounded border border-gray-300 transition-colors duration-300"
		on:click|preventDefault={exportToXlsx}
	>
		Export to .xlsx
	</button>

	<div
		class="sm:w-[32rem] p-4 grid grid-flow-col sm:grid-flow-row grid-rows-5 sm:grid-rows-none sm:grid-cols-5 border rounded border-gray-800"
	>
		<div class="flex items-center sm:justify-center">
			<p class="font-bold">Total</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p class="font-bold">Femme</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p class="font-bold">Enfants</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p class="font-bold">Homme</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p class="font-bold text-red-700">À suivre</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p>{data.total.count}</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p>{data.woman.count}</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p>{data.child.count}</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p>{data.man.count}</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p>{data.aftercare.count}</p>
		</div>
	</div>

	<div
		class="sm:w-[42rem] p-4 grid grid-flow-col sm:grid-flow-row grid-rows-4 sm:grid-rows-none sm:grid-cols-4 border rounded border-gray-800"
	>
		<div class="flex items-center sm:justify-center">
			<p class="font-bold">Autres examens</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p class="font-bold">Cataracte</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p class="font-bold">Traitements larmes</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p class="font-bold">Lunettes</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p>{data.other_ex[0].total}</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p>{data.cataract[0].total}</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p>{data.tear_treatment[0].total}</p>
		</div>
		<div class="flex items-center sm:justify-center">
			<p>{data.glasses[0].total}</p>
		</div>
	</div>
</div>
