<script lang="ts">
	export let name = '';
	export let value = '';
</script>

<div class="w-full h-full relative flex-col pb-6">
	<label class="w-full h-6 block" for={name}>{name}</label>
	<input
		type="date"
		id={name}
		class="text-input w-full h-11 transition-colors duration-300"
		pattern="\d{4}-\d{2}-\d{2}"
		bind:value
	/>
</div>
