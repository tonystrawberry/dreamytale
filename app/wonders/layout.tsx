"use client";

import Pin from "@/components/pin";
import useAppStore from "@/state/state";

import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  MapRef
} from "react-map-gl";
import { useState, useRef, useEffect, MutableRefObject, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import "mapbox-gl/dist/mapbox-gl.css";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import { getAllWonders } from "@/utils/getWonders";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      { children }
    </LayoutRouterContext.Provider>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const mapRef = useRef<MapRef | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Global state of the application
  const popupInfo = useAppStore((state) => state.popupInfo);
  const wonders = useAppStore((state) => state.wonders);
  const showMap = useAppStore((state) => state.showMap);

  const setWonders = useAppStore((state) => state.setWonders);
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
            zoom: 2.5,
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

  // Get all the wonders from the `wonders` directory
  // and set them in the state
  useEffect(() => {
    getAllWonders().then((wonders: any[]) => {
      setWonders(wonders);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <main className="h-[calc(100vh-80px)] flex flex-col md:flex-row">

      <div
        className={classNames({
          "basis-1/3 md:basis-1/2": true,
          "hidden": !showMap,
        })}
      >
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: 46.2276,
            longitude: 2.2137,
            zoom: 0,
            bearing: 0,
            pitch: 0,
          }}
          mapStyle="mapbox://styles/tonystrawberry/clp5kkwiu00gb01of5iaa9cnv"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <GeolocateControl position="top-left" fitBoundsOptions={{ maxZoom: 5 }}/>
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
      <div
        className={classNames({
          "overflow-y-scroll bg-white": true,
          "basis-2/3 md:basis-1/2": showMap,
          "basis-3/3 md:basis-2/2": !showMap,
        })}
      >
      {/* TODO: Make AnimatePresence work (https://github.com/vercel/next.js/issues/49279#issuecomment-1541939624) */}
      <AnimatePresence>
        <motion.div
          className={`basis-1/2 bg-white`}
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
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
      </div>
    </main>
  );
}
