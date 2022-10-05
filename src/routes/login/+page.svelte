<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Password from '$lib/inputs/Password.svelte';
	import Text from '$lib/inputs/Text.svelte';
	import { fade } from 'svelte/transition';

	let username: string = '';
	let password: string = '';

	let errors: string = '';

	let validUsername = false;
	let validPassword = false;

	let blocked: boolean;

	$: valid = validUsername && validPassword;
	$: disabled = blocked || !valid;

	const handleClick = async (event: any) => {
		blocked = true;

		errors = '';

		const response = await fetch('/login.json', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});

		if (!response.ok) {
			const body = await response.json();
			console.log(body);
			errors = body.status = 400 ? "Nom d'utilisateur ou mot de passe incorrect" : body.message;
			blocked = false;
			password = '';
			return;
		}

		invalidateAll();
	};
</script>

<div class="w-full h-full flex items-center justify-center bg-gray-200">
	<form class="flex items-center justify-center space-y-4 flex-col">
		<fieldset>
			<Text
				name="nom d'utilisateur"
				bind:value={username}
				bind:valid={validUsername}
				required={true}
				placeholder=""
				autocomplete="username"
				pattern=".*"
			/>
			<Password
				name="mot de passe"
				bind:value={password}
				bind:valid={validPassword}
				placeholder=""
			/>
		</fieldset>
		<div class="w-64">
			<button
				{disabled}
				class="w-full h-11 text-gray-300 bg-gray-800 disabled:bg-gray-200 rounded disabled:border disabled:border-gray-300 transition-colors duration-300"
				on:click|preventDefault={handleClick}
			>
				Se connecter
			</button>
			<div class="w-full h-6 flex items-end text-red-500 text-xs">
				{#if errors}
					<span transition:fade={{ duration: 300 }}> {errors} </span>
				{/if}
			</div>
		</div>
	</form>
</div>
