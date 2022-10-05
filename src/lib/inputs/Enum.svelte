<script lang="ts">
	export let name = '';
	export let value = '';
	export let options: string[] = [];
	export let labels: string[] = [];
</script>

<div class="w-full h-full">
	<label class="h-6" for={name}>{name}</label>
	<select id={name} class="text-input w-full h-11 transition-colors duration-300" bind:value>
		{#each options as option, index}
			<option value={option}>{labels[index]}</option>
		{/each}
	</select>
	<div class="h-6" />
</div>
