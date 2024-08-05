"use client";
import React from "react";

export const BookTableError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <main className="flex h-screen -mt-32 flex-col items-center justify-center">
      <div className="flex-1"></div>
      <h2 className="text-center">{error.message}</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the books route
          () => reset()
        }
      >
        Try again
      </button>
      <div className="flex-1"></div>
    </main>
  );
};
