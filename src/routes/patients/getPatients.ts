import type { Patient } from "$lib/Patient/Patient";

export default async function getPatients(searchValue: string): Promise<Patient[]> {
  const response = await fetch(`https://app.pierrelespingal.com/patient-database-back/patients?search=${searchValue}`);
  const json = await response.json();
  return Object.values(json);
}