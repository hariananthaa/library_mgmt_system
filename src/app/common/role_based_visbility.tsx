"use client";
import React, { ReactElement } from "react";
import { useAuth } from "./use_auth";

export type RoleCheckType = "any" | "all";

interface RoleBasedVisibilityProps {
  children: ReactElement;
  role: string[];
  checkType?: RoleCheckType;
  fallback?: ReactElement;
}

function RoleBasedVisibility({
  children,
  role,
  checkType = "any",
  fallback = <></>,
}: Readonly<RoleBasedVisibilityProps>): ReactElement {
  const { hasAnyRole, hasAllRoles } = useAuth();

  const hasRequiredRoles =
    checkType === "any" ? hasAnyRole(role) : hasAllRoles(role);

  if (!hasRequiredRoles) {
    return fallback;
  }
  return <>{children}</>;
}

export default RoleBasedVisibility;
