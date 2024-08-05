"use client";
import { LOGIN_ROUTE } from "@/app/constant";
import { useAuthStore } from "@/app/zustand/auth_store";
import { PowerIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AcmeLogo() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  return (
    <div
      className={` w-full bg-blue-600 rounded flex text-[20px] items-center justify-between text-white md:h-32 md:flex-none`}
    >
      <Link
        href={"/"}
        className={clsx(
          "flex md:w-full whitespace-nowrap justify-center px-4 md:text-center transition-all xl:rotate-0 xl:text-2xl text-xl"
        )}
      >
        ZIT LIBRARY
      </Link>
      <div className="flex flex-col text-right text-[13px] overflow-ellipsis w-full md:hidden">
        <span className="text-right">Welcome</span>
        <span className=" overflow-x-auto overflow-ellipsis line-clamp-2">
          {user?.name}
        </span>
      </div>
      <button
        onClick={() => {
          logout();
          router.replace(LOGIN_ROUTE);
        }}
        className="px-3 rounded-full aspect-square flex justify-center items-center md:hidden"
      >
        <PowerIcon className="w-6" />
      </button>
    </div>
  );
}
