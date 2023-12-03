"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { MapIcon, MountainSnow } from "lucide-react";
import useAppStore from "@/state/state";

/* Header component for displaying the header */
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const showMap = useAppStore((state) => state.showMap);
  const setShowMap = useAppStore((state) => state.setShowMap);

  return (
    <header className="p-4 text-white flex justify-between items-center bg-black">
      {/* Logo */}
      <div className="flex items-center">
        <div
          className="w-12 h-12 bg-black rounded-full flex justify-center items-center cursor-pointer border-white border-2"
          onClick={() => {
            // If not already on the /wonders page, redirect to the /wonders page
            if (pathname !== "/wonders") {
              router.push("/wonders");
            }
          }}
        >
          <MountainSnow className="w-6 h-6" />
        </div>
      </div>
      <div>
        <div
          className="w-12 h-12 bg-white text-black rounded-full flex justify-center items-center cursor-pointer border-white border-2"
          onClick={() => setShowMap(!showMap)}
        >
          <MapIcon className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
};

export default Header;
