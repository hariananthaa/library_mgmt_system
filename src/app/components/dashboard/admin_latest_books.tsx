import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { lusitana } from "../login/fonts";
import { fetchAllBooks } from "@/app/lib/book_actions";
import { shimmer } from "@/app/common/skeletons";
import { Book } from "@/app/lib/definitions";
import Link from "next/link";

export default async function AdminLatestBooks() {
  const latestBooksRes = await fetchAllBooks("", 1, 5, "");
  if (!latestBooksRes.result) {
    return (
      <div
        className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4 lg:col-span-4`}
      >
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Latest Books
        </h2>
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
          <div className="bg-white px-6">
            <div className="w-8 mx-auto h-96 flex justify-center items-center">
              <ExclamationTriangleIcon />
            </div>
            <div className="flex items-center pb-2 pt-6">
              <div className="h-5 w-5 rounded-full bg-gray-200" />
              <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  const data = latestBooksRes.data as Book[];
  return (
    <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Books
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {data.map((book, i) => {
            return (
              <div
                key={book.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <Link
                      href={`/books/${book.id}/view`}
                      className="text-sm text-blue-600 underline md:text-base line-clamp-2 overflow-x-auto"
                    >
                      {book.title}
                    </Link>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {book.author}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} text-sm font-medium md:text-base`}
                >
                  {book.genre}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
