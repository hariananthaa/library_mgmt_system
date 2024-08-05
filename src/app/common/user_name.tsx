"use client";

import React from "react";
import { useAuthStore } from "../zustand/auth_store";

export default function UsernameComponent() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="hidden text-white md:flex justify-end items-center rounded text-[13px] overflow-ellipsis w-max ml-auto bg-blue-500 px-5 py-2">
      <span className=" overflow-x-auto overflow-ellipsis line-clamp-2">
        Welcome, {user?.name}
      </span>
    </div>
  );
}
