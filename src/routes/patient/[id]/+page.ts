import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data }) => {
	return {
		...data,
		title: `${data.patient.firstname} ${data.patient.lastname}`
	};
}
