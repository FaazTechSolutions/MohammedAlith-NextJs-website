// app/not-found.tsx
import React from "react";

interface NotFoundProps {
  is404?: boolean;
}

export default function NotFound({ is404 }: NotFoundProps) {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-lg text-gray-500">
          {is404 ? "Page not found" : "Something went wrong"}
        </p>
      </div>
    </div>
  );
}
