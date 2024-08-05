"use client";
import React, { ReactElement } from "react";
import { useAuth } from "./use_auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export type RoleCheckType = "any" | "all";

interface WithRoleProps {
  children: ReactElement;
  role: string[];
  checkType?: RoleCheckType;
  redirect?: string;
}

function WithRole({
  children,
  role,
  checkType = "any",
  redirect = "/",
}: Readonly<WithRoleProps>): ReactElement | undefined {
  const router = useRouter();
  const { hasAnyRole, hasAllRoles } = useAuth();

  const hasRequiredRoles =
    checkType === "any" ? hasAnyRole(role) : hasAllRoles(role);

  if (!hasRequiredRoles) {
    router.push(redirect);
    toast.error("Unauthorized access!");
  } else {
    return <>{children}</>;
  }
}

export default WithRole;
