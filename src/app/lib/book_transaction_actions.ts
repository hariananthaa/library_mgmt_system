"use server";

import axios from "axios";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { z } from "zod";
import {
  ApiResponse,
  BookTransaction,
  BookTransactionStatus,
  Role,
} from "./definitions";
import { cookies } from "next/headers";
import { extractClaims, isTokenValid } from "./auth-actions";
import { redirect } from "next/navigation";
import { buildErrorResponse } from "./utils";

// Schema definitions for validating book transactions
const BookTransactionSchema = z.object({
  bookId: z.coerce.number(),
  memberId: z.coerce.number(),
  requestDate: z.string(),
  issueDate: z.string(),
  dueDate: z.string(),
  returnDate: z.string(),
  status: z.string(),
  id: z.coerce.number(),
});

const IssueBookTransaction = BookTransactionSchema.omit({
  bookId: true,
  memberId: true,
  requestDate: true,
  returnDate: true,
});

const ReturnBookTransaction = BookTransactionSchema.omit({
  bookId: true,
  memberId: true,
  requestDate: true,
  issueDate: true,
  dueDate: true,
});

const CancelBookTransaction = BookTransactionSchema.omit({
  bookId: true,
  memberId: true,
  requestDate: true,
  issueDate: true,
  returnDate: true,
  dueDate: true,
});

/**
 * Adds a new book transaction by sending a POST request to the backend API.
 *
 * @param bookId - The ID of the book involved in the transaction.
 * @param memberId - The ID of the member involved in the transaction.
 * @returns A promise that resolves to an ApiResponse object containing the result of the operation.
 */
export async function addBookTransaction(bookId: number, memberId: number) {
  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/book-transaction`,
      { bookId, memberId },
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    );
    const res = response.data as ApiResponse;

    if (res.result) {
      revalidatePath("/books");
    }

    return res;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}

/**
 * Retrieves details of a book transaction by its ID.
 *
 * @param id - The ID of the book transaction.
 * @returns A promise that resolves to an ApiResponse object containing the transaction details.
 */
export async function getBookTransactionById(id: string) {
  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/book-transaction/${id}`,
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    );
    return response.data as ApiResponse;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}

/**
 * Updates an existing book transaction based on its status.
 *
 * @param bookTransaction - The book transaction object containing updated details.
 * @returns A promise that resolves to an ApiResponse object indicating the result of the update operation.
 */
export async function updateBookTransaction(bookTransaction: BookTransaction) {
  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  let updateRequest;

  switch (bookTransaction.status) {
    case BookTransactionStatus.APPROVED:
      updateRequest = IssueBookTransaction.parse(bookTransaction);
      break;
    case BookTransactionStatus.RETURNED:
      updateRequest = ReturnBookTransaction.parse(bookTransaction);
      break;
    case BookTransactionStatus.CANCELLED:
      updateRequest = CancelBookTransaction.parse(bookTransaction);
      break;
    default:
      updateRequest = BookTransactionSchema.parse(bookTransaction);
      break;
  }

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/book-transaction/${updateRequest.id}`,
      updateRequest,
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    );
    const res = response.data as ApiResponse;

    if (res.result) {
      revalidatePath("/books");
    }

    return res;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}

/**
 * Deletes a book transaction by its ID.
 *
 * @param id - The ID of the book transaction to be deleted.
 * @returns A promise that resolves to an ApiResponse object indicating the result of the delete operation.
 */
export async function deleteBookTransaction(id: string) {
  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/book-transaction/${id}`,
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    );

    // Introduce a delay to ensure the response is properly processed
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 2000));

    const res = response.data as ApiResponse;

    if (res.result) {
      revalidatePath("/books");
    }

    return res;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}

/**
 * Fetches a paginated list of book transactions based on query parameters.
 *
 * @param query - Search query to filter book transactions.
 * @param page - The page number to retrieve.
 * @param size - The number of transactions per page.
 * @param status - The status of book transactions to filter.
 * @returns A promise that resolves to an ApiResponse object containing the list of book transactions.
 */
export async function fetchAllBookTransactions(
  query: string,
  page: number,
  size: number,
  status: string
) {
  const jwtToken = cookies().get("auth")?.value;
  const claims = await extractClaims(jwtToken);
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  noStore();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/book-transaction?query=${query}&page=${page}&size=${size}&status=${status}${claims.role !== Role.ADMIN ? `&memberId=${claims.id}` : ""}`,
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    );

    if (response.data.result) {
      revalidatePath(
        `/books/history?query=${query}&page=${page}&size=${size}&status=${status}${claims.role !== Role.ADMIN ? `&memberId=${claims.id}` : ""}`
      );
    }

    return response.data as ApiResponse;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}

/**
 * Fetches a paginated list of overdue book transactions.
 *
 * @param page - The page number to retrieve.
 * @param size - The number of transactions per page.
 * @returns A promise that resolves to an ApiResponse object containing the list of overdue book transactions.
 */
export async function fetchAllOverdueBookTransactions(
  page: number,
  size: number
) {
  const jwtToken = cookies().get("auth")?.value;
  const claims = await extractClaims(jwtToken);
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  noStore();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/book-transaction/overdue?page=${page}&size=${size}${claims.role !== Role.ADMIN ? `&memberId=${claims.id}` : ""}`,
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    );

    return response.data as ApiResponse;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}
