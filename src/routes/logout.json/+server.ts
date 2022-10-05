import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
  return json({
    success: true
  }, {
    headers: {
      'set-cookie': 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  })
}