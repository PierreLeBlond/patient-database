<script lang="ts">
	import type { Act } from '$lib/Act/Act';
	import { schema } from '$lib/Act/schema';
	import Day from '$lib/inputs/Day.svelte';
	import TextArea from '$lib/inputs/TextArea.svelte';
	import { feedback } from '$lib/stores/feedback';
	import { formatDate } from '$lib/utils/formatDate';
	import rfdc from 'rfdc';

	const clone = rfdc();

	export let patientId: string;
	export let acts: Act[];

	let actsMap = new Map<number, Act>();
	let selectedAct: Act;
	export const update = (updatedActs: Act[]) => {
		acts = updatedActs;
		actsMap = acts.reduce((accu: Map<number, Act>, act: Act) => {
			accu.set(act.id, clone(act));
			return accu;
		}, new Map<number, Act>());
		selectedAct = acts?.[0];
	};
	update(acts);

	export let changed = false;
	const keys = Object.keys(schema.properties);
	const compare = (source: any, target: any) => keys.some((key) => source[key] != target[key]);
	$: if (selectedAct) {
		changed = acts.some((act) => compare(act, actsMap.get(act.id)));
	}

	const add = () => {
		const act = {
			date: formatDate(new Date(), 'yyyy-mm-dd'),
			comment: ''
		};
		fetch(`/patient/${patientId}/act.json`, {
			method: 'POST',
			body: JSON.stringify(act),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then((res) => res.json())
			.then(({ data }) => {
				const { act } = data;
				actsMap.set(act.id, clone(act));
				selectedAct = act;
				acts.push(act);
				$feedback = 'Acte de suivi créé !';
			});
	};

	export const save = async () => {
		await Promise.all(
			acts
				.filter((act) => compare(act, actsMap.get(act.id)))
				.map(async (act) => {
					const { date, comment } = act;
					await fetch(`/patient/${act.patient_id}/act/${act.id}.json`, {
						method: 'POST',
						body: JSON.stringify({ date, comment }),
						headers: {
							'Content-type': 'application/json; charset=UTF-8'
						}
					});
					actsMap.set(act.id, clone(act));
				})
		);
		changed = false;
	};

	const remove = (act: Act) => {
		// select the next tab if it exists, else select the previous one
		const index = acts.indexOf(act);
		const selectedIndex = index < acts.length - 1 ? index : index - 1;
		fetch(`/patient/${act.patient_id}/act/${act.id}.json`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		}).then(() => {
			acts.splice(index, 1);
			actsMap.delete(act.id);
			$feedback = 'Acte de suivi supprimé !';
			selectedAct = acts?.[selectedIndex];
		});
	};
</script>

<p class="w-full h-6 block">Actes de suivi</p>
<div class="flex no-wrap overflow-x-auto">
	{#if selectedAct}
		{#each acts as act}
			<div
				class:selected={selectedAct.id == act.id}
				class="w-32 h-11 flex items-center justify-center cursor-pointer border-t border-l border-r rounded-t border-gray-800"
				on:click={() => (selectedAct = act)}
			>
				<p>{act.date}</p>
			</div>
		{/each}
	{/if}
	<button class="w-32 h-11 text-gray-300 bg-gray-800 rounded border border-gray-300" on:click={add}>
		Ajouter un acte
	</button>
</div>
{#if selectedAct}
	<div
		class="w-full grid grid-cols-2 sm:grid-cols-6 gap-x-4 p-4 overflow-y-auto border rounded-r rounded-bl border-gray-800"
	>
		<div class="w-full col-span-2">
			<Day bind:value={selectedAct.date} name="Date" />
		</div>
		<div class="w-full col-span-2 sm:col-span-6">
			<TextArea bind:value={selectedAct.comment} name="Description" />
		</div>
		<div
			class="w-full h-11 flex justify-center items-center cursor-pointer bg-red-500 text-gray-200 rounded"
			on:click={() => remove(selectedAct)}
		>
			Supprimer
		</div>
	</div>
{/if}

<style>
	.selected {
		@apply text-gray-300 bg-gray-800;
	}
</style>
