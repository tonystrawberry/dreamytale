import { Wonder } from "@/types/types";
import { getWondersByTag } from "@/lib/getWonders";
import { Heart } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import Card from "@/components/card";
import useAppStore from "@/state/state";

/* Related Wonders components for displaying wonders card at the bottom of an article */
export function RelatedWonders({ tags }: { tags: string[] }) {
  const pathname = usePathname();
  const router = useRouter();

  const mapRef = useAppStore((state) => state.mapRef);

  const [relatedWonders, setRelatedWonders] = useState<Wonder[]>([]);

  // Get all the wonders with the same tag as the current wonder
  // and set them in the state
  useEffect(() => {
    (async() => {
      let relatedWonders = [] as Wonder[];

      // Get current path name (last part only)
      const currentSlug = pathname.split("/").pop();

      // Use map to create an array of promises
      const promises = tags.map(async (tag) => {
        const wonders = await getWondersByTag(tag);
        return wonders.filter((wonder) => wonder.slug !== currentSlug);
      });

      // Await all promises to resolve
      const wonderArrays = await Promise.all(promises);

      // Merge all wonder arrays into a single array
      relatedWonders = relatedWonders.concat(...wonderArrays);

      // Remove duplicates
      relatedWonders = relatedWonders.filter((wonder, index, self) =>
        index === self.findIndex((w) => w.slug === wonder.slug)
      );

      setRelatedWonders(relatedWonders);
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="my-12">
      <div className="flex items-center flex-wrap gap-2 mb-4">
        <h4 className="text-2xl font-bold tracking-tighter">You might like</h4>
        <Heart className="w-5 h-5 text-red-600" fill="#dc2626"  />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {relatedWonders.map((wonder) => (
          <Card
            key={wonder.slug}
            wonder={wonder}
            onMouseEnter={() => {}}
            onClick={() => {
              router.push(`/wonders/${wonder.slug}`);

              if (!mapRef || !mapRef.current) return;

              if (!mapRef || !mapRef.current) return;

              mapRef.current.flyTo({
                center: [wonder.metadata.longitude, wonder.metadata.latitude],
                zoom: 4,
                pitch: 30,
                duration: 3000,
                essential: true,
              });
            }}
            viewsCount={0} // TODO: get views count from firestore
          />
        ))}
      </div>
    </div>

  )
}
