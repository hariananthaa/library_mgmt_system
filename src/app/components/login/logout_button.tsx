"use client";

import { removeCookie } from "@/app/lib/auth_actions";
import { useAuthStore } from "@/app/zustand/auth_store";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  return (
    <button
      onClick={() => {
        removeCookie();
        router.replace("/login");
      }}
      className=" hidden md:flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="w-5" />
      Logout
    </button>
  );
}

export default LogoutButton;
