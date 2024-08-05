"use client";

import { useParams, useRouter } from "next/navigation";
import React, { ReactElement, useEffect, useState } from "react";
import { useAuthStore } from "../zustand/auth_store";
import { extractClaimsWithoutToken } from "../lib/auth_actions";
import { HOME_ROUTE, LOGIN_ROUTE } from "../constant";
import DashboardSkeleton from "./skeletons";

function WithAuth({
  children,
  routeRole = "all",
}: Readonly<{
  children: React.ReactElement;
  routeRole?: string;
}>): ReactElement {
  const router = useRouter();
  const query = useParams();
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const claims = await extractClaimsWithoutToken(); // Extract claims from the token
        console.log(claims);

        if (claims != null) {
          // User is authenticated
          if (routeRole === "all") {
            // If any role is allowed, proceed
            setLoading(false);
            login(claims); // Update auth state
          } else if (routeRole === "auth") {
            // If specific role is required, handle redirect
            if (query?.redirect) {
              router.replace(query.redirect as string);
            } else {
              router.replace(HOME_ROUTE);
            }
          }
        } else if (routeRole === "auth") {
          // If authentication is required but not provided, finish loading
          setLoading(false);
        } else {
          // Redirect to login if not authenticated
          router.replace(LOGIN_ROUTE);
        }
      } catch (error: any) {
        console.error(error); // Log any errors
        router.replace(LOGIN_ROUTE); // Redirect to login on error
      }
    })();
  }, [login, query.redirect, routeRole, router]);

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col md:flex-row justify-center items-center gap-3 p-5">
        <div className="w-full h-40 bg-gray-100 rounded-lg md:w-60 md:h-full grow"></div>
        <div className="flex flex-col overflow-y-auto w-full md:p-5 h-full">
          <div className="flex-shrink-0 h-8 w-36 rounded-md bg-gray-100 md:hidden"></div>
          <DashboardSkeleton /> {/* Loading skeleton component */}
        </div>
      </div>
    );
  }

  // Render children once loading is complete and authentication is verified
  return <div>{children}</div>;
}

export default WithAuth;
