// Map of links to display in the side navigation.

import {
  BookOpenIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { BOOKS_ROUTE, HOME_ROUTE, MEMBERS_ROUTE } from "../constant";
import { useAuthStore } from "../zustand/auth_store";

export default function NavLinkData() {
  const user = useAuthStore((state) => state.user);
  if (user?.role === "ADMIN") {
    return [
      { name: "Home", href: HOME_ROUTE, icon: HomeIcon },
      {
        name: "Books",
        href: BOOKS_ROUTE,
        icon: BookOpenIcon,
      },
      {
        name: "History",
        href: "/books/history",
        icon: UserGroupIcon,
      },
      {
        name: "Requests",
        href: "/books/requests",
        icon: UserGroupIcon,
      },
      { name: "Members", href: MEMBERS_ROUTE, icon: UserGroupIcon },
    ];
  }
  return [
    { name: "Home", href: HOME_ROUTE, icon: HomeIcon },
    {
      name: "Books",
      href: BOOKS_ROUTE,
      icon: BookOpenIcon,
    },
    {
      name: "History",
      href: "/books/history",
      icon: UserGroupIcon,
    },
  ];
}
