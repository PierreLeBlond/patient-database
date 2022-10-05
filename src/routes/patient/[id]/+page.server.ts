import type { PageServerLoad } from "./$types";
import { get } from "$lib/api/api";

export const load: PageServerLoad = async ({ params, locals }) => {
	const { id } = params;
	const body = await get(`/patients/${id}`, locals.user);
	const { data } = body;
	return data;
}
