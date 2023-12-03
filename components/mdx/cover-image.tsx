import React from 'react'
import Image from 'next/image'

/* CoverImage component for displaying cover image in an article */
export function CoverImage({ alt, src } : { alt: string, src: string }) {
  return (
    <div className="relative w-full h-40 md:h-80 overflow-hidden">
      <Image alt={alt} src={src} fill className="object-cover" />
    </div>
  )
}
