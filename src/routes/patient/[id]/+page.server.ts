import type { PageServerLoad } from "./$types";
import { PUBLIC_SERVER_BASE_URL } from '$env/static/public';

export async function load({ params }: PageServerLoad) {
	const { id } = params;
	const response = await fetch(`${PUBLIC_SERVER_BASE_URL}/patient/${id}`);
	const data = await response.json();
	return { id, data };
}
