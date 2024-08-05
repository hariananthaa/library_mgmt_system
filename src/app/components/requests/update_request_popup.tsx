"use client";
import InputField from "@/app/common/input_field";
import { usePopupStore } from "@/app/zustand/popup_store";
import { DialogTitle } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateBookTransaction } from "@/app/lib/book_transaction_actions";
import { BookTransaction, BookTransactionStatus } from "@/app/lib/definitions";
import { Button } from "@/app/common/button";
import { formatDateFromTimestamp } from "@/app/lib/utils";

export default function UpdateTransactionPopup({
  bookTransaction,
  status,
}: {
  bookTransaction: BookTransaction;
  status: BookTransactionStatus;
}) {
  const setPopup = usePopupStore((state) => state.setPopup);
  const schema = yup.object().shape({
    dueDate: yup
      .string()
      .required(
        `${status === BookTransactionStatus.APPROVED ? "Due" : "Return"} date is required`
      ),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isLoading, isSubmitting, isValidating },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  return (
    <div className="text-center sm:text-left w-full bg-white">
      <DialogTitle
        as="h3"
        className="text-base text-center font-semibold leading-6 text-blue-600 pt-3"
      >
        {status === BookTransactionStatus.APPROVED
          ? "Issue Book"
          : "Return Book"}
      </DialogTitle>
      <form
        className="mt-0"
        onSubmit={handleSubmit(async (values) => {
          const request =
            status === BookTransactionStatus.APPROVED
              ? {
                  ...bookTransaction,
                  status: BookTransactionStatus.APPROVED,
                  issueDate: formatDateFromTimestamp(Date.now()),
                  dueDate: values.dueDate,
                }
              : {
                  ...bookTransaction,
                  status: BookTransactionStatus.RETURNED,
                  returnDate: values.dueDate,
                };
          const res = await updateBookTransaction(request);
          if (!res.result) {
            toast.error(res.message);
          } else {
            toast.success("Book request updated successfully!");
            setPopup({
              open: false,
              children: <></>,
            });
          }
        })}
      >
        <div className="w-full p-4">
          <InputField
            id="dueDate"
            label={
              status === BookTransactionStatus.APPROVED
                ? "Due date"
                : "Return date"
            }
            error={errors.dueDate}
            register={register}
            type="date"
            placeholder={`Enter the ${status === BookTransactionStatus.APPROVED ? "due" : "return"} date`}
          />
        </div>
        <div className="bg-gray-50 px-4 py-3 flex sm:px-6 gap-2 w-full sm:justify-end">
          <button
            type="button"
            data-autofocus
            onClick={() =>
              setPopup({
                open: false,
                children: <></>,
              })
            }
            className="w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
          <Button
            disabled={isLoading || isSubmitting || isValidating}
            className="w-full sm:w-max flex justify-center"
            type="submit"
          >
            {status === BookTransactionStatus.APPROVED
              ? "Issue book"
              : "Update book"}
          </Button>
        </div>
      </form>
    </div>
  );
}
