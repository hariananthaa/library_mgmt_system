"use server";

import axios from "axios";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ApiResponse } from "./definitions";
import { cookies } from "next/headers";
import { isTokenValid } from "./auth_actions";
import { BOOKS_ROUTE } from "../constant";
import { buildErrorResponse } from "./utils";

// Schema definition for validating book details
const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  isbn: z.string(),
  genre: z.string(),
  publicationDate: z.string(),
  copiesAvailable: z.coerce.number(),
});

const AddBook = BookSchema.omit({ id: true });

/**
 * Adds a new book to the library by sending a POST request to the backend API.
 *
 * @param values - The book details to be added.
 * @returns A promise that resolves to an ApiResponse object indicating the result of the operation.
 */
export async function addBook(values: any) {
  const addBookRequest = AddBook.parse({
    title: values.title,
    author: values.author,
    genre: values.genre,
    isbn: values.isbn,
    publicationDate: values.publicationDate,
    copiesAvailable: Number(values.copiesAvailable),
  });

  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/book`,
      addBookRequest,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    revalidatePath(BOOKS_ROUTE);
    return response.data as ApiResponse;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}

/**
 * Retrieves details of a book by its ID.
 *
 * @param id - The ID of the book to retrieve.
 * @returns A promise that resolves to an ApiResponse object containing the book details.
 */
export async function getBookById(id: string) {
  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/book/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
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
 * Updates an existing book's details.
 *
 * @param id - The ID of the book to update.
 * @param values - The updated book details.
 * @returns A promise that resolves to an ApiResponse object indicating the result of the update operation.
 */
export async function updateBook(id: string, values: any) {
  const updateBookRequest = AddBook.parse({
    title: values.title,
    author: values.author,
    genre: values.genre,
    isbn: values.isbn,
    publicationDate: values.publicationDate,
    copiesAvailable: Number(values.copiesAvailable),
  });

  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/book/${id}`,
      updateBookRequest,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    const res = response.data as ApiResponse;
    revalidatePath(BOOKS_ROUTE);
    return res;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}

/**
 * Deletes a book by its ID.
 *
 * @param id - The ID of the book to delete.
 * @returns A promise that resolves to an ApiResponse object indicating the result of the delete operation.
 */
export async function deleteBook(id: number) {
  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/book/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    // Introduce a delay to ensure the response is properly processed
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 2000));

    const res = response.data as ApiResponse;
    revalidatePath(BOOKS_ROUTE);
    return res;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}

/**
 * Fetches a paginated list of books based on query parameters.
 *
 * @param query - Search query to filter books.
 * @param page - The page number to retrieve.
 * @param size - The number of books per page.
 * @param genre - The genre to filter books by.
 * @returns A promise that resolves to an ApiResponse object containing the list of books.
 */
export async function fetchAllBooks(
  query: string,
  page: number,
  size: number,
  genre: string
) {
  noStore();
  const jwtToken = cookies().get("auth")?.value;
  const validToken = await isTokenValid();

  if (!validToken) {
    redirect("/login");
  }

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_DOMAIN}/api/v1/book?query=${query}&page=${page}&size=${size}&genre=${genre}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data as ApiResponse;
  } catch (error: any) {
    console.log("Server error", error.response);
    return buildErrorResponse({
      code: error?.response?.status ?? 500,
    });
  }
}
