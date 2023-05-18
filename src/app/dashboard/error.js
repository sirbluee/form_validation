"use client";
import React, { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Attempt send error to server
    console.log(error);
  }, [error]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="text-red-500">Something went wrong!</h2>
      <h4 className="text-red-500">{error.message}</h4>
      <button
        onClick={reset}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Try again
      </button>
    </div>
  );
}
