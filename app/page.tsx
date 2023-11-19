"use client";

import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import TALES from "./data/tales.json";
import { useState, useMemo } from "react";
import Pin from "@/components/pin";
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {
  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () =>
      TALES.map((tale, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={tale.longitude}
          latitude={tale.latitude}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(tale);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <main className="h-screen flex">
      <div className="basis-1/2">
        <Map
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
              anchor="top"
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                {popupInfo.city}, {popupInfo.state} |{" "}
                <a
                  target="_new"
                  href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                >
                  Wikipedia
                </a>
              </div>
              <img width="100%" src={popupInfo.image} />
            </Popup>
          )}
        </Map>
      </div>
      <div className="basis-1/2 bg-white p-16 overflow-y-scroll">
        <div className="rounded overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        </div>
        <div className="mt-8">
          <h1 className="text-4xl font-bold mb-2">The Star Weaver's Gift</h1>
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
        </div>
      </div>
    </main>
  );
}
