export default async function deletePatient(id: string) {
  await fetch(`https://app.pierrelespingal.com/patient-database-back/patient/${id}`, {
    method: 'DELETE'
  });
}