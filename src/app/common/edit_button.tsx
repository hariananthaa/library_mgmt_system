import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function EditButton({ href }: { href: string }) {
  return (
    <Link href={href} className="rounded-md border p-2 hover:bg-blue-100">
      <PencilIcon className="w-4" />
    </Link>
  );
}
