"use server";

import CustomDropDown from "@/app/common/custom-drop-down";
import Search from "@/app/common/search";
import { BooksTableSkeleton } from "@/app/common/skeletons";
import { AddBookButton } from "@/app/components/books/add_book_button";
import BooksTable from "@/app/components/books/book_table";
import { BookTableError } from "@/app/components/books/book_table_error";
import FilterGenreButton from "@/app/components/books/filter_genre_button";
import RefreshButton from "@/app/components/books/refresh_book_button";
import { lusitana } from "@/app/components/login/fonts";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    size?: string;
    genre?: string;
  };
}) {
  const query = searchParams?.query || "";
  const genre = searchParams?.genre || "";
  const currentPage = Number(searchParams?.page) || 1;
  const size = Number(searchParams?.size) || 6;
  return (
    <main className="w-full h-full xl:max-w-[1600px] mx-auto md:p-3 xl:p-6">
      <div className="flex w-full items-center justify-between pb-2 overflow-x-auto space-x-2">
        <div className="flex items-center justify-between space-x-2">
          <h1 className={`${lusitana.className} text-2xl`}>Books</h1>
          <RefreshButton />
        </div>
        <FilterGenreButton />
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <Search placeholder="Search books..." />
        <AddBookButton />
      </div>
      <ErrorBoundary errorComponent={BookTableError}>
        <Suspense key={query + currentPage} fallback={<BooksTableSkeleton />}>
          <BooksTable
            query={query}
            currentPage={currentPage}
            size={size}
            genre={genre}
          />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
