<script lang="ts">
	import AddPatient from '$lib/forms/AddPatient.svelte';
	import { fly } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import getPatients from './getPatients';
	import type { Patient, PatientData } from '$lib/Patient/Patient';
	import deletePatient from './deletePatient';
	import addPatient from './addPatient';

	let patients: Patient[] = [];

	// Search patient
	let searchValue: string = '';

	// Add patient
	let display = false;
	let blur = tweened(0, { duration: 300 });
	const displayAddPatient = () => {
		display = true;
		blur.set(4);
	};
	const hideAddPatient = () => {
		display = false;
		blur.set(0);
	};

	// Update patients list
	const updatePatients = () => {
		getPatients(searchValue).then((searchResults) => {
			patients = searchResults;
		});
	};
	updatePatients();

	let blocked = false;
	const handleAddPatientEvent = (event: { detail: PatientData }) => {
		blocked = true;
		addPatient(event.detail).then(() => {
			updatePatients();
			blocked = false;
		});
	};
</script>

<div class="w-full h-full flex flex-col space-y-8 px-24 pt-24" style="filter: blur({$blur}px)">
	<input
		type="search"
		placeholder="Search..."
		class="focus:ring-violet-600 rounded border border-violet-600 focus:border-violet-600"
		bind:value={searchValue}
		on:input={updatePatients}
	/>
	<button
		class="w-64 h-11  text-violet-800 bg-gray-200 rounded border border-violet-600 transition-colors duration-300"
		on:mousedown={displayAddPatient}>New patient</button
	>
	<ul class="w-full flex flex-col space-y-8">
		{#each patients as patient}
			<li>
				<a
					href="../patient/{patient.id}"
					class="w-full h-11 flex items-center justify-between pl-4 text-gray-800 bg-gray-200 rounded border border-gray-600"
				>
					<div>{patient.data.firstName} {patient.data.lastName}</div>
					<div
						class="w-11 h-full place-self-end bg-red-500"
						on:click|preventDefault={() => deletePatient(patient.id).then(updatePatients)}
					/>
				</a>
			</li>
		{/each}
	</ul>
</div>

{#if display}
	<div class="w-full h-full absolute" on:mousedown={hideAddPatient} />
{/if}

{#if display}
	<div class="absolute" transition:fly={{ y: 200, duration: 300 }}>
		<AddPatient {blocked} on:submit={handleAddPatientEvent} />
	</div>
{/if}
