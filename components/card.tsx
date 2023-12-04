import React from "react";
import Image from "next/image";
import { Wonder } from "@/types/types";

export default function Card({ wonder, onMouseEnter, onClick }: { wonder: Wonder, onMouseEnter: () => void, onClick: () => void }) {
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
      </div>
    </div>
  );
}
