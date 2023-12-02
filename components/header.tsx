"use client";

import React from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  MountainSnow
} from "lucide-react"

/* Header component for displaying the header */
const Header = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <header className="p-4 text-white flex justify-between items-center bg-black">
      {/* Logo */}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-black rounded-full flex justify-center items-center cursor-pointer border-white border-2" onClick={() => {
            // If not already on the /cards page, redirect to the /cards page
            if (pathname !== "/cards") {
              router.push("/cards")
            }
          }
        }>
          <MountainSnow className="w-6 h-6" />
        </div>
      </div>
    </header>
  )
}

export default Header
