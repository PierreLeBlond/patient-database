import { redirect } from '@sveltejs/kit';
import dotenv from 'dotenv';

dotenv.config();

interface RequestOptions {
  method: string;
  body?: string;
  headers: { [key: string]: string }
}

async function send({ method, path, data, token }: { method: string, path: string, data?: any, token?: string }) {

  const options: RequestOptions = { method, headers: {} };

  if (undefined !== data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  if (undefined !== token) {
    options.headers['authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${process.env.PUBLIC_API_BASE_URL}${path}`, options);
  const body = await response.json();

  if (!response.ok) {
    if (body.status == 401 || body.status == 403) {
      throw redirect(302, '/logout');
    } else {
      throw new Error(body.message);
    }
  }

  return body;
}

export function get(path: string, token?: string) {
  return send({ method: 'GET', path, token });
}

export function post(path: string, data: any, token?: string) {
  return send({ method: 'POST', path, data, token });
}

export function del(path: string, token?: string) {
  return send({ method: 'DELETE', path, token });
}