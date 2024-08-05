"use client";

import { BOOKS_ROUTE, LOGIN_ROUTE } from "@/app/constant";
import { deleteMember } from "@/app/lib/member-actions";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteMemberButton({ memberId }: { memberId: number }) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <button
      key={memberId}
      onClick={async () => {
        setLoading(true);
        const res = await deleteMember(memberId);
        if (!res.result) {
          setLoading(false);
          toast.error(res.message);
          if (res.status == 403 || res.status === 401) {
            router.replace(LOGIN_ROUTE);
          } else {
            router.push(BOOKS_ROUTE);
          }
        } else {
          toast.info("Member info deleted successfully!");
        }
      }}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Delete</span>
      {loading ? (
        <ArrowPathIcon className="pointer-events-none w-4 h-4 animate-spin text-black" />
      ) : (
        <TrashIcon className="w-4" />
      )}
    </button>
  );
}
