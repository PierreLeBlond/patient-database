<script lang="ts">
	import Day from '$lib/inputs/Day.svelte';
	import Text from '$lib/inputs/Text.svelte';
	import { createEventDispatcher } from 'svelte';
	import { validate } from '$lib/Patient/schema';
	import Number from '$lib/inputs/Number.svelte';
	import { formatDate } from '$lib/utils/formatDate';

	const eventDispatcher = createEventDispatcher();

	let patient = {
		date: formatDate(new Date(), 'yyyy-mm-dd'),
		file: 1,
		firstname: '',
		lastname: ''
	};
	$: valid = validate(patient);

	$: disabled = !valid;

	const handleClick = (event: any) => {
		eventDispatcher('submit', patient);
		patient.file++;
		patient.firstname = '';
		patient.lastname = '';
	};
</script>

<form
	class="w-full h-full grid grid-cols-2 bg-gray-300 gap-x-4 p-4 rounded border-2 border-gray-800"
>
	<fieldset class="col-span-1">
		<Day bind:value={patient.date} name="Date d'examen" />
	</fieldset>
	<fieldset class="col-span-1">
		<Number bind:value={patient.file} name="Numéro de fiche" required={true} />
	</fieldset>
	<fieldset class="col-span-2">
		<Text name="Prénom" bind:value={patient.firstname} placeholder="" />
	</fieldset>
	<fieldset class="col-span-2">
		<Text name="Nom" bind:value={patient.lastname} placeholder="" />
	</fieldset>
	<button
		{disabled}
		class="h-11 col-span-2 text-gray-300 bg-gray-800 disabled:bg-gray-200 rounded disabled:border disabled:border-gray-300 transition-colors duration-300"
		on:click|preventDefault={handleClick}>Ajouter</button
	>
</form>
