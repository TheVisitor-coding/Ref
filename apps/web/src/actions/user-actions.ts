'use server'
import { getTokenFromCookie } from "@/services/authService";

/**
 * Update the last pre-dashboard view timestamp for a user.
 * @param userId The ID of the user to update.
 * @returns True if the update was successful, false otherwise.
 */
const updateLastPreDashboardView = async (userId: number): Promise<boolean> => {
'use server'
  try {
   const authCookie = await getTokenFromCookie();
   if (!authCookie) {
     throw new Error("No auth token found in cookies");
   }
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
      throw new Error(`Failed to update lastPredashboardSeenAt: ${response.statusText}`);
    }
    
    return true;
  }
  catch (error) {
    throw new Error("Failed to update lastPredashboardSeenAt", { cause: error });
  }
}

export {
    updateLastPreDashboardView
}