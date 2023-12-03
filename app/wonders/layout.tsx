"use client";

import Pin from "@/components/pin";
import useAppStore from "@/state/state";

import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  MapRef
} from "react-map-gl";
import { useState, useRef, useEffect, MutableRefObject } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Layout({ children }: { children: React.ReactNode }) {
  const mapRef = useRef<MapRef | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Global state of the application
  const popupInfo = useAppStore((state) => state.popupInfo);
  const wonders = useAppStore((state) => state.wonders);

  const setPopupInfo = useAppStore((state) => state.setPopupInfo);
  const setMapRef = useAppStore((state) => state.setMapRef);

  setMapRef(mapRef as MutableRefObject<MapRef>);

  // Local state of the component to store the pins
  const [pins, setPins] = useState<JSX.Element[]>([]);

  // Set the Pins on the map
  // This is a side effect that will run every time the `wonders` change
  useEffect(() => {
    const pins = wonders.map((story, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={story.metadata.longitude}
        latitude={story.metadata.latitude}
        anchor="center"
        onClick={(e) => {
          if (!mapRef || !mapRef.current) return;

          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation();
          setPopupInfo(story);

          mapRef.current.flyTo({
            center: [story.metadata.longitude, story.metadata.latitude],
            zoom: 4,
            pitch: 30,
            duration: 3000,
            essential: true,
          });
        }}
      >
        <Pin />
      </Marker>
    ));

    setPins(pins);
  }, [mapRef, wonders, setPopupInfo]);

  return (
    <main className="h-[calc(100vh-80px)] flex">
      <div className="basis-1/2">
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: 40,
            longitude: -100,
            zoom: 3.5,
            bearing: 0,
            pitch: 0,
          }}
          mapStyle="mapbox://styles/tonystrawberry/clp5kkwiu00gb01of5iaa9cnv"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />

          {pins}

          {popupInfo && (
            <Popup
              anchor="bottom"
              offset={20}
              className="cursor-pointer"
              longitude={Number(popupInfo.metadata.longitude)}
              latitude={Number(popupInfo.metadata.latitude)}
              onClose={() => setPopupInfo(null)}
            >
              <div
                onClick={(e) => {
                  // Go to the story page
                  e.stopPropagation();
                  router.push(`/wonders/${popupInfo.slug}`);
                }}
              >
                <div className="absolute top-0 left-0 right-0 bottom-0 w-100 h-100 z-1 bg-gradient-to-b from-transparent to-black opacity-40"></div>
                <div className="absolute w-100 bottom-2 left-2 right-2 text-white">
                  <h2 className="text-md font-semibold">{popupInfo.metadata.name}</h2>
                </div>

                <Image className="object-cover" width={180} height={180} alt={`${popupInfo.slug}`} src={popupInfo.thumbnailUrl} />
              </div>
            </Popup>
          )}
        </Map>
      </div>
      <AnimatePresence>
        <motion.div
          className={`basis-1/2 overflow-y-scroll bg-white`}
          key={pathname}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          variants={{
            initialState: {
              opacity: 0,
            },
            animateState: {
              opacity: 1,
              transition: {
                duration: 1.5,
              },
            },
            exitState: {
              opacity: 0,
              transition: {
                duration: 0,
              },
            },
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
