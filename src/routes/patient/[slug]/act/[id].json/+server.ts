import { json } from "@sveltejs/kit";
import { del, get, post } from "$lib/api/api";
import type { RequestEvent, RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request, locals }: RequestEvent) => {
  const { slug, id } = params;
  const data = await request.json();
  const body = await post(`/patients/${slug}/acts/${id}`, data, locals.user);
  return json(body, { status: 201 });
}

export const DELETE: RequestHandler = async ({ params, locals }: RequestEvent) => {
  const { slug, id } = params;
  const body = await del(`/patients/${slug}/acts/${id}`, locals.user);
  return json(body, { status: 201 });
}