import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { MapRef } from "react-map-gl"
import { MutableRefObject } from "react"

interface AppState {
  wonders: any[],
  mapRef: MutableRefObject<MapRef | undefined> | null,
  popupInfo: any,
  showMap: boolean,
  viewsCountBySlug: Record<string, number>,
  setMapRef: (mapRef: MutableRefObject<MapRef | undefined>) => void,
  setPopupInfo: (popupInfo: any) => void,
  setWonders: (wonders: any[]) => void,
  setShowMap: (showMap: boolean) => void,
  initializeViewsCountBySlug: (viewsCountBySlug: Record<string, number>) => void,
  setViewsCountBySlug: (slug: string, viewsCount: number) => void,
}

const useAppStore = create<AppState>((set) => ({
  wonders: [],
  mapRef: null,
  popupInfo: null,
  showMap: true,
  viewsCountBySlug: {},
  setMapRef: (mapRef: MutableRefObject<MapRef | undefined>) => set({ mapRef }),
  setPopupInfo: (popupInfo: any) => set({ popupInfo }),
  setWonders: (wonders: any[]) => set({ wonders }),
  setShowMap: (showMap: boolean) => set({ showMap }),
  initializeViewsCountBySlug: (viewsCountBySlug: Record<string, number>) => set({ viewsCountBySlug }),
  setViewsCountBySlug: (slug: string, viewsCount: number) => set((state) => ({ viewsCountBySlug: { ...state.viewsCountBySlug, [slug]: viewsCount } })),
}))

export default useAppStore;
