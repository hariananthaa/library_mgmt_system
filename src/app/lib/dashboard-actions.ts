"use server";

import { cookies } from "next/headers";
import { extractClaims, isTokenValid } from "./auth-actions";
import { redirect } from "next/navigation";
import axios from "axios";

import { unstable_noStore as noStore } from "next/cache";
import { ApiResponse, Role } from "./definitions";
import { buildErrorResponse } from "./utils";

/**
 * Fetches dashboard counts based on the user's role.
 *
 * The function determines the appropriate endpoint to query based on whether the user is an admin or a member.
 * - Admins get counts from the `/api/v1/dashboard/admin/count` endpoint.
 * - Members get counts from the `/api/v1/dashboard/member/count` endpoint, with their `memberId` included in the query parameters.
 *
 * @returns A promise that resolves to an ApiResponse object containing the dashboard counts.
 */
export async function fetchDashboardCounts() {
  const jwtToken = cookies().get("auth")?.value;
  const claims = await extractClaims(jwtToken);

  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  noStore();

  const url =
    claims.role === Role.ADMIN
      ? `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/dashboard/admin/count`
      : `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/dashboard/member/count?memberId=${claims.id}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data as ApiResponse;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}
