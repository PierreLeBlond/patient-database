import { get } from '$lib/api/api';
import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }: RequestEvent) => {
  const { data } = await get(`/patients`, locals.user);
  return json(data);
}