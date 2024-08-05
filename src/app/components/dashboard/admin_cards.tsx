import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { lusitana } from "../login/fonts";
import { fetchDashboardCounts } from "@/app/lib/dashboard-actions";
import clsx from "clsx";

export default async function AdminCards() {
  const dashboardData = await fetchDashboardCounts();
  if (!dashboardData.result) {
    return (
      <div
        className={clsx(
          "grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
        )}
      >
        <Card title="Total Books" value={null} />
        <Card title="Total Borrowed" value={null} />
        <Card title="Total Overdue" value={null} />
        <Card title="Total Requested" value={null} />
        <Card title="Total Members" value={null} />
      </div>
    );
  }
  const data = dashboardData.data;
  return (
    <div
      className={clsx(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
      )}
    >
      <div className="sm:col-span-2 xl:col-span-1">
        <Card title="Total Books" value={data.totalBooks} />
      </div>
      <div className="sm:col-span-1 lg:col-span-2 xl:col-span-1">
        <Card title="Total Members" value={data.totalMembers} />
      </div>
      <div className="sm:col-span-1">
        <Card title="Total Requested" value={data.totalRequestedBooks} />
      </div>
      <div className="sm:col-span-1 lg:col-span-2 xl:col-span-1">
        <Card title="Total Borrowed" value={data.totalBorrowedBooks} />
      </div>
      <div className="sm:col-span-1">
        <Card title="Total Overdue" value={data.totalOverdueBooks} />
      </div>
    </div>
  );
}

export function Card({
  title,
  value,
}: {
  title: string;
  value: number | null;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm ">
      <div className="flex p-4">
        <h3 className=" text-sm font-medium">{title}</h3>
      </div>
      <div
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value ?? (
          <div className="w-8 m-auto">
            <ExclamationTriangleIcon />
          </div>
        )}
      </div>
    </div>
  );
}
