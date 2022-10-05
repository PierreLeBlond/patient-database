<script lang="ts">
	import Text from '$lib/inputs/Text.svelte';
	import type { PageData } from './$types';
	import { schema, validate } from '$lib/Patient/schema';
	import Number from '$lib/inputs/Number.svelte';
	import Boolean from '$lib/inputs/Boolean.svelte';
	import Enum from '$lib/inputs/Enum.svelte';
	import TextArea from '$lib/inputs/TextArea.svelte';
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import Modal from '$lib/modals/Modal.svelte';

	export let data: PageData;

	let patient = { ...data.patient };
	afterNavigate(() => {
		patient = { ...data.patient };
	});

	const keys = Object.keys(schema.properties);

	$: valid = validate(patient);

	const compare = (source: any, target: any) => keys.some((key) => source[key] != target[key]);
	$: changed = compare(patient, data.patient);

	let blocked = false;
	$: disabled = !valid || blocked || !changed;

	const handleClick = () => {
		blocked = true;
		fetch(`/patient/${data.id}.json`, {
			method: 'POST',
			body: JSON.stringify(patient),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		}).then(() => {
			data.patient = { ...patient };
			blocked = false;
		});
	};

	let unsavedChangesDisplayed = false;
	let navigateTo = '';
	const handleCancelNavigation = () => {
		unsavedChangesDisplayed = false;
	};
	const handleContinueNavigation = () => {
		unsavedChangesDisplayed = false;
		changed = false;
		goto(navigateTo);
	};
	beforeNavigate(async ({ to, cancel }) => {
		if (changed && to != null) {
			cancel();
			navigateTo = to.url.toString();
			unsavedChangesDisplayed = true;
		}
	});
</script>

<Modal bind:displayed={unsavedChangesDisplayed}>
	<div
		class="w-full h-full flex items-center justify-center space-y-4 flex-col bg-gray-300 rounded border-2 border-gray-800"
	>
		<span class="w-64 text-center"
			>Vous n'avez pas sauvegardé vos modifications, êtes vous sur de vouloir continuer ?</span
		>
		<button class="w-64 h-11 text-gray-300 bg-gray-800 rounded" on:click={handleCancelNavigation}
			>Annuler</button
		>
		<button
			class="w-64 h-11 text-gray-300 bg-gray-800 rounded border border-red-600"
			on:click={handleContinueNavigation}>Continuer sans sauvegarder</button
		>
	</div>
</Modal>

<div class="w-full grid grid-cols-2 sm:grid-cols-6 gap-x-4 p-4 overflow-y-auto">
	<div class="w-full col-span-2">
		<Text bind:value={patient.date} name="Date d'examen" />
	</div>
	<div class="w-full col-span-2">
		<Number bind:value={patient.file} name="Numéro de fiche" />
	</div>
	<div class="w-full col-span-2 flex justify-center">
		<Boolean bind:value={patient.aftercare} name="A suivre" />
	</div>
	<div class="w-full col-span-2">
		<Text bind:value={patient.firstname} name="Prénom" />
	</div>
	<div class="w-full col-span-2">
		<Text bind:value={patient.lastname} name="Nom" />
	</div>
	<div class="w-full col-span-2">
		<Enum
			bind:value={patient.gender}
			name="Genre"
			options={['child', 'man', 'woman']}
			labels={['Enfant', 'Homme', 'Femme']}
		/>
	</div>
	<div class="w-full col-span-2">
		<Number bind:value={patient.year} name="Année de naissance" />
	</div>
	<div class="w-full col-span-2">
		<Number bind:value={patient.age} name="Age" />
	</div>
	<div class="w-full col-span-2">
		<Text bind:value={patient.phone} name="Numéro de téléphone" />
	</div>
	<div class="w-full col-span-2">
		<Number bind:value={patient.other_ex} name="Autres examens" />
	</div>
	<div class="w-full col-span-2">
		<Number bind:value={patient.cataract} name="Cataracte" />
	</div>
	<div class="w-full col-span-2">
		<Number bind:value={patient.tear_treatment} name="Traitement larmes" />
	</div>
	<div class="w-full col-span-2">
		<Number bind:value={patient.glasses} name="Lunettes" />
	</div>
	<div class="w-full col-span-2 flex justify-center">
		<Boolean bind:value={patient.glasses_holder} name="Porte lunettes" />
	</div>
	<div class="w-full col-span-2 flex justify-center">
		<Boolean bind:value={patient.glasses_donation} name="Don lunettes" />
	</div>
	<div class="w-full col-span-1">
		<Text bind:value={patient.avod_sc} name="AVOD sc" />
	</div>
	<div class="w-full col-span-1">
		<Text bind:value={patient.avog_sc} name="AVOG sc" />
	</div>
	<div class="w-full col-span-1">
		<Text bind:value={patient.avod_ac} name="AVOD ac" />
	</div>
	<div class="w-full col-span-1">
		<Text bind:value={patient.avog_ac} name="AVOG ac" />
	</div>
	<div class="w-full col-span-1">
		<Text bind:value={patient.avodg_ac} name="AVODG ac" />
	</div>
	<div class="w-full col-span-2 sm:col-span-3">
		<Text bind:value={patient.ar} name="AR" />
	</div>
	<div class="w-full col-span-2 sm:col-span-3">
		<Text bind:value={patient.laf} name="LAF" />
	</div>
	<div class="w-full col-span-2 sm:col-span-3">
		<Text bind:value={patient.prescription} name="Ordonnance" />
	</div>
	<div class="w-full col-span-2 sm:col-span-3">
		<Text bind:value={patient.treatment} name="Traitement" />
	</div>
	<div class="w-full col-span-2 sm:col-span-6">
		<TextArea bind:value={patient.comment} name="Commentaires" />
	</div>
</div>

<div
	class="w-full h-16 place-self-end flex flex-shrink-0 items-center justify-center z-40 bg-gray-800"
>
	{#if data.previousId}
		<a
			href="../patient/{data.previousId}"
			class="w-16 h-16 aspect-square flex items-center justify-center justify-self-start text-gray-300 cursor-pointer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				viewBox="0 0 16 16"
			>
				<path
					fill-rule="evenodd"
					d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
				/>
			</svg>
		</a>
	{:else}
		<div class="w-16 h-16" />
	{/if}

	<div class="flex justify-center grow">
		<button
			{disabled}
			class="w-32 sm:w-64 h-11 text-gray-300 bg-gray-800 disabled:bg-gray-200 rounded border border-gray-300 transition-colors duration-300"
			on:click|preventDefault={handleClick}
		>
			Save changes
		</button>
	</div>

	{#if data.nextId}
		<a
			href="../patient/{data.nextId}"
			class="w-16 h-16 aspect-square flex items-center justify-center justify-self-end text-gray-300 cursor-pointer"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				viewBox="0 0 16 16"
			>
				<path
					fill-rule="evenodd"
					d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
				/>
			</svg>
		</a>
	{:else}
		<div class="w-16 h-16" />
	{/if}
</div>
