import { get } from "$lib/api/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const { data } = await get(`/patients`, locals.user);
  return data;
}