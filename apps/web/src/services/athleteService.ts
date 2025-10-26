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

export async function fetchCoachAthleteById(athleteId: number): Promise<Athlete | null> {
  const token = await getTokenFromCookie();
  if (!token) return null;

  const meRes = await fetch(`${STRAPI}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!meRes.ok) {
    throw new Error(`Strapi /users/me: ${meRes.status} ${meRes.statusText}`);
  }

  const me = await meRes.json();
  const coachId = me.id as number;

  const params = new URLSearchParams({
    'filters[id][$eq]': String(athleteId),
    'filters[athlete_relations][coach][id][$eq]': String(coachId),
    populate: 'avatar',
  });

  const res = await fetch(`${STRAPI}/api/users?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Strapi /users: ${res.status} ${res.statusText}`);
  }

  const payload = await res.json();
  console.log(payload, 'payload athlete by id');
  const athlete = (payload?.[0] ?? null) as Athlete | null;
  return athlete;
}
