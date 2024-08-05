import { Book } from "@/app/lib/definitions";
import { formatDateToLocal } from "@/app/lib/utils";
import Link from "next/link";
import BookActionButtons from "./book_action_buttons";
import { genreColorMap } from "@/app/constant";

function BookCard({ book }: { book: Book }) {
  return (
    <div
      key={book.id}
      className="h-full w-full rounded-md bg-white p-4 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between pb-2 space-x-2">
        <div className=" space-y-1">
          <div className=" flex items-center text-start">
            <Link
              className="text-blue-500 underline line-clamp-2"
              href={`/books/${book.id}/view`}
            >
              {book.title}
            </Link>
          </div>
          <p className="text-sm text-gray-500 text-start line-clamp-2">
            {book.author}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm">Copies</p>
          <p>{book.copiesAvailable}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between pt-2 border-t">
        <div>
          <p
            style={{ color: genreColorMap[book.genre] }}
            className="text-sm text-start"
          >
            {book.genre}
          </p>
          <p className="text-sm text-start">
            {formatDateToLocal(book.publicationDate)}
          </p>
        </div>
        <BookActionButtons book={book} />
      </div>
    </div>
  );
}

export default BookCard;
