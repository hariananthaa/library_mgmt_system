"use client";

import { Button } from "@/app/common/button";
import CustomDropDown from "@/app/common/custom_drop_down";
import InputField from "@/app/common/input_field";
import { updateBook } from "@/app/lib/book_actions";
import { ArrowPathIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BOOKS_ROUTE, genreColorMap, LOGIN_ROUTE } from "@/app/constant";
import Link from "next/link";

export default function EditBookForm({
  book,
  isView,
}: {
  book: any;
  isView: boolean;
}) {
  const router = useRouter();
  const bookSchema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters"),
    author: yup
      .string()
      .required("Author is required")
      .min(3, "Author must be at least 3 characters"),
    isbn: yup
      .string()
      .optional()
      .matches(/^\d{13}$/, "ISBN must be 13 digits"),
    genre: yup.string().required("Genre is required"),
    publicationDate: yup.string().required("Publication date is required"),
    copiesAvailable: yup
      .string()
      .required("Copies available is required")
      .min(1, "Copies available must be at least 1"),
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isLoading, isSubmitting, isValidating },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(bookSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const res = await updateBook(
          book.id,
          JSON.parse(JSON.stringify(values))
        );
        if (!res.result) {
          toast.error(res.message);
          if (res.status == 403 || res.status === 401) {
            router.push(LOGIN_ROUTE);
          }
        } else {
          toast.success("Book info updated successfully!");
          router.push(BOOKS_ROUTE);
        }
      })}
    >
      <div className="rounded-md gap-3 bg-gray-50 p-4 md:p-6 grid grid-cols-1 xl:grid-cols-2">
        <div className=" col-span-1 xl:col-span-2">
          <InputField
            defaultValue={book.title}
            id="title"
            label="Title"
            register={register}
            error={errors.title}
            disabled={isView}
            type="text"
            placeholder="Enter the title"
          />
        </div>
        <div className=" col-span-1 xl:col-span-2">
          <CustomDropDown
            defaultValue={book.genre}
            prefixIcon={
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2 text-gray-500" />
            }
            register={register}
            disabled={isView}
            label={"Choose a genre"}
            id={"genre"}
            options={Object.keys(genreColorMap)}
          />
        </div>
        <div className=" col-span-1">
          <InputField
            defaultValue={book.author}
            id="author"
            label="Author"
            register={register}
            disabled={isView}
            error={errors.author}
            type="text"
            placeholder="Enter the author name"
          />
        </div>
        <div className=" col-span-1">
          <InputField
            defaultValue={book.isbn}
            id="isbn"
            label="ISBN"
            register={register}
            disabled={isView}
            error={errors.isbn}
            type="number"
            placeholder="Enter the ISBN"
          />
        </div>
        <div className=" col-span-1">
          <InputField
            defaultValue={book.publicationDate}
            id="publicationDate"
            label="Publication Date"
            register={register}
            error={errors.publicationDate}
            disabled={isView}
            type="date"
            placeholder="Enter the publication date"
          />
        </div>
        <div className=" col-span-1">
          <InputField
            defaultValue={book.copiesAvailable}
            id="copiesAvailable"
            label="Copies Available"
            register={register}
            disabled={isView}
            error={errors.copiesAvailable}
            type="number"
            placeholder="Enter number of copies available"
          />
        </div>
      </div>

      {!isView && (
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href={BOOKS_ROUTE}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button
            disabled={isLoading || isSubmitting || isValidating}
            type="submit"
          >
            {isLoading || isSubmitting || isValidating ? (
              <ArrowPathIcon className="pointer-events-none h-[20px] w-[20px] animate-spin text-white" />
            ) : (
              "Save book"
            )}
          </Button>
        </div>
      )}
    </form>
  );
}
