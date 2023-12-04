import { MapPin } from "lucide-react"
import React from 'react'

export function Location({ location }: { location: string }) {
  return (
    <div className="my-4">
      <div className="flex items-center gap-1">
        <MapPin className="inline-block text-black w-5 h-5" />
        <span className="tracking-tighter">{location}</span>
      </div>
    </div>
  )
}
