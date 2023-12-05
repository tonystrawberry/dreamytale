import React from "react";
import Image from "next/image";
import { Wonder } from "@/types/types";
import { Eye } from "lucide-react";

export default function Card({ wonder, viewsCount, onMouseEnter, onClick }: { wonder: Wonder, viewsCount: number, onMouseEnter: () => void, onClick: () => void }) {
  return (
    <div
      key={wonder.slug}
      className="mb-8"
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-md cursor-pointer aspect-square">
        <Image
          src={wonder.thumbnailUrl}
          alt={wonder.metadata.name}
          fill
          className="object-cover transition-all hover:scale-105 aspect-square brightness-90 cursor-pointer"
        />

        <div className="absolute w-100 bottom-2 left-2 right-2 text-white">
          <h2 className="text-md font-semibold">{wonder.metadata.name}</h2>
        </div>

        <div className="flex gap-1 items-center absolute w-100 top-2 right-2 text-white">
          <Eye className="w-3 h-3" />

          <span className="font-bold text-xs">{viewsCount || 0}</span>
        </div>
      </div>
    </div>
  );
}
