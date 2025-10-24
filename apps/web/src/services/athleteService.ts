'use server'

import { getTokenFromCookie } from "@/actions/auth-actions";
import { Athlete } from "@/types/User";
import { unstable_cache } from "next/cache";

async function fetchCoachAthletes(token: string): Promise<Athlete[]> {
  const response = await fetch(`${process.env.STRAPI_INTERNAL_URL}/api/coach/athletes`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 60 },
  });
  if (!response.ok) throw new Error(`Failed to load athletes: ${response.status} ${response.statusText}`);
  const payload = await response.json();
  console.log("Fetched athletes payload:", payload.data);
  return payload.data;
}

const cachedFetchCoachAthletes = unstable_cache(
  async (token: string) => fetchCoachAthletes(token),
  ["coach-athletes"],
  { revalidate: 60 }
);

export async function getAthletes(): Promise<Athlete[]> {
  const token = await getTokenFromCookie();
  if (!token) return [];
  return cachedFetchCoachAthletes(token);
}