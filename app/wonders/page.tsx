"use client";

import useAppStore from "@/state/state";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MountainSnow } from "lucide-react";
import { Wonder } from "@/types/types";
import Card from "@/components/card";
import { app } from "@/app/firebase";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const mapRef = useAppStore((state) => state.mapRef);
  const wonders = useAppStore((state) => state.wonders);
  const viewsCountBySlug = useAppStore((state) => state.viewsCountBySlug);
  const setPopupInfo = useAppStore((state) => state.setPopupInfo);
  const initializeViewsCountBySlug = useAppStore((state) => state.initializeViewsCountBySlug);

  // Initialize the Firebase Firestore database
  const db = getFirestore(app);

  // When the user hovers over a story, fly to the location on the map
  // by using `flyTo` method of mapbox-gl-js (https://docs.mapbox.com/mapbox-gl-js/example/flyto-options/)
  const onMouseEnter = (wonder: Wonder) => {
    if (!mapRef || !mapRef.current) return;

    mapRef.current.flyTo({
      center: [wonder.metadata.longitude, wonder.metadata.latitude],
      zoom: 4,
      pitch: 30,
      duration: 3000,
      essential: true,
    });

    setPopupInfo(wonder);
  };

  // Initialize the views count for each wonder
  useEffect(() => {
    async function getViewsCount() {
      const viewsCountBySlug = {} as Record<string, number>;

      // Get all documents of the `pages` collection
      const querySnapshot = await getDocs(collection(db, "pages"));
      querySnapshot.forEach((doc) => {
        const slug = doc.id;
        const viewsCount = doc.data().viewsCount as number;
        viewsCountBySlug[slug] = viewsCount;
      });

      initializeViewsCountBySlug(viewsCountBySlug);
    }

    getViewsCount();
  }, []);

  return (
    <div className="p-8 antialiased">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Natural Wonders</h1>
        <MountainSnow className="w-8 h-8" />
      </div>
      <div className="mb-4 text-md text-muted-foreground">Discover the most beautiful places of the world and ignite your wanderlust like never before.</div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {wonders.map((wonder) => (
          <Card
            key={wonder.slug}
            wonder={wonder}
            onMouseEnter={() => {
              onMouseEnter(wonder);
            }}
            onClick={() => {
              router.push(`/wonders/${wonder.slug}`);

              if (!mapRef || !mapRef.current) return;

              mapRef.current.flyTo({
                center: [wonder.metadata.longitude, wonder.metadata.latitude],
                zoom: 4,
                pitch: 30,
                duration: 3000,
                essential: true,
              });
            }}
            viewsCount={viewsCountBySlug[wonder.slug]}
          />
        ))}
      </div>
    </div>
  );
}
