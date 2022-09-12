import type { PatientData } from "$lib/Patient/Patient";

export default async function addPatient(patient: PatientData) {
  const { firstName, lastName } = patient;
  await fetch('https://app.pierrelespingal.com/patient-database-back/patients', {
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