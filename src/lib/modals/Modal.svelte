<script lang="ts">
	import { clickOutside } from './clickOutside';

	export let displayed = false;
</script>

<div
	class="w-screen h-screen top-0 left-0 mt-0 fixed {displayed
		? 'flex'
		: 'hidden'} items-center justify-center z-40 bg-gray-800 opacity-60"
/>
<div
	class="w-screen h-screen top-0 left-0 mt-0 fixed {displayed
		? 'flex'
		: 'hidden'} items-center justify-center z-50"
>
	<div
		class="w-full sm:w-96 h-96 px-4 sm:px-0"
		use:clickOutside
		on:outclick={() => {
			displayed = false;
		}}
	>
		<slot />
	</div>
</div>
