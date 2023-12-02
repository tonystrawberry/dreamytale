import React from 'react'
import { Badge } from "@/components/ui/badge"
import type { Tag } from "@/types/types"

/* Tags component for displaying tags in an article */
export function Tags({ tags }: { tags: Tag[] }) {
  return (
    <div className="flex flex-wrap gap-1 mb-4">
      {tags.map((tag) => (
        <Badge key={tag.name} className="text-sm font-normal">
          {tag.name}
        </Badge>
      ))}
    </div>
  )
}
