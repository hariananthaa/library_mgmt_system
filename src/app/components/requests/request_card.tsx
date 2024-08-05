"use client";

import { BookTransaction, Role } from "@/app/lib/definitions";
import Link from "next/link";
import RequestStatusField from "./request_status_field";
import { useAuthStore } from "@/app/zustand/auth_store";
import { useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "@/app/constant";

export default function RequestCard({ request }: { request: BookTransaction }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  if (user === null) {
    router.push(LOGIN_ROUTE);
  }
  return (
    <div
      key={request.id}
      className="h-full w-full rounded-md bg-white p-4 flex flex-col justify-between"
    >
      <div className="flex flex-col justify-between h-full space-y-1">
        <div className="b flex flex-col justify-start items-start text-start space-y-2">
          <Link
            className="text-blue-500 underline line-clamp-2"
            href={`/requests/${request.id}/view`}
          >
            {request.book.title}
          </Link>
          {user?.role === Role.ADMIN && (
            <Link
              className="text-blue-500 underline line-clamp-2"
              href={`/members/${request.member.id}/view`}
            >
              <p className="text-xs text-start line-clamp-2">
                <span className="text-sm text-black">Requested by </span>
                <br />
                {request.member.name}
              </p>
            </Link>
          )}
        </div>
        <div className="flex justify-between py-3">
          <div className="flex flex-col items-center text-sm">
            <p>Issued</p>
            <p className="text-xs text-start text-blue-600">
              {request.issueDate ?? "---"}
            </p>
          </div>
          <div className="flex flex-col items-center text-sm">
            <p>Due</p>
            <p className="text-xs text-start text-blue-600">
              {request.dueDate ?? "---"}
            </p>
          </div>
          <div className="flex flex-col items-center text-sm">
            <p>Returned</p>
            <p className="text-xs text-start text-blue-600">
              {request.returnDate ?? "---"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between border-t py-3">
        <p className="text-sm text-start text-blue-600">
          <span className="text-xs text-black">Requested: </span>
          {request.requestDate}
        </p>
        <RequestStatusField bookTransaction={request} value={request.status} />
      </div>
    </div>
  );
}
