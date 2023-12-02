"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"
import React from 'react'

export default function Page() {
  const router = useRouter();
  return (
    <div className="p-4 flex gap-2">
      <Button onClick={() => router.push("/wonders/the-great-barrier-reef")}>Link to the Great Barrier Reef</Button>
      <Button onClick={() => router.push("/wonders/the-grand-canyon")}>Link to the Grand Canyon</Button>
    </div>
  )
}
