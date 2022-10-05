
import { json } from "@sveltejs/kit";
import { del, get, post } from "$lib/api/api";
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }: RequestEvent) => {
  const { id } = params;
  const body = await get(`/patients/${id}`, locals.user);
  return json(body, { status: 200 });
}

export const POST: RequestHandler = async ({ params, request, locals }: RequestEvent) => {
  const { id } = params;
  const data = await request.json();
  const body = await post(`/patients/${id}`, data, locals.user);
  return json(body, { status: 201 });
}

export const DELETE: RequestHandler = async ({ params, locals }: RequestEvent) => {
  const { id } = params;
  const body = await del(`/patients/${id}`, locals.user);
  return json(body, { status: 201 });
}