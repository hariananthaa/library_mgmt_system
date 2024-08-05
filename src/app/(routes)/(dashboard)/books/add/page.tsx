import AddBookForm from "@/app/components/books/book_add_form";
import Breadcrumbs from "@/app/components/books/breadcrumbs";
import { BOOKS_ADD_ROUTE, BOOKS_ROUTE } from "@/app/constant";

export default async function Page() {
  return (
    <main className="max-w-[1600px] mx-auto md:p-3 xl:p-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Books", href: BOOKS_ROUTE },
          {
            label: "Add Book",
            href: BOOKS_ADD_ROUTE,
            active: true,
          },
        ]}
      />
      <AddBookForm />
    </main>
  );
}
