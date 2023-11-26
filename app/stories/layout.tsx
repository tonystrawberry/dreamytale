"use client";

import Pin from "@/components/pin";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { MapRef } from "react-map-gl";
import useAppStore from "@/state/state";
import styles from "./styles.module.scss";

import "mapbox-gl/dist/mapbox-gl.css";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const popupInfo = useAppStore((state) => state.popupInfo);
  const setPopupInfo = useAppStore((state) => state.setPopupInfo);
  const setMapRef = useAppStore((state) => state.setMapRef);
  const mapRef = useRef<MapRef>();
  const stories = useAppStore((state) => state.stories);
  const [pins, setPins] = useState<JSX.Element[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  setMapRef(mapRef);

  const onMapLoad = useCallback(() => {}, []);

  useEffect(() => {
    const pins = stories.map((story, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={story.metadata.longitude}
        latitude={story.metadata.latitude}
        anchor="center"
        onClick={(e) => {
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
  }, [stories]);

  return (
    <html lang="en">
      <body>
        <main className="h-screen flex">
          <div className="basis-1/2">
            <Map
              ref={mapRef}
              onLoad={onMapLoad}
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
                      router.push(`/stories/${popupInfo.slug}`);
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 bottom-0 w-100 h-100 z-1 bg-gradient-to-b from-transparent to-black opacity-40"></div>
                    <div className="absolute left-4 top-4 text-white text-sm drop-shadow tracking-wide uppercase">
                      {popupInfo.city}
                    </div>
                    <div className="absolute left-4 bottom-4 text-white text-sm drop-shadow tracking-wide uppercase">
                      {popupInfo.city}
                    </div>

                    <img
                      className="w-[180px] h-[180px] object-cover"
                      src={popupInfo.thumbnailUrl}
                    />
                  </div>
                </Popup>
              )}
            </Map>
          </div>
          <AnimatePresence mode="wait" >
            <motion.div
              className={`basis-1/2 p-14 overflow-y-scroll bg-white`}
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
      </body>
    </html>
  );
}
