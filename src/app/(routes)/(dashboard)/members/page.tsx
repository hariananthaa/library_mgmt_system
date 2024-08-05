import Search from "@/app/common/search";
import { BooksTableSkeleton } from "@/app/common/skeletons";
import RefreshButton from "@/app/components/books/refresh_book_button";
import { lusitana } from "@/app/components/login/fonts";
import { AddMemberButton } from "@/app/components/members/add_member_button";
import MembersTable from "@/app/components/members/member_table";
import { Suspense } from "react";

export default async function MembersPage({
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
    <main className="w-full h-full xl:max-w-[1600px] mx-auto md:p-3 xl:p-6">
      <div className="flex w-full items-center justify-start pb-2 space-x-2">
        <h1 className={`${lusitana.className} text-2xl`}>Members</h1>
        <RefreshButton />
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <Search placeholder="Search members..." />
        <AddMemberButton />
      </div>
      <Suspense key={query + currentPage} fallback={<BooksTableSkeleton />}>
        <MembersTable query={query} currentPage={currentPage} size={size} />
      </Suspense>
    </main>
  );
}
