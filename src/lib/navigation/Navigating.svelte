<script lang="ts">
	import { navigating } from '$app/stores';
</script>

{#if $navigating}
	<div class="w-full h-full absolute z-30 flex items-center justify-center bg-gray-100">
		<p>Chargement de la page...</p>
	</div>
{/if}
