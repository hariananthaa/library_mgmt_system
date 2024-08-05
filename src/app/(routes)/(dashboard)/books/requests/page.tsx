import Search from "@/app/common/search";
import { BooksTableSkeleton } from "@/app/common/skeletons";
import Table from "@/app/components/books/book_table";
import RefreshButton from "@/app/components/books/refresh_book_button";
import { lusitana } from "@/app/components/login/fonts";
import RequestsTable from "@/app/components/requests/request_table";
import { BookTransactionStatus } from "@/app/lib/definitions";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    size?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const size = Number(searchParams?.size) || 6;
  return (
    <main className="w-full xl:max-w-[1600px] mx-auto md:p-3 xl:p-6">
      <div className="flex w-full items-center justify-start pb-2 space-x-2">
        <h1 className={`${lusitana.className} text-2xl`}>Requests</h1>
        <RefreshButton />
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <Search placeholder="Search books..." />
      </div>
      <Suspense key={query + currentPage} fallback={<BooksTableSkeleton />}>
        <RequestsTable
          query={query}
          currentPage={currentPage}
          size={size}
          status={BookTransactionStatus.REQUESTED}
        />
      </Suspense>
    </main>
  );
}
