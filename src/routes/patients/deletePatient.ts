import { PUBLIC_SERVER_BASE_URL } from '$env/static/public';

export default async function deletePatient(id: string) {
  await fetch(`${PUBLIC_SERVER_BASE_URL}/patient/${id}`, {
    method: 'DELETE'
  });
}