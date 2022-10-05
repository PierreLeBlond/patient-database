<script lang="ts">
	import SearchBar from '$lib/inputs/SearchBar.svelte';
	import Modal from '$lib/modals/Modal.svelte';
	import DeletePatient from '$lib/modals/DeletePatient.svelte';
	import { validate } from '$lib/Patient/schema';
	import type { Patient } from '$lib/Patient/Patient';
	import AddPatient from '$lib/modals/AddPatient.svelte';
	import Navigating from '$lib/navigation/Navigating.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const update = async () => {
		const response = await fetch(`/patients.json`);
		data = await response.json();
	};

	let searchValue: string = '';
	$: lowerCaseSearchValue = searchValue.toLowerCase();

	$: patients = searchValue
		? data.patients.filter(
				({ patient }: { patient: Patient }) =>
					patient.firstname.toLowerCase().includes(lowerCaseSearchValue) ||
					patient.lastname.toLowerCase().includes(lowerCaseSearchValue)
		  )
		: data.patients;
	$: total = data.patients.length;
	$: filtered = patients.length;

	let deleteDemandFirstName = '';
	let deleteDemandId = '';
	let deleteModalDisplayed = false;
	const handleDeleteDemand = (firstName: string, id: string) => {
		deleteDemandFirstName = firstName;
		deleteDemandId = id;
		deleteModalDisplayed = true;
	};

	const handleDeleteConfirmation = () => {
		fetch(`patient/${deleteDemandId}.json`, { method: 'DELETE' })
			.then(update)
			.then(() => {
				deleteModalDisplayed = false;
			});
	};

	let addModalDisplayed = false;
	const handleAddPatientEvent = ({ detail }: { detail: Patient }) => {
		validate(detail);
		fetch('/patient.json', {
			method: 'POST',
			body: JSON.stringify({
				patient: detail
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		}).then(update);
	};
</script>

<Navigating />
<Modal bind:displayed={deleteModalDisplayed}>
	<DeletePatient validName={deleteDemandFirstName} on:submit={handleDeleteConfirmation} />
</Modal>
<Modal bind:displayed={addModalDisplayed}>
	<AddPatient on:submit={handleAddPatientEvent} />
</Modal>
<div class="relative w-full h-full flex flex-col space-y-8 px-4 sm:px-24 py-8">
	<SearchBar bind:searchValue />
	<button
		class="w-64 h-11 flex-shrink-0 text-gray-300 bg-gray-800 rounded transition-colors duration-300"
		on:click={() => {
			addModalDisplayed = true;
		}}
	>
		Ajouter une fiche
	</button>
	<div>{filtered} patient(s) trouvés sur {total}</div>
	<ul class="w-full flex flex-col space-y-2 overflow-y-auto snap-y">
		{#each patients as { id, patient }}
			<li class="snap-start">
				<a
					data-sveltekit-prefetch
					href="/patient/{id}"
					class="w-full h-11 flex items-center justify-between bg-gray-800 text-gray-300 rounded border border-gray-800"
				>
					<div
						class="w-11 h-full flex items-center justify-center border rounded-l border-gray-300"
					>
						<h2>{patient.file}</h2>
					</div>
					<div>{patient.firstname} {patient.lastname}</div>
					<div
						class="flex justify-center items-center w-11 h-full place-self-end bg-red-500 rounded-r"
						on:click|preventDefault={() => handleDeleteDemand(patient.firstname, id)}
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
