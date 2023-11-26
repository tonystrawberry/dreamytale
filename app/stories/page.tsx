"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Pin from "@/components/pin";
import useAppStore from "@/state/state";
import { getAllStories } from "@/utils/getStories";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const mapRef = useAppStore((state) => state.mapRef);
  const stories = useAppStore((state) => state.stories);
  const setPopupInfo = useAppStore((state) => state.setPopupInfo);
  const setStories = useAppStore((state) => state.setStories);

  const onMouseEnter = (story) => {
    console.log(story.metadata.longitude, story.metadata.latitude);
    mapRef.current.flyTo({
      center: [story.metadata.longitude, story.metadata.latitude],
      zoom: 4,
      pitch: 30,
      duration: 3000,
      essential: true,
    });

    setPopupInfo(story);
  };

  // Get all the stories from the `stories` directory
  useEffect(() => {
    getAllStories().then((stories: any[]) => {
      setStories(stories);
    });
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Stories</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stories.map((story, index) => (
          <div
            key={`story-${index}`}
            className="mb-8"
            onMouseEnter={() => {
              onMouseEnter(story);
            }}
          >
            <div className="relative overflow-hidden rounded-md cursor-pointer">
              <Image
                src={story.thumbnailUrl}
                alt={story.metadata.title}
                width={250}
                height={350}
                className="object-cover transition-all hover:scale-105 aspect-[3/4] brightness-75 cursor-pointer"
                onClick={() => {
                  router.push(`/stories/${story.slug}`);
                }}
              />

              <div className="absolute w-100 bottom-2 left-2 right-2 text-white">
                <h2 className="text-md font-bold">{story.metadata.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
