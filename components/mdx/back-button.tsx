"use client";

import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

/* BackButton component for displaying a back button navigating to the home page */
export function BackButton() {
  const router = useRouter();

  // https://stackoverflow.com/a/40459794/22843730
  return (
    <div className="absolute top-6 left-6">
      <div
        className="fixed flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg cursor-pointer"
        onClick={() => router.push("/wonders")}
      >
        <Undo2 className="w-4 h-4 text-black" />
      </div>
    </div>
  );
}
