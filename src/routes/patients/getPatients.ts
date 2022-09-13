import type { Patient } from "$lib/Patient/Patient";
import { PUBLIC_SERVER_BASE_URL } from '$env/static/public';

export default async function getPatients(searchValue: string): Promise<Patient[]> {
  const response = await fetch(`${PUBLIC_SERVER_BASE_URL}/patients?search=${searchValue}`);
  const json = await response.json();
  return json;
}