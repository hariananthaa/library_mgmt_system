import { EditButton } from "@/app/common/edit_button";
import DeleteBookButton from "./delete_button";
import { Book } from "@/app/lib/definitions";

function AdminBookActionButtons({ book }: { book: Book }) {
  return (
    <div className="flex justify-center gap-3">
      <EditButton href={`/books/${book.id}/edit`} />
      <DeleteBookButton id={book.id} />
    </div>
  );
}

export default AdminBookActionButtons;
