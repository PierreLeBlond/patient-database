import { PUBLIC_SERVER_BASE_URL } from '$env/static/public';

console.log({ PUBLIC_SERVER_BASE_URL });

export async function load() {
  const response = await fetch(`${PUBLIC_SERVER_BASE_URL}/patients`);
  const json = await response.json();
  return json;
}