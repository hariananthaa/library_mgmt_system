"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <button
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        router.refresh();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      }}
      className="h-[20px] w-[20px] block"
    >
      <ArrowPathIcon
        className={clsx(
          loading && "animate-spin",
          "pointer-events-none text-blue-600"
        )}
      />
    </button>
  );
}
