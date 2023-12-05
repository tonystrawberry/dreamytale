'use client';

import { useRef, useEffect } from "react";

/* Hook for scrolling to a location on the page based on the hash in the URL. */
export const useScrollToLocation = () => {
  const scrolledRef = useRef(false);
  const hash = (typeof window !== 'undefined' ? window.location.hash : null);
  const hashRef = useRef(hash);

  useEffect(() => {
    if (hash) {
      // We want to reset if the hash has changed
      if (hashRef.current !== hash) {
        hashRef.current = hash;
        scrolledRef.current = false;
      }

      // only attempt to scroll if we haven't yet (this could have just reset above if hash changed)
      if (!scrolledRef.current) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          scrolledRef.current = true;
        }
      }
    }
  });
};
