<script lang="ts">
	import AddPatient from '$lib/forms/AddPatient.svelte';
	import { fly } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import getPatients from './getPatients';
	import type { Patient, PatientData } from '$lib/Patient/Patient';
	import deletePatient from './deletePatient';
	import addPatient from './addPatient';
	import SearchBar from '$lib/inputs/SearchBar.svelte';

	export let data: Patient[];
	let patients: Patient[] = Object.values(data);

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
	// updatePatients();

	let blocked = false;
	const handleAddPatientEvent = (event: { detail: PatientData }) => {
		blocked = true;
		addPatient(event.detail).then(() => {
			updatePatients();
			blocked = false;
		});
	};
</script>

<div
	class="w-full h-full flex flex-col space-y-8 px-4 sm:px-24 pt-8 sm:pt-24"
	style="filter: blur({$blur}px)"
>
	<div class="w-64 h-11 flex items-center">
		<a href="/" class="w-11 h-11 flex items-center justify-center text-violet-600">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				viewBox="0 0 16 16"
			>
				<path
					fill-rule="evenodd"
					d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
				/>
				<path
					fill-rule="evenodd"
					d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
				/>
			</svg>
		</a>
	</div>
	<SearchBar bind:searchValue on:input={updatePatients} />
	<button
		class="w-64 h-11 text-violet-800 bg-gray-200 rounded border border-violet-600 transition-colors duration-300"
		on:mousedown={displayAddPatient}>New patient</button
	>
	<ul class="w-full flex flex-col space-y-8">
		{#each patients as patient}
			<li>
				<a
					data-sveltekit-prefetch
					href="../patient/{patient.id}"
					class="w-full h-11 flex items-center justify-between pl-4 text-gray-800 bg-gray-200 rounded border border-violet-600"
				>
					<div>{patient.data.firstName} {patient.data.lastName}</div>
					<div
						class="flex justify-center items-center w-11 h-full place-self-end bg-red-500"
						on:click|preventDefault={() => deletePatient(patient.id).then(updatePatients)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							class="text-red-900"
							viewBox="0 0 16 16"
						>
							<path
								d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
							/>
							<path
								fill-rule="evenodd"
								d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
							/>
						</svg>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>

{#if display}
	<div class="w-full h-full absolute" on:mousedown={hideAddPatient} />
{/if}

{#if display}
	<div class="w-full sm:w-96 h-96 absolute px-4 sm:px-0" transition:fly={{ y: 200, duration: 300 }}>
		<AddPatient {blocked} on:submit={handleAddPatientEvent} />
	</div>
{/if}
