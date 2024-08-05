import { formatDateToLocal } from "@/app/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import Pagination from "../books/pagination";
import RequestStatusField from "./request_status_field";
import RequestCard from "./request_card";
import { BookTransaction } from "@/app/lib/definitions";
import { fetchAllBookTransactions } from "@/app/lib/book_transaction_actions";

export default async function RequestsTable({
  query,
  currentPage,
  size,
  status,
}: {
  query: string;
  currentPage: number;
  size: number;
  status: string;
}) {
  const requestsRes = await fetchAllBookTransactions(
    query,
    currentPage,
    size,
    status
  );

  if (!requestsRes.result) {
    const errorMessage = "Failed to fetch the books!";
    throw new Error(errorMessage);
  }

  const requests = requestsRes.data;

  return (
    <div className="mt-4 min-w-full align-middle flex flex-col h-full">
      <div className="bg-gray-50 w-full rounded-lg p-2 overflow-x-auto h-full">
        <div
          className={clsx(
            "grid grid-cols-1 gap-2 md:gap-3 sm:grid-cols-2 lg:hidden text-center items-center",
            requests.length == 0 ? "h-60" : ""
          )}
        >
          {requests.length == 0 ? (
            <h1 className="w-full flex col-span-1 sm:col-span-2 justify-center items-center h-60">
              There is no data!
            </h1>
          ) : (
            requests.map((request: BookTransaction) => (
              <RequestCard key={request.id} request={request} />
            ))
          )}
        </div>
        <table className="hidden min-w-full text-gray-900 lg:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th
                scope="col"
                className="px-4 py-5 font-medium text-center border-r sm:pl-6 w-[40%]"
              >
                Book Title
              </th>
              <th
                scope="col"
                className="px-3 py-5 font-medium text-center border-x w-[30%]"
              >
                Member Name
              </th>
              <th
                scope="col"
                className="px-3 py-5 font-medium text-center border-x w-[18%]"
              >
                Requested Date
              </th>

              <th
                scope="col"
                className="relative py-3 px-6 font-medium text-center w-[6%]"
              >
                <span className="sr-only">Edit</span>
                Status
              </th>
            </tr>
          </thead>
          {requests.length == 0 ? (
            <tbody className="w-full h-60 bg-white">
              <tr className="w-full">
                <td colSpan={7} className="w-full text-center">
                  There is no data!
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white overflow-y-auto h-full">
              {requests.map((request: BookTransaction) => (
                <tr
                  key={request.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="px-3 py-3">
                    <Link
                      className="text-blue-500 underline line-clamp-2"
                      href={`/books/${request.book.id}/view`}
                    >
                      {request.book.title}
                    </Link>
                  </td>
                  <td className="px-3 py-3 line-clamp-2">
                    <Link
                      className="text-blue-500 underline line-clamp-2"
                      href={`/members/${request.member.id}/view`}
                    >
                      {request.member.name}
                    </Link>
                    <div>{request.member.email}</div>
                  </td>
                  <td className=" px-3 py-3 text-center text-[13px]">
                    {formatDateToLocal(request.requestDate)}
                  </td>

                  <td className=" px-3 py-3 text-center">
                    <RequestStatusField
                      bookTransaction={request}
                      value={request.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {requestsRes.totalPages > 0 && (
        <div className="py-3 flex w-full justify-center">
          <Pagination totalPages={requestsRes.totalPages} />
        </div>
      )}
    </div>
  );
}
