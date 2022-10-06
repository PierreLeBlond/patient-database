<script lang="ts">
	import '../app.css';
	import Nav from '$lib/navigation/Nav.svelte';
	import Toaster from '$lib/toaster/toaster.svelte';
</script>

<Toaster />

<div
	class="w-screen h-screen relative flex flex-col bg-gray-100 text-gray-800 items-center justify-start"
>
	<div class="w-full h-16 relative flex-shrink-0">
		<Nav />
	</div>
	<div class="w-full h-full relative flex flex-col overflow-hidden">
		<slot />
	</div>
</div>
