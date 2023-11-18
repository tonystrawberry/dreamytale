"use client";

import Map from 'react-map-gl';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Map
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5
        }}
        style={{width: 600, height: 400}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      />
    </main>
  )
}
