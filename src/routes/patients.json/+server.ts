import { get } from '$lib/api/api';
import { json } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }: RequestEvent) => {
  const search = url.searchParams.get('search');
  const { data } = await get(search ? `/patients?search=${search}` : `/patients`, locals.user);
  return json(data);
}