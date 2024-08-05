import EditBookForm from "@/app/components/books/book_edit_form";
import Breadcrumbs from "@/app/components/books/breadcrumbs";
import { BOOKS_ROUTE } from "@/app/constant";
import { getBookById } from "@/app/lib/book-actions";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const bookRes: any = await getBookById(id);

  if (!bookRes) {
    notFound();
  }
  return (
    <main className="max-w-[1600px] mx-auto md:p-3 xl:p-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Books", href: BOOKS_ROUTE },
          {
            label: "View Book",
            href: `/books/${id}/view`,
            active: true,
          },
        ]}
      />
      <EditBookForm book={bookRes.data} isView={true} />
    </main>
  );
}
