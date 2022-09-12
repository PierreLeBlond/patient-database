export default async function deletePatient(id: string) {
  await fetch(`https://app.pierrelespingal.com/patient-database/patient/${id}`, {
    method: 'DELETE'
  });
}