import { Link, Share2 } from "lucide-react"
import React from 'react'
import { SocialIcon } from "react-social-icons"

/* Tags component for displaying tags in an article */
export function Socials() {
  return (
    <div className="text-center my-12 p-6 rounded-lg bg-[#f6f6f7]">
      <div className="flex justify-center items-center flex-wrap gap-2 mb-4">
        <h4 className="text-2xl font-bold tracking-tighter">Share this post</h4>
        <Share2 className="w-5 h-5" />
      </div>
      <div className="flex justify-center flex-wrap gap-2">
        <div className="flex items-center justify-center w-8 h-8 bg-lime-600 rounded-full border-black border- cursor-pointer">
          <Link className="w-4 h-4 text-white" />
        </div>
        <SocialIcon network="facebook" style={{ height: 30, width: 30 }} />
        <SocialIcon network="x" style={{ height: 30, width: 30 }} />
        <SocialIcon network="linkedin" style={{ height: 30, width: 30 }} />
        <SocialIcon network="reddit" style={{ height: 30, width: 30 }} />
      </div>
    </div>
  )
}
