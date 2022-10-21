
import { json } from "@sveltejs/kit";
import { del, get, post } from "$lib/api/api";
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }: RequestEvent) => {
  const { slug } = params;
  const body = await get(`/patients/${slug}`, locals.user);
  return json(body, { status: 200 });
}

export const POST: RequestHandler = async ({ params, request, locals }: RequestEvent) => {
  const { slug } = params;
  const data = await request.json();
  const body = await post(`/patients/${slug}`, data, locals.user);
  return json(body, { status: 201 });
}

export const DELETE: RequestHandler = async ({ params, locals }: RequestEvent) => {
  const { slug } = params;
  const body = await del(`/patients/${slug}`, locals.user);
  return json(body, { status: 201 });
}