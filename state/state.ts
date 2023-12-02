import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { MapRef } from "react-map-gl"
import { MutableRefObject } from "react"

interface AppState {
  wonders: any[],
  mapRef: MutableRefObject<MapRef | undefined> | null,
  popupInfo: any,
  setMapRef: (mapRef: MutableRefObject<MapRef | undefined>) => void,
  setPopupInfo: (popupInfo: any) => void,
  setWonders: (wonders: any[]) => void,
}

const useAppStore = create<AppState>((set) => ({
  wonders: [],
  mapRef: null,
  popupInfo: null,
  setMapRef: (mapRef: MutableRefObject<MapRef | undefined>) => set({ mapRef }),
  setPopupInfo: (popupInfo: any) => set({ popupInfo }),
  setWonders: (wonders: any[]) => set({ wonders }),

}))

export default useAppStore;
