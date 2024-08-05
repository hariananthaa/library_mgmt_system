import { fetchDashboardCounts } from "@/app/lib/dashboard_actions";
import { Card } from "./admin_cards";
import clsx from "clsx";

export default async function MemberCards() {
  const dashboardData = await fetchDashboardCounts();
  if (!dashboardData.result) {
    return (
      <div className={clsx("grid gap-6 sm:grid-cols-2 lg:grid-cols-4")}>
        <Card title="Total Books" value={null} />
        <Card title="Total Borrowed" value={null} />
        <Card title="Total Overdue" value={null} />
        <Card title="Total Requested" value={null} />
      </div>
    );
  }
  const data = dashboardData.data;

  return (
    <div className={clsx("grid gap-6 sm:grid-cols-2 lg:grid-cols-4")}>
      <div className="sm:col-span-2 xl:col-span-1">
        <Card title="Total Books" value={data.totalBooks} />
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
