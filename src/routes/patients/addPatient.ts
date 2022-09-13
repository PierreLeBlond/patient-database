import type { PatientData } from "$lib/Patient/Patient";
import { PUBLIC_SERVER_BASE_URL } from '$env/static/public';

export default async function addPatient(patient: PatientData) {
  const { firstName, lastName } = patient;
  await fetch(`${PUBLIC_SERVER_BASE_URL}/patients`, {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      lastName
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });
}