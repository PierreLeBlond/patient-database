<script lang="ts">
	export let name = '';
	export let value = '';
</script>

<div class="w-full h-full relative flex-col">
	<label class="w-full h-6 block" for={name}>{name}</label>
	<textarea
		rows="5"
		cols="60"
		type="text"
		id={name}
		class="text-input w-full h-32 transition-colors duration-300"
		bind:value
	/>
</div>
