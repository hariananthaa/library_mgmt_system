"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { genreColorMap } from "@/app/constant";
import clsx from "clsx";

export default function FilterGenreButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className={clsx("w-max px-1 border-blue-600 rounded-md border")}>
      <select
        id={"filter_genre"}
        name={"filter_genre"}
        value={searchParams.get("genre") ?? "All"}
        onChange={(val) => {
          if (val.target.value === "All") {
            router.push("/books");
          } else {
            router.push(`/books?genre=${val.target.value}`);
          }
        }}
        className={clsx(
          "peer block w-auto outline-none rounded-md py-1 text-sm outline-2 placeholder:text-gray-500 bg-transparent"
        )}
      >
        {["All"].concat(Object.keys(genreColorMap)).map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
