import { fetchAllBooks } from "@/app/lib/book-actions";
import { Book } from "@/app/lib/definitions";
import clsx from "clsx";
import Link from "next/link";
import BookCard from "./book_card";
import Pagination from "./pagination";
import BookActionButtons from "./book_action_buttons";

export default async function BooksTable({
  query,
  currentPage,
  size,
  genre,
}: {
  query: string;
  currentPage: number;
  size: number;
  genre: string;
}) {
  const booksRes = await fetchAllBooks(query, currentPage, size, genre);
  if (!booksRes.result) {
    const errorMessage = "Failed to fetch the books!";
    throw new Error(errorMessage);
  }
  const books = booksRes.data as Book[];

  return (
    <div className="mt-4 min-w-full align-middle flex flex-col">
      <div className="bg-gray-50 w-full rounded-lg p-2 overflow-x-auto h-full">
        <div
          className={clsx(
            "grid grid-cols-1 gap-2 md:gap-3 lg:hidden text-center items-center",
            books.length == 0 ? "h-60 sm:grid-cols-1" : "sm:grid-cols-2"
          )}
        >
          {books.length == 0 ? (
            <div className="w-full flex justify-center items-center h-60">
              There is no books!
            </div>
          ) : (
            books.map((book: Book) => <BookCard key={book.id} book={book} />)
          )}
        </div>
        <table className="hidden min-w-full text-gray-900 lg:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th
                scope="col"
                className="px-4 py-5 font-medium text-center border-r sm:pl-6 w-[40%]"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-3 py-5 font-medium text-center border-x w-[30%]"
              >
                Author
              </th>
              <th
                scope="col"
                className="px-3 py-5 font-medium text-center border-x w-[18%]"
              >
                Genre
              </th>
              <th
                scope="col"
                className="px-3 py-5 font-medium text-center border-x w-[6%]"
              >
                Copies
                <br />
                Available
              </th>
              <th
                scope="col"
                className="relative py-3 pl-6 pr-3 font-medium text-center w-[6%]"
              >
                <span className="sr-only">Edit</span>
                Actions
              </th>
            </tr>
          </thead>
          {books.length == 0 ? (
            <tbody className="w-full h-60 bg-white">
              <tr className="w-full">
                <td colSpan={5} className="w-full text-center">
                  There is no books!
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white overflow-y-auto h-full">
              {books.map((book: Book) => (
                <tr
                  key={book.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="px-3 py-3">
                    <Link
                      className="text-blue-500 underline line-clamp-2"
                      href={`/books/${book.id}/view`}
                    >
                      {book.title}
                    </Link>
                  </td>
                  <td className="px-3 py-3 line-clamp-2">{book.author}</td>
                  <td className=" px-3 py-3 text-center">{book.genre}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    {book.copiesAvailable}
                  </td>
                  <td className="whitespace-nowrap py-3 px-3">
                    <BookActionButtons book={book} />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {booksRes.totalPages > 0 && (
        <div className="py-3 flex w-full justify-center">
          <Pagination totalPages={booksRes.totalPages} />
        </div>
      )}
    </div>
  );
}
