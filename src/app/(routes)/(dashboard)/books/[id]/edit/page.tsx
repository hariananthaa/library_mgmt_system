import EditBookForm from "@/app/components/books/book_edit_form";
import Breadcrumbs from "@/app/components/books/breadcrumbs";
import { BOOKS_ROUTE } from "@/app/constant";
import { getBookById } from "@/app/lib/book_actions";
import { ApiResponse } from "@/app/lib/definitions";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const bookRes: ApiResponse = await getBookById(id);

  if (!bookRes.data) {
    notFound();
  }
  return (
    <main className="max-w-[1600px] mx-auto md:p-3 xl:p-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Books", href: BOOKS_ROUTE },
          {
            label: "Edit Book",
            href: `/books/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditBookForm book={bookRes.data} isView={false} />
    </main>
  );
}
