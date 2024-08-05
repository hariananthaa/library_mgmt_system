import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "../login/fonts";
import { shimmer } from "@/app/common/skeletons";
import { Member } from "@/app/lib/definitions";
import Link from "next/link";
import { fetchAllMembers } from "@/app/lib/member_actions";

export default async function AdminLatestMembers() {
  const latestMembersRes = await fetchAllMembers("", 1, 5);
  if (!latestMembersRes.result) {
    return (
      <div
        className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4 lg:col-span-4`}
      >
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Latest Members
        </h2>
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
          <div className="bg-white px-6">
            <div className="w-8 mx-auto h-96 flex justify-center items-center">
              <ExclamationTriangleIcon />
            </div>
            <div className="flex items-center pb-2 pt-6">
              <div className="h-5 w-5 rounded-full bg-gray-200" />
              <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  const data = latestMembersRes.data as Member[];
  return (
    <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Members
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {data.map((member, i) => {
            return (
              <div
                key={member.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0">
                    <Link
                      href={`/members/${member.id}/view`}
                      className="overflow-x-auto text-sm text-blue-600 underline md:text-base line-clamp-2"
                    >
                      {member.name}
                    </Link>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {member.email}
                    </p>
                  </div>
                </div>
                <p className={`${lusitana.className} text-xs md:text-base`}>
                  {member.role}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
