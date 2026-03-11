import { useState, useEffect } from "react";

function useIsSm() {
  const [isBig, setIsBig] = useState(() => {
    return typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    // Listener for changes
    function handler(event: MediaQueryListEvent) {
      setIsBig(event.matches);
    }

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isBig;
}

export default useIsSm;
