<script lang="ts">
	import Text from '$lib/inputs/Text.svelte';
	import type { Patient } from '$lib/Patient/Patient';
	import { getPatient } from './getPatient';
	import updatePatient from './updatePatient';

	export let data: Patient;

	let patient = { id: data.id, data: { ...data.data } };

	let validFirstName = false;
	let validLastName = false;
	$: valid = validFirstName && validLastName;

	$: firstNameChanged = patient.data.firstName != data.data.firstName;
	$: lastNameChanged = patient.data.lastName != data.data.lastName;

	let blocked = false;
	$: disabled = !valid || blocked || !(firstNameChanged || lastNameChanged);

	const handleClick = () => {
		blocked = true;
		updatePatient(patient)
			.then(() => getPatient(patient.id))
			.then((response) => {
				data = response;
				blocked = false;
			});
	};
</script>

<div class="w-full h-full flex flex-col space-y-8 px-4 sm:px-24 pt-8 sm:pt-24">
	<div class="w-64 h-11 flex items-center">
		<a href="../patients" class="w-11 h-11 flex items-center justify-center text-violet-600">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				viewBox="0 0 16 16"
			>
				<path
					fill-rule="evenodd"
					d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
				/>
			</svg>
		</a>
	</div>
	<div class="flex flex-col sm:flex-row sm:space-x-4">
		<Text bind:value={patient.data.firstName} bind:valid={validFirstName} name="first name" />
		<Text bind:value={patient.data.lastName} bind:valid={validLastName} name="last name" />
	</div>
	<button
		{disabled}
		class="w-64 h-11 text-violet-800 disabled:text-gray-300 bg-gray-200 rounded border border-violet-600 disabled:border-gray-300 transition-colors duration-300"
		on:click={handleClick}
	>
		Save changes
	</button>
</div>
