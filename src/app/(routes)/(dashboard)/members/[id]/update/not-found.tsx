/**
 * NotFound component that displays a 404 error message when a book is not found.
 * Provides a link to return to the main members page.
 *
 * @returns The JSX element representing the NotFound page.
 */

import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { MEMBERS_ROUTE } from "@/app/constant";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested member.</p>
      <Link
        href={MEMBERS_ROUTE}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}
