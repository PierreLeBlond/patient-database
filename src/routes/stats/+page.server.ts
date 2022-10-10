import { get } from "$lib/api/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const [
    total, child, man, woman, aftercare, other_ex, cataract, tear_treatment, glasses
  ] = await Promise.all([
    get(`/stats`, locals.user),
    get(`/stats?gender=child`, locals.user),
    get(`/stats?gender=man`, locals.user),
    get(`/stats?gender=woman`, locals.user),
    get(`/stats?aftercare=true`, locals.user),
    get(`/stats/other_ex`, locals.user),
    get(`/stats/cataract`, locals.user),
    get(`/stats/tear_treatment`, locals.user),
    get(`/stats/glasses`, locals.user),
  ]);

  return {
    total: total.data, child: child.data, man: man.data, woman: woman.data, aftercare: aftercare.data,
    other_ex: other_ex.data,
    cataract: cataract.data,
    tear_treatment: tear_treatment.data,
    glasses: glasses.data
  };
}