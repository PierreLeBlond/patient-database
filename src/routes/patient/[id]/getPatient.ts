import { PUBLIC_SERVER_BASE_URL } from '$env/static/public';
import type { Patient } from '$lib/Patient/Patient';

export async function getPatient(id: string): Promise<Patient> {
  const response = await fetch(`${PUBLIC_SERVER_BASE_URL}/patient/${id}`);
  const data = await response.json();
  return { id, data };
}