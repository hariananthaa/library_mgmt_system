import { EditButton } from "@/app/common/edit_button";
import { Member, Role } from "@/app/lib/definitions";
import { fetchAllMembers } from "@/app/lib/member_actions";
import Pagination from "../books/pagination";
import DeleteMemberButton from "./delete_button";
import Link from "next/link";

export default async function MembersTable({
  query,
  currentPage,
  size,
}: {
  query: string;
  currentPage: number;
  size: number;
}) {
  let membersRes = await fetchAllMembers(query, currentPage, size);
  const totalPages = membersRes.totalPages as number;

  if (!membersRes.result) {
    const errorMessage = "Failed to fetch the books!";
    throw new Error(errorMessage);
  }

  let members = membersRes.data as Member[];

  function actionButtons(member: Member) {
    return (
      <div className="flex justify-center gap-3">
        <EditButton href={`/members/${member.id}/update`} />
        <DeleteMemberButton memberId={member.id ?? 0} />
      </div>
    );
  }
  return (
    <div className="mt-6 flow-root min-w-full align-middle">
      <div className="rounded-lg bg-gray-50 p-2 overflow-x-auto">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:hidden">
          {members.length == 0 ? (
            <h1 className="text-black">There is no members!</h1>
          ) : (
            members.map((member: Member) => (
              <div
                key={member.id}
                className=" w-full flex flex-col justify-between rounded-md bg-white p-4"
              >
                <div className="flex flex-col items-start justify-start pb-4">
                  <Link
                    className="text-blue-500 underline line-clamp-2 flex items-center"
                    href={`/members/${member.id}/view`}
                  >
                    {member.name}
                  </Link>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
                <div className="flex w-full items-center justify-between border-t pt-3">
                  <div>
                    <p className="text-sm">{member.phone}</p>
                    <p
                      style={{
                        color:
                          member.role === Role.ADMIN
                            ? "#FF00FF"
                            : member.role === Role.FAULTY
                              ? "#FFA500"
                              : "#800080",
                      }}
                    >
                      {member.role}
                    </p>
                  </div>
                  {actionButtons(member)}
                </div>
              </div>
            ))
          )}
        </div>
        <table className="hidden min-w-full text-gray-900 lg:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th
                scope="col"
                className="px-4 py-5 font-medium text-center border-r w-[30%]"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-5 font-medium text-center border-x w-[30%]"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-3 py-5 font-medium text-center border-x w-[20%]"
              >
                Phone
              </th>
              <th
                scope="col"
                className="px-3 py-5 font-medium text-center border-x w-[10%]"
              >
                Role
              </th>
              <th
                scope="col"
                className=" py-3 pl-6 pr-4 w-1/[10%] font-medium text-center "
              >
                <span className="sr-only">Edit</span>
                Actions
              </th>
            </tr>
          </thead>
          {members.length == 0 ? (
            <tbody className="w-full h-60 bg-white">
              <tr className="w-full">
                <td colSpan={5} className="w-full text-center">
                  There is no members!
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white">
              {members.map((member: Member) => (
                <tr
                  key={member.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <Link
                      href={`/members/${member.id}/view`}
                      className="flex items-center gap-3 underline text-blue-600"
                    >
                      {member.name}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {member.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    {member.phone}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    {member.role}
                  </td>

                  <td className="whitespace-nowrap py-3 px-3">
                    {actionButtons(member)}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {totalPages > 0 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
