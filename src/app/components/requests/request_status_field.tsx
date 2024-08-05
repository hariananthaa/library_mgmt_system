"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import UpdateRequestPopup from "./update_request_popup";
import { usePopupStore } from "@/app/zustand/popup_store";
import {
  BookTransaction,
  BookTransactionStatus,
  Role,
  statusList,
} from "@/app/lib/definitions";
import { updateBookTransaction } from "@/app/lib/book_transaction_actions";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/zustand/auth_store";

function BookTransactionStatusField({
  bookTransaction,
  value,
}: {
  bookTransaction: BookTransaction;
  value: BookTransactionStatus;
}) {
  const role = useAuthStore((state) => state.user)?.role;
  const setPopup = usePopupStore((state) => state.setPopup);
  const [loading, setLoading] = useState<boolean>(false);

  return loading ? (
    <div className="flex justify-center items-center w-[104px]">
      <ArrowPathIcon className="pointer-events-none w-[16px] aspect-square animate-spin text-blue" />
    </div>
  ) : (
    <div
      className={clsx(
        " px-1 py-[2px] rounded-md ",
        value === BookTransactionStatus.REQUESTED
          ? "bg-sky-100"
          : value === BookTransactionStatus.APPROVED
            ? "bg-orange-100"
            : value === BookTransactionStatus.RETURNED
              ? "bg-green-100"
              : "bg-red-100"
      )}
    >
      <select
        id={"request_status"}
        name={"request_status"}
        value={value}
        disabled={
          role !== Role.ADMIN &&
          bookTransaction.status !== BookTransactionStatus.REQUESTED
        }
        onChange={async (val) => {
          switch (val.target.value) {
            case BookTransactionStatus.APPROVED:
              setPopup({
                open: true,
                children: (
                  <UpdateRequestPopup
                    bookTransaction={bookTransaction}
                    status={BookTransactionStatus.APPROVED}
                  />
                ),
              });
              break;
            case BookTransactionStatus.RETURNED:
              setPopup({
                open: true,
                children: (
                  <UpdateRequestPopup
                    bookTransaction={bookTransaction}
                    status={BookTransactionStatus.RETURNED}
                  />
                ),
              });
              break;
            case BookTransactionStatus.CANCELLED:
              setLoading(true);
              const res = await updateBookTransaction({
                ...bookTransaction,
                status: BookTransactionStatus.CANCELLED,
              });
              if (res.result) {
                toast.success("Request updated successfully!");
              } else {
                toast.error(res.message);
              }
              setLoading(false);
              break;
            default:
              toast.error("Invalid status");
              break;
          }
        }}
        className={clsx(
          "peer block w-max outline-none rounded-md py-1 text-sm outline-2 placeholder:text-gray-500 bg-transparent"
        )}
      >
        {statusList.map((item) => (
          <option
            disabled={
              role !== Role.ADMIN &&
              (item === BookTransactionStatus.APPROVED ||
                item === BookTransactionStatus.RETURNED)
            }
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BookTransactionStatusField;
