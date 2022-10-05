import { error, json } from "@sveltejs/kit";
import { PUBLIC_API_BASE_URL } from '$env/static/public';
import type { RequestEvent, RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
  const payload = await request.json();
  const response = await fetch(`${PUBLIC_API_BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  });

  const body = await response.json();

  if (!response.ok) {
    throw error(body.status, body.message);
  }

  const accessToken = body.data.accessToken;
  const value = Buffer.from(accessToken).toString('base64');

  return json(body, {
    status: 201, headers: {
      'set-cookie': `jwt=${value}; Path=/; HttpOnly`
    }
  });
}