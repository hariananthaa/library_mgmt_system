"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import { statusList } from "@/app/lib/definitions";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterStatusButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className={clsx(" px-1 py-1.5 border-blue-600 rounded-md border")}>
      <select
        id={"filter_status"}
        name={"filter_status"}
        value={searchParams.get("status") ?? "ALL"}
        onChange={(val) => {
          if (val.target.value === "ALL") {
            router.push("/books/history");
          } else {
            router.push(`/books/history?status=${val.target.value}`);
          }
        }}
        className={clsx(
          "peer block w-max outline-none rounded-md py-1 text-sm outline-2 placeholder:text-gray-500 bg-transparent"
        )}
      >
        {[...statusList, "ALL"].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
