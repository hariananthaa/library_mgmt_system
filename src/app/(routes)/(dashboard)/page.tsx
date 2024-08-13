import { CardsSkeleton, LatestbooksSkeleton } from "@/app/common/skeletons";
import AdminCards from "@/app/components/dashboard/admin_cards";
import { Suspense } from "react";
import { lusitana } from "@/app/components/login/fonts";
import MemberCards from "@/app/components/dashboard/member_cards";
import AdminLatestBooks from "@/app/components/dashboard/admin_latest_books";
import AdminLatestMembers from "@/app/components/dashboard/admin_latest_members";
import RoleBasedVisibility from "@/app/common/role_based_visbility";
import { Role } from "@/app/lib/definitions";
import MemberLatestBooks from "@/app/components/dashboard/member_latest_books";
import MemberOverdueBooks from "@/app/components/dashboard/member_overdue_books";
import AdminOverdueBooks from "@/app/components/dashboard/admin_overdue_books";

export default async function Page() {
  return (
    <main className="md:p-3 xl:p-6 overflow-y-auto h-full">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <RoleBasedVisibility role={[Role.ADMIN]} fallback={<MemberCards />}>
        <Suspense fallback={<CardsSkeleton />}>
          <AdminCards />
        </Suspense>
      </RoleBasedVisibility>
      <div className="pt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RoleBasedVisibility role={[Role.ADMIN]} fallback={<></>}>
          <Suspense fallback={<LatestbooksSkeleton />}>
            <AdminOverdueBooks />
          </Suspense>
        </RoleBasedVisibility>
        <RoleBasedVisibility
          role={[Role.ADMIN]}
          fallback={<MemberLatestBooks />}
        >
          <Suspense fallback={<LatestbooksSkeleton />}>
            <AdminLatestBooks />
          </Suspense>
        </RoleBasedVisibility>
        <RoleBasedVisibility
          role={[Role.ADMIN]}
          fallback={<MemberOverdueBooks />}
        >
          <Suspense fallback={<LatestbooksSkeleton />}>
            <AdminLatestMembers />
          </Suspense>
        </RoleBasedVisibility>
      </div>
    </main>
  );
}
