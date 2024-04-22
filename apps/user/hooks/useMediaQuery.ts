import { useState, useEffect } from "react";

function useMediaQuery(): {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
} {
  const [isSmall, setIsSmall] = useState(false);
  const [isMedium, setIsMedium] = useState(false);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const smallQuery = window.matchMedia("(max-width: 599px)");
    const mediumQuery = window.matchMedia(
      "(min-width: 600px) and (max-width: 959px)"
    );
    const largeQuery = window.matchMedia("(min-width: 960px)");

    const handleSmallChange = (event: MediaQueryListEvent) => {
      setIsSmall(event.matches);
    };

    const handleMediumChange = (event: MediaQueryListEvent) => {
      setIsMedium(event.matches);
    };

    const handleLargeChange = (event: MediaQueryListEvent) => {
      setIsLarge(event.matches);
    };

    setIsSmall(smallQuery.matches);
    setIsMedium(mediumQuery.matches);
    setIsLarge(largeQuery.matches);

    smallQuery.addEventListener("change", handleSmallChange);
    mediumQuery.addEventListener("change", handleMediumChange);
    largeQuery.addEventListener("change", handleLargeChange);

    // Cleanup
    return () => {
      smallQuery.removeEventListener("change", handleSmallChange);
      mediumQuery.removeEventListener("change", handleMediumChange);
      largeQuery.removeEventListener("change", handleLargeChange);
    };
  }, []);

  return { isSmall, isMedium, isLarge };
}

export default useMediaQuery;
