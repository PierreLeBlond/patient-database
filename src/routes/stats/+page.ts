import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async ({ data }) => {
  return {
    ...data,
    title: 'Statistiques'
  };
}