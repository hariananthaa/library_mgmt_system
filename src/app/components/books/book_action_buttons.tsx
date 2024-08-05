"use client";
import React from "react";
import AdminBookActionButtons from "./admin_book_action_buttons";
import MemberBookRequestButton from "./book_request_button";
import { useAuth } from "@/app/common/useAuth";
import { Book, Role } from "@/app/lib/definitions";

function BookActionButtons({ book }: { book: Book }) {
  const { hasRole } = useAuth();
  return hasRole(Role.ADMIN) ? (
    <AdminBookActionButtons book={book} />
  ) : (
    <MemberBookRequestButton book={book} />
  );
}

export default BookActionButtons;
