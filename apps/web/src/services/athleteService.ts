'use server';

import { getTokenFromCookie } from '@/actions/auth-actions';
import { Athlete } from '@/types/User';

const STRAPI = process.env.STRAPI_INTERNAL_URL;

export async function fetchCoachAthletesServer(): Promise<Athlete[]> {
  const token = await getTokenFromCookie();
  if (!token) return [];

  const res = await fetch(`${STRAPI}/api/coach/athletes`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Strapi /coach/athletes: ${res.status} ${res.statusText}`);
  }
  const payload = await res.json();
  return payload.data as Athlete[];
}