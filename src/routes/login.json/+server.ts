import { json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from './$types';
import { post } from "$lib/api/api";

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
  const data = await request.json();
  const body = await post(`/login`, data);

  const accessToken = body.data.accessToken;
  const value = Buffer.from(accessToken).toString('base64');

  return json(body, {
    status: 201, headers: {
      'set-cookie': `jwt=${value}; Path=/; HttpOnly`
    }
  });
}