"use client";

import useAppStore from "@/state/state";
import { getAllWonders } from "@/utils/getWonders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MountainSnow } from "lucide-react";
import { Story } from "@/types/types";
import { useEffect } from "react";import { Button } from "@/components/ui/button";

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
    <div className="p-4 flex gap-2">
      <Button onClick={() => router.push("/wonders/the-great-barrier-reef")}>Link to the Great Barrier Reef</Button>
      <Button onClick={() => router.push("/wonders/the-grand-canyon")}>Link to the Grand Canyon</Button>
    </div>
  )
}
