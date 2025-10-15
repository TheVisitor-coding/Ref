'use server'

import { getTokenFromCookie } from "@/actions/auth-actions";

type UpdateLastPreDashboardViewResult =
  | { success: true }
  | { success: false; errorMessage: string };

export async function updateLastPreDashboardViewAction(userId: number): Promise<UpdateLastPreDashboardViewResult> {
  const authCookie = await getTokenFromCookie();
  if (!authCookie) {
    return {
      success: false,
      errorMessage: "Authentification requise pour enregistrer la vue du pré-dashboard."
    };
  }

  try {
    const response = await fetch(`${process.env.STRAPI_INTERNAL_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authCookie}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        lastPredashboardSeenAt: new Date().toISOString()
      }),
      cache: "no-store"
    });

    if (!response.ok) {
      let details = response.statusText;
      try {
        const payload = await response.json();
        if (typeof payload?.error?.message === "string") {
          details = payload.error.message;
        } else if (typeof payload?.message === "string") {
          details = payload.message;
        }
      } catch {
      }

      return {
        success: false,
        errorMessage: `Impossible de mettre à jour lastPredashboardSeenAt : ${details}`
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      errorMessage: error instanceof Error ? error.message : "Erreur inconnue lors de la mise à jour."
    };
  }
}