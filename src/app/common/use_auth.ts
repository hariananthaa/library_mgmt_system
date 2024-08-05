import { useAuthStore } from "../zustand/auth_store";

export const useAuth = (): any => {
  const user = useAuthStore((state) => state.user);

  const hasRole = (role: string): boolean => {
    return user?.role?.includes(role) ?? false;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some((role) => user?.role?.includes(role)) ?? false;
  };

  const hasAllRoles = (roles: string[]): boolean => {
    return roles.every((role) => user?.role?.includes(role)) ?? false;
  };

  return {
    user,
    hasRole,
    hasAnyRole,
    hasAllRoles,
  };
};
