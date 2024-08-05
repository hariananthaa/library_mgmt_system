"use server";

import axios from "axios";
import jwt from "jsonwebtoken";
import { INVALID_TOKEN, LOGIN_ROUTE } from "../constant";
import { cookies } from "next/headers";
import { ApiResponse, UserCredential } from "./definitions";
import { buildErrorResponse } from "./utils";
import { redirect } from "next/navigation";

/**
 * Extracts and decodes JWT claims from the provided token.
 *
 * @param token - The JWT token to extract claims from.
 * @returns The decoded claims as an object, or null if the token is invalid or not found.
 */
export const extractClaims = (token: string | undefined): any | null => {
  if (token == null || token == undefined) {
    console.error("Server Error:", "Token not found!");
    return null;
  }

  const decoded = jwt.decode(token);

  if (decoded == null) {
    console.error("Server Error:", INVALID_TOKEN);
    return null;
  } else {
    // Convert the decoded claims to a JSON object
    const claims = JSON.parse(JSON.stringify(decoded));
    return claims;
  }
};

/**
 * Extracts and decodes JWT claims from the provided token.
 *
 * @returns The decoded claims as an object, or null if the token is invalid or not found.
 */
export const extractClaimsWithoutToken = (): any | null => {
  const token = cookies().get("auth")?.value;
  if (token == null || token == undefined) {
    console.error("Server Error:", "Token not found!");
    return null;
  }

  const decoded = jwt.decode(token);

  if (decoded == null) {
    console.error("Server Error:", INVALID_TOKEN);
    return null;
  } else {
    // Convert the decoded claims to a JSON object
    const claims = JSON.parse(JSON.stringify(decoded));
    return claims;
  }
};

export const removeCookie = () => {
  cookies().delete("auth");
};

/**
 * Checks if the current JWT token is valid based on its expiration time.
 *
 * @returns A promise that resolves to a boolean indicating whether the token is valid or not.
 */
export const isTokenValid = async (): Promise<boolean> => {
  const token = cookies().get("auth")?.value;
  const claims = await extractClaims(token);

  if (claims != null) {
    // Check if the token is expired
    return claims.exp >= Math.floor(Date.now() / 1000);
  }

  return false;
};

/**
 * Authenticates a user by sending login credentials to the backend API and stores the JWT token in cookies.
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise that resolves to an ApiResponse object indicating the result of the login attempt.
 */
export async function loginFunction(email: string, password: string) {
  try {
    // Send login request to backend API
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/auth/authenticate`,
      {
        email: email,
        password: password,
      }
    );

    let res = response.data as ApiResponse;
    const isProd: boolean = process.env.APP_ENV === "production";

    if (res.result) {
      const token = res.data.token;
      const claims: UserCredential = (await extractClaims(
        token
      )) as UserCredential;

      // Set the token in cookies with appropriate options
      cookies().set("auth", token, {
        expires:
          new Date(claims.exp * 1000) || new Date(Date.now() + 10 * 60 * 1000), // Default expiration time is 10 minutes
        path: "/", // Cookie path (default: root path '/')
        secure: isProd, // Set cookie as secure in production
        httpOnly: isProd, // Set cookie as HttpOnly in production
      });
    }

    return res;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: 500,
    });
  }
}
