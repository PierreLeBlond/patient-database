import { json } from "@sveltejs/kit";
import { post } from "$lib/api/api";
import type { RequestEvent, RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }: RequestEvent) => {
  const data = await request.json();
  const body = await post(`/patients`, data, locals.user);
  return json(body, { status: 201 });
}