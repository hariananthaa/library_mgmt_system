"use client";
import NavLinkData from "@/app/common/nav_link_data";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavLinks() {
  const pathname = usePathname();
  return (
    <div className="md:hidden flex justify-between space-x-1 w-screen overflow-x-auto">
      {NavLinkData().map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex flex-col w-full items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-[18px]" />
            <p className="text-xs object-scale-down">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
