"use client";

import { LibraryBig } from "lucide-react";
import { useRouter } from "next/navigation";

/* BackButton component for displaying a back button navigating to the home page */
export function BackButton() {
  const router = useRouter();

  return (
    <div className="absolute bottom-12 right-12">
      <div
        className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg cursor-pointer"
        onClick={() => router.push("/wonders")}
      >
        <LibraryBig className="w-6 h-6 text-black" />
      </div>
    </div>
  );
}
