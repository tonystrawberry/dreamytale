"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Pin from "@/components/pin";
import useAppStore from "@/state/state";
import { getAllStories } from "@/utils/getStories";

export default function Home() {
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
  }

  // Get all the stories from the `stories` directory
  useEffect(() => {
    getAllStories().then((stories: any[]) => {
      console.log(stories)
      setStories(stories);
    }
  )}, [])

  return (
    <>
      { stories.map((story, index) => (
        <div key={`story-${index}`} className="mb-8" onMouseEnter={() => { onMouseEnter(story)}}>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 mr-4"></div>
            <div className="text-gray-500 text-sm">{story.metadata.name}</div>
          </div>
        </div>
      ))}

      {/* <div className="rounded overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      </div>
      <div className="mt-8">
        <h1 className="text-4xl font-bold mb-2">{story?.city}</h1>
        <p className="text-gray-500">
          In the kingdom of Lumina, nestled amidst rolling hills and enchanted
          forests, there lived a young weaver named Elara. Her nimble fingers
          spun threads of shimmering stardust into the most exquisite
          tapestries, each imbued with a touch of magic that brought joy to
          all who beheld them. Yet, Elara harbored a secret longing—to weave a
          tapestry that would grant the kingdom eternal light.
        </p>

        <div className="mt-8">
          Once upon a time, in the radiant kingdom of Lumina, there dwelled a
          weaver named Elara. Her deft hands spun tales of wonder with threads
          of stardust, crafting tapestries that adorned the halls of the
          king's palace and brought delight to all who gazed upon them. But
          amidst her creations, Elara harbored a dream—a tapestry that would
          illuminate the kingdom forever. Legend whispered of the Celestial
          Loom hidden within the Heart of the Everglow Forest, where stars
          coalesced into threads of pure radiance. Determined to weave the
          fabled tapestry, Elara embarked on a quest, guided by the wisdom of
          ancient tomes and her unwavering spirit. Through enchanted woods and
          across glistening rivers, she journeyed, encountering mystical
          creatures and overcoming trials. Along the way, she befriended a
          mischievous fox named Astra, whose twinkling eyes held the secrets
          of the night sky. At last, within the Heart of the Everglow Forest,
          Elara found the Celestial Loom, aglow with a myriad of starlight.
          With Astra by her side, she carefully wove strands of celestial
          brilliance, her fingers dancing in harmony with the cosmic threads.
          As the tapestry took shape, the forest shimmered with an
          otherworldly glow. Stars intertwined, forming constellations that
          depicted tales of courage, love, and hope. Each stitch held the
          essence of Lumina's spirit, radiating a gentle luminescence that
          illuminated the darkest corners of the realm. At the completion of
          her masterpiece, Elara presented the tapestry to the king. As it
          unfurled before the court, a soft, ethereal light bathed the
          kingdom. Night and day became one, casting away shadows and filling
          hearts with boundless warmth. Lumina flourished under the
          everlasting light, and Elara's name echoed through the ages as the
          Star Weaver—the one whose gift graced the kingdom with eternal
          radiance. Astra, now a constellation in the night sky, twinkled
          proudly, a reminder of the enduring bond between a weaver and her
          celestial companion. And so, in the kingdom of Lumina, the legacy of
          Elara, the Star Weaver, lived on—a testament to the power of dreams
          woven with threads of hope and love.
        </div>
      </div> */}
    </>
  );
}
