import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const isClient = typeof window === 'object';

    if (isClient) {
      const mediaQueryList = window.matchMedia(query);
      
      setMatches(mediaQueryList.matches);

      const handleMatchesChange = () => {
        setMatches(mediaQueryList.matches);
      };

      mediaQueryList.addListener(handleMatchesChange);

      return () => {
        mediaQueryList.removeListener(handleMatchesChange);
      };
    }
  }, [query]);

  return matches;
};

export default useMediaQuery;

//   const isLargeDesktop = useMediaQuery("(min-width: 1440px)");
//   const isDesktop = useMediaQuery("(min-width: 1024px)");
//   const isTablet = useMediaQuery("(min-width: 768px)");
//   const isMobileLandscape = useMediaQuery("(min-width: 480px)");
//   const isMobile = useMediaQuery("(min-width: 320px)");