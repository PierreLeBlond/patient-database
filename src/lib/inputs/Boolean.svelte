<script lang="ts">
	export let name = '';
	export let value = false;
</script>

<div class="w-full flex justify-between items-center">
	<div class="h-8 flex items-center">
		<label for={name}>{name}</label>
	</div>
	<input
		type="checkbox"
		id={name}
		class="rounded border-gray-800 checked:bg-gray-800"
		bind:checked={value}
	/>
</div>
