import Breadcrumbs from "@/app/components/books/breadcrumbs";
import EditMemberForm from "@/app/components/members/member_edit_form";
import { MEMBERS_ROUTE } from "@/app/constant";
import { getMemberById } from "@/app/lib/member-actions";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const memberRes: any = await getMemberById(id);

  if (!memberRes) {
    notFound();
  }
  return (
    <main className="max-w-[1600px] mx-auto md:p-3 xl:p-6">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Members", href: MEMBERS_ROUTE },
          {
            label: "View Member",
            href: `/members/${id}/view`,
            active: true,
          },
        ]}
      />
      <EditMemberForm member={memberRes.data} isView={true} />
    </main>
  );
}
