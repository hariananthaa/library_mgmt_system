// This file contains type definitions for your data.

export interface Book {
  id: number;
  createdAt: string; // ISO 8601 datetime string
  createdBy: string;
  updatedAt: string; // ISO 8601 datetime string
  updatedBy: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  publicationDate: string; // ISO 8601 date string
  copiesAvailable: number;
}

export interface Member {
  id: number;
  createdAt: string; // ISO 8601 datetime string
  createdBy: string;
  updatedAt: string; // ISO 8601 datetime string
  updatedBy: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  password: string;
}

export enum Role {
  STUDENT = "STUDENT",
  FAULTY = "FAULTY",
  ADMIN = "ADMIN",
}

export enum BookTransactionStatus {
  REQUESTED = "REQUESTED",
  APPROVED = "APPROVED",
  RETURNED = "RETURNED",
  CANCELLED = "CANCELLED",
}

export const statusList = [
  BookTransactionStatus.REQUESTED,
  BookTransactionStatus.APPROVED,
  BookTransactionStatus.RETURNED,
  BookTransactionStatus.CANCELLED,
];

export interface BookTransaction {
  createdAt: string; // ISO 8601 datetime string
  createdBy: string;
  updatedAt: string; // ISO 8601 datetime string
  updatedBy: string;
  id: number;
  book: Book;
  member: Member;
  issueDate: string; // ISO 8601 datetime string
  dueDate: string; // ISO 8601 datetime string
  returnDate?: string; // ISO 8601 datetime string, optional
  requestDate: string; // ISO 8601 datetime string
  status: BookTransactionStatus;
}

export interface ApiResponse {
  status: number;
  data: any;
  message: string;
  result: boolean;
  totalPages: number;
  totalElements: number;
  pageNumber: number;
}

export type AuthState = {
  user: UserCredential | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type UserCredential = {
  name: string;
  sub: string;
  phone: string;
  role: string;
  id: number;
  iat: number;
  exp: number;
};
