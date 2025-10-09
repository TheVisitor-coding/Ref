'use server';

import type { User } from "@/types/User";

/**
 * Fetch user information from the API.
 * @param jwtToken The JWT token for authentication.
 * @returns The user information or null if not found.
 */
export const getUserInfo = async (jwtToken: string): Promise<User | null> => {
  try {
    const response = await fetch(`${process.env.STRAPI_INTERNAL_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`);
    }
    
    const user = await response.json();
    return user as User;
  } catch (error) {
    throw new Error("Failed to fetch user info", { cause: error });
  }
};