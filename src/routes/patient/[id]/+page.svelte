<script lang="ts">
	import type { PageData } from '.svelte-kit/types/src/routes/patient/[id]/$types';

	export let data: PageData;
</script>

<h2>{data.firstName}</h2>
<h2>{data.lastName}</h2>
