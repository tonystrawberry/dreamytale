import React from 'react'

/* Description component for displaying description in an article */
export function Description({ description } : { description: string }) {
  return (
    <div className="flex flex-wrap gap-1 mb-4 text-lg text-muted-foreground">
      {description}
    </div>
  )
}
