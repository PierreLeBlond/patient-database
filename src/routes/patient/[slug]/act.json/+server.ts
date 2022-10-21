import { json } from "@sveltejs/kit";
import { post } from "$lib/api/api";
import type { RequestEvent, RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request, locals }: RequestEvent) => {
  const { slug } = params;
  const data = await request.json();
  const body = await post(`/patients/${slug}/acts`, data, locals.user);
  return json(body, { status: 201 });
}