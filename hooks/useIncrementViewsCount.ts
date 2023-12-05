'use client';

import { app } from "@/app/firebase";
import { getFirestore, doc, updateDoc, increment, getDoc, setDoc } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* Hook for incrementing the views count for a given slug. */
export const useIncrementViewsCount = () => {
  const pathname = usePathname();
  const db = getFirestore(app);

  // Increment the views count for the current page
  useEffect(() => {
    async function incrementViewsCount() {
      const slug = pathname.split("/").pop() as string;

      const docRef = doc(db, "pages", slug);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, { viewsCount: 1 });
      } else {
        await updateDoc(docRef, {
          viewsCount: increment(1),
        });
      }
    }

    incrementViewsCount();
  }, []);
};
