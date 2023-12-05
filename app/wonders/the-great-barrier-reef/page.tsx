"use client";

import Content from "./content.mdx";

import { useIncrementViewsCount } from "@/hooks/useIncrementViewsCount";
import { useScrollToLocation } from "@/hooks/useScrollToLocation";

export default function Page() {
  useScrollToLocation();
  useIncrementViewsCount();

  return (
    <div className="relative">
      <Content />
    </div>
  )
}
