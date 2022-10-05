import { redirect, type Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');

  event.locals.user = jwt;

  if (!jwt) {
    redirect(302, '/login');
  }

  return resolve(event);
}