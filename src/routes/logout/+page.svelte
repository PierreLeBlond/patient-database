<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(async () => {
		await fetch('/logout.json', {
			method: 'POST'
		});

		await invalidateAll();
		goto('/login');
	});
</script>

<div class="w-screen h-screen flex items-center justify-center bg-violet-200">Logging out...</div>
