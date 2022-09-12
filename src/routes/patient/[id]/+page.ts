import type { PageLoad } from './$types';

export async function load({ params, fetch }: PageLoad) {
	const { id } = params;
	const response = await fetch(`https://app.pierrelespingal.com/patient-database-back/patient/${id}`);
	const data = await response.json();
	return data;
}
