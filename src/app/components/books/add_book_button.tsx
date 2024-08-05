"use client";

import { useAuth } from "@/app/common/useAuth";
import { BOOKS_ADD_ROUTE } from "@/app/constant";
import { Role } from "@/app/lib/definitions";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function AddBookButton() {
  const { hasRole } = useAuth();
  return hasRole(Role.ADMIN) ? (
    <Link
      href={BOOKS_ADD_ROUTE}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <PlusIcon className="h-5 md:mr-2" />
      <span className="hidden md:block">Add Book</span>{" "}
    </Link>
  ) : (
    <></>
  );
}
