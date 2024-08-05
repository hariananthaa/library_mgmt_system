"use server";

import axios from "axios";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { isTokenValid } from "./auth_actions";
import { MEMBERS_ROUTE } from "../constant";
import { ApiResponse } from "./definitions";
import { buildErrorResponse } from "./utils";

// Schema for validating member data
const MemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.string(),
  password: z.string(),
});

// Schema for adding a new member, omitting the 'id' field
const AddMember = MemberSchema.omit({ id: true });

/**
 * Adds a new member to the system.
 *
 * This function validates the token, constructs a request with the provided member details,
 * and sends a POST request to add a new member. If successful, it revalidates the members route.
 *
 * @param values - An object containing member details such as name, email, phone, role, and password.
 * @returns A promise that resolves to an ApiResponse object indicating the result of the operation.
 */
export async function addMember(values: any) {
  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  const addMemberRequest = AddMember.parse({
    name: values.name,
    email: values.email,
    role: values.role,
    phone: values.phone,
    password: values.password,
  });

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/member`,
      addMemberRequest,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    revalidatePath(MEMBERS_ROUTE);
    return response.data as ApiResponse;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}

/**
 * Retrieves details of a member by their ID.
 *
 * This function validates the token and sends a GET request to fetch member details based on the provided ID.
 *
 * @param id - The ID of the member to retrieve.
 * @returns A promise that resolves to an ApiResponse object containing member details.
 */
export async function getMemberById(id: string) {
  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/member/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data as ApiResponse;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}

/**
 * Updates details of an existing member.
 *
 * This function validates the token, constructs a request with the updated member details,
 * and sends a PUT request to update the member. If successful, it revalidates the members route.
 *
 * @param id - The ID of the member to update.
 * @param values - An object containing the updated member details.
 * @returns A promise that resolves to an ApiResponse object indicating the result of the operation.
 */
export async function updateMember(id: string, values: any) {
  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  const updateMemberRequest = AddMember.parse({
    name: values.name,
    email: values.email,
    role: values.role,
    phone: values.phone,
    password: values.password,
  });

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/member/${id}`,
      updateMemberRequest,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    const res = response.data as ApiResponse;
    revalidatePath(MEMBERS_ROUTE);
    return res;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}

/**
 * Deletes a member by their ID.
 *
 * This function validates the token and sends a DELETE request to remove a member based on the provided ID.
 * If successful, it waits for a short period before revalidating the members route.
 *
 * @param id - The ID of the member to delete.
 * @returns A promise that resolves to an ApiResponse object indicating the result of the operation.
 */
export async function deleteMember(id: number) {
  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/member/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = response.data as ApiResponse;
    if (res.result) {
      revalidatePath(MEMBERS_ROUTE);
    }
    return res;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}

/**
 * Fetches a list of all members with pagination and search functionality.
 *
 * This function validates the token and sends a GET request to retrieve members based on the provided query,
 * page, size, and optionally other filters.
 *
 * @param query - Search query for filtering members.
 * @param page - Page number for pagination.
 * @param size - Number of members per page.
 * @returns A promise that resolves to an ApiResponse object containing the list of members.
 */
export async function fetchAllMembers(
  query: string,
  page: number,
  size: number
) {
  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  noStore();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/member?query=${query}&page=${page}&size=${size}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    return response.data as ApiResponse;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}
