import getUrl from "@/lib/getUrl";
import { Link, Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { SocialIcon } from "react-social-icons";
import { useToast } from "@/components/ui/use-toast";
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  RedditShareButton,
  RedditIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share';

/* Tags component for displaying tags in an article */
export function Socials() {
  const pathname = usePathname();
  const url = getUrl(pathname);
  const { toast } = useToast();

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(url);

    toast({
      title: "Link copied to clipboard.",
      description: "You can now share this link with your friends 🎉",
      duration: 3000
    });
  };

  return (
    <div className="text-center my-12 p-6 rounded-lg bg-[#f6f6f7]">
      <div className="flex justify-center items-center flex-wrap gap-2 mb-4">
        <h4 className="text-2xl font-bold tracking-tighter">Share this post</h4>
        <Share2 className="w-5 h-5" />
      </div>
      <div className="flex justify-center flex-wrap gap-2">
        <div
          className="flex items-center justify-center w-8 h-8 bg-lime-600 rounded-full border-black border- cursor-pointer"
          onClick={copyLinkToClipboard}
        >
          <Link className="w-4 h-4 text-white" />
        </div>

        <FacebookShareButton url={url}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <LineShareButton url={url}>
          <LineIcon size={32} round />
        </LineShareButton>

        <RedditShareButton url={url}>
          <RedditIcon size={32} round />
        </RedditShareButton>

        <LinkedinShareButton url={url}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>

        <TwitterShareButton url={url}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
    </div>
  );
}
