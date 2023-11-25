"use client";

import { LibraryBig } from "lucide-react";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  return (
    <div className="absolute bottom-12 right-12">
      {/* Round circle with icon in it */}
      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg cursor-pointer">
        <LibraryBig
          className="w-6 h-6 text-black"
          onClick={() => router.push("/stories")}
        />
      </div>
    </div>
  );
}

export default BackButton;
