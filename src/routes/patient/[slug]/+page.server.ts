import type { PageServerLoad } from "./$types";
import { get } from "$lib/api/api";

export const load: PageServerLoad = async ({ params, locals }) => {
	const { slug } = params;
	const body = await get(`/patients/${slug}`, locals.user);
	const { data } = body;
	return data;
}
