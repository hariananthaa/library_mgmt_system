import { Button } from "@/app/common/button";
import { BOOKS_ROUTE, LOGIN_ROUTE } from "@/app/constant";
import { addBookTransaction } from "@/app/lib/book_transaction_actions";
import { Book } from "@/app/lib/definitions";
import { useAuthStore } from "@/app/zustand/auth_store";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function MemberBookRequestButton({ book }: { book: Book }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  return (
    <Button
      disabled={loading || book.copiesAvailable < 1}
      onClick={async () => {
        setLoading(true);
        const res = await addBookTransaction(book.id, user?.id!);
        if (!res.result) {
          setLoading(false);
          toast.error(res.message);
          if (res.status == 403 || res.status === 401) {
            router.replace(LOGIN_ROUTE);
          } else {
            router.push(BOOKS_ROUTE);
          }
        } else {
          toast.info("Requested the book successfully!");
          setLoading(false);
        }
      }}
    >
      {loading ? (
        <ArrowPathIcon className="pointer-events-none w-4 h-4 animate-spin text-black" />
      ) : (
        "Request"
      )}
    </Button>
  );
}
