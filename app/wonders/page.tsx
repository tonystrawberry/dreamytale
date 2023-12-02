"use client";

import useAppStore from "@/state/state";
import { getAllWonders } from "@/utils/getWonders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MountainSnow } from "lucide-react";
import { Story } from "@/types/types";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const mapRef = useAppStore((state) => state.mapRef);
  const wonders = useAppStore((state) => state.wonders);
  const setPopupInfo = useAppStore((state) => state.setPopupInfo);
  const setWonders = useAppStore((state) => state.setWonders);

  // When the user hovers over a story, fly to the location on the map
  // by using `flyTo` method of mapbox-gl-js (https://docs.mapbox.com/mapbox-gl-js/example/flyto-options/)
  const onMouseEnter = (story: Story) => {
    if (!mapRef || !mapRef.current) return;

    mapRef.current.flyTo({
      center: [story.metadata.longitude, story.metadata.latitude],
      zoom: 4,
      pitch: 30,
      duration: 3000,
      essential: true,
    });

    setPopupInfo(story);
  };

  // Get all the wonders from the `wonders` directory
  // and set them in the state
  useEffect(() => {
    getAllWonders().then((wonders: any[]) => {
      setWonders(wonders);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-8 antialiased">
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-bold">Natural Wonders</h1>
        <MountainSnow className="w-8 h-8" />
      </div>
      <div className="mb-4 text-lg text-muted-foreground">Discover the most beautiful places of the world and ignite your wanderlust like never before.</div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {wonders.map((story, index) => (
          <div
            key={story.slug}
            className="mb-8"
            onMouseEnter={() => {
              onMouseEnter(story);
            }}
            onClick={() => {
              router.push(`/wonders/${story.slug}`);
            }}
          >
            <div className="relative overflow-hidden rounded-md cursor-pointer aspect-square">
              <Image
                src={story.thumbnailUrl}
                alt={story.metadata.title}
                fill
                className="object-cover transition-all hover:scale-105 aspect-square brightness-90 cursor-pointer"
              />

              <div className="absolute w-100 bottom-2 left-2 right-2 text-white">
                <h2 className="text-md font-semibold">{story.metadata.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
