import type { Patient } from "$lib/Patient/Patient";
import { PUBLIC_SERVER_BASE_URL } from '$env/static/public';

export default async function updatePatient(patient: Patient) {
  await fetch(`${PUBLIC_SERVER_BASE_URL}/patient/${patient.id}`, {
    method: 'POST',
    body: JSON.stringify(patient.data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })

}