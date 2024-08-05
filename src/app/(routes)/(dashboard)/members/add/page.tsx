import Breadcrumbs from "@/app/components/books/breadcrumbs";
import MemberAddForm from "@/app/components/members/member_add_form";
import { MEMBERS_ADD_ROUTE, MEMBERS_ROUTE } from "@/app/constant";

export default async function Page() {
  return (
    <main className="max-w-[1600px] mx-auto md:p-3 xl:p-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Members", href: MEMBERS_ROUTE },
          {
            label: "Add Member",
            href: MEMBERS_ADD_ROUTE,
            active: true,
          },
        ]}
      />
      <MemberAddForm />
    </main>
  );
}
