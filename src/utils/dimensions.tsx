import { useEffect, useMemo, useState } from "react";

export const useCalcDimensions = (usedHeight?: number, usedWidth?: number) => {
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // useEffect to update the state when the window size changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowHeight(window?.innerHeight);
        setWindowWidth(window?.innerWidth);
      };

      // Add the event listener
      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // useMemo to calculate the value of maxHeight and maxWidth only when windowHeight or windowWidth changes
  const height = useMemo(() => {
    return windowHeight - (usedHeight || 0);
  }, [windowHeight, usedHeight]);

  const width = useMemo(() => {
    return windowWidth - (usedWidth || 0);
  }, [windowWidth, usedWidth]);

  return { height, width };
};
