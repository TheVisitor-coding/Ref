'use server';

import { getTokenFromCookie } from '@/actions/auth-actions';
import { addLogAction } from '@/actions/log-actions';
import { AthleteUpdatePayload } from '@/schema/AthleteSchema';
import { Athlete, AthleteWithRelation, CoachAthleteRelation } from '@/types/User';
import { diffChanges, pick } from '@/utils/diffChanges';
import { getMeId } from './userService';

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

export async function fetchCoachAthleteById(athleteId: number): Promise<AthleteWithRelation | null> {
  const token = await getTokenFromCookie();
  if (!token) return null;

  const coachId = await getMeId(token);

  const params = new URLSearchParams();
  params.set('filters[id][$eq]', String(athleteId));
  params.set('filters[athlete_relations][coach][id][$eq]', String(coachId));
  params.set('populate[avatar][fields][0]', 'url');
  params.set('populate[athlete_relations][fields][0]', 'id');
  params.set('populate[athlete_relations][fields][1]', 'documentId');
  params.set('populate[athlete_relations][fields][2]', 'notes');
  params.set('populate[athlete_relations][fields][3]', 'status_relation');
  params.set('populate[athlete_relations][populate][coach][fields][0]', 'id');

  const resUser = await fetch(`${STRAPI}/api/users?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!resUser.ok) {
    throw new Error(`Strapi /users: ${resUser.status} ${resUser.statusText}`);
  }

  const payload = await resUser.json();
  const athlete = (payload?.[0] ?? null) as AthleteWithRelation | null;
  if (!athlete) return null;

  type RelationFromApi = CoachAthleteRelation & { coach?: { id: number } };
  type RelationPayload = RelationFromApi | RelationFromApi[] | { data?: RelationFromApi[] } | null | undefined;

  const normalizeRelations = (value: RelationPayload): RelationFromApi[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'object' && value !== null && 'data' in value) {
      return Array.isArray(value.data) ? value.data : [];
    }
    return [value];
  };

  const rawRelations: RelationPayload = (athlete as { athlete_relations?: RelationPayload }).athlete_relations;
  const rel = normalizeRelations(rawRelations).find(r => r?.coach?.id === coachId);

  const athleteWithRelation: AthleteWithRelation = {
    ...(athlete as Athlete),
    athlete_relations: rel
      ? {
        id: rel.id,
        documentId: rel.documentId,
        notes: rel.notes ?? null,
        status_relation: rel.status_relation,
      }
      : undefined,
  };

  return athleteWithRelation;
}

export async function updateAthleteById(athleteId: number, input: AthleteUpdatePayload): Promise<Athlete> {
  const token = await getTokenFromCookie();
  if (!token) throw new Error('Unauthenticated');

  const userId = await getMeId(token);

  const current = await fetchCoachAthleteById(athleteId);
  if (!current || !current.athlete_relations) {
    throw new Error('Not authorized');
  }

  const relationDocumentId = current.athlete_relations.documentId;
  const beforeValues = current as AthleteWithRelation

  if (typeof input.relation_notes !== 'undefined') {
    const resRel = await fetch(`${STRAPI}/api/coach-athletes/${relationDocumentId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { notes: input.relation_notes } }),
      cache: 'no-store',
    });
    if (!resRel.ok) {
      const err = await resRel.json();
      throw new Error(err?.error?.message || `Strapi relation update failed: ${resRel.status}`);
    }
  }

  const payload: Partial<Athlete> = {
    first_name: input.first_name,
    last_name: input.last_name,
    email: input.email,
    phone: input.phone || null,
    height: input.height,
    weight: input.weight,
    birth_date: input.birth_date || null,
    tag: input.tag || undefined,
    level: input.level || undefined,
    discipline: input.discipline || undefined,
    mainObjective: input.mainObjective || null,
    secondaryObjective: input.secondaryObjective || null,
  };

  const res = await fetch(`${STRAPI}/api/users/${athleteId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error?.message || `Strapi update failed: ${res.status}`);
  }

  const freshAthlete = await fetchCoachAthleteById(athleteId);
  if (!freshAthlete) {
    throw new Error('Failed to fetch updated athlete');
  }

  console.log('logging data', { userId, athleteId, beforeValues, freshAthlete });
  try {
    const userKeys: ReadonlyArray<keyof Athlete> = [
      'first_name', 'last_name', 'email', 'phone',
      'height', 'weight', 'birth_date', 'tag',
      'level', 'discipline', 'mainObjective', 'secondaryObjective',
    ];

    const beforeSubset = pick(beforeValues, userKeys);
    const afterSubset = pick(freshAthlete, userKeys);

    const { old_values: oldUserVals, new_values: newUserVals } =
      diffChanges(beforeSubset, afterSubset, userKeys);

    if (Object.keys(newUserVals).length > 0) {
      addLogAction({
        userId,
        affectedUserId: athleteId,
        tableName: 'users',
        recordId: String(athleteId),
        action: 'update',
        old_values: oldUserVals,
        new_values: newUserVals,
        authCookie: token,
      });
    }

    const afterRelationNotes = freshAthlete.athlete_relations?.notes ?? null;
    if (beforeValues.athlete_relations?.notes !== afterRelationNotes) {
      addLogAction({
        userId,
        affectedUserId: athleteId,
        tableName: 'coach_athletes',
        recordId: String(freshAthlete.athlete_relations?.id ?? ''),
        action: 'update',
        old_values: { notes: beforeValues.athlete_relations?.notes ?? null },
        new_values: { notes: afterRelationNotes },
        authCookie: token,
      });
    }

  } catch (e) {
    console.error('Failed to log athlete update action', e);
  }

  return freshAthlete;
}
