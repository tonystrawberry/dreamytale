"use client";

import { useEffect } from "react";
import Content from "./content.mdx";
import { useScrollToLocation } from "@/hooks/useScrollToLocation";

export default function Page() {
  useScrollToLocation();

  return (
    <div className="relative scroll-smooth">
      <Content />
    </div>
  )
}
