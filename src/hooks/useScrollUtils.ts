// noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction

import { useRef, useState } from 'react';

export const useScrollUtils = ({ type, thresholdTopScroll }: { type: 'flatlist'; thresholdTopScroll: number }) => {
  const ref = useRef();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingDownAndOverThreshold, setIsScrollingDownAndOverThreshold] = useState(false);

  const scrollToTop = (smooth: boolean = true) => {
    if (type === 'flatlist') {
      ref.current.scrollToOffset({
        offset: 0,
        animated: smooth,
      });
    }
  };

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (currentScrollY < lastScrollY && currentScrollY > thresholdTopScroll) {
      // User is scrolling up and has scrolled more than thresholdTopScroll pixels
      setIsScrollingDownAndOverThreshold(true);
    } else if (currentScrollY >= lastScrollY || currentScrollY <= thresholdTopScroll) {
      // User is scrolling down or hasn't scrolled past thresholdTopScroll pixels
      setIsScrollingDownAndOverThreshold(false);
    }
    setLastScrollY(currentScrollY);
  };

  return { ref: ref, scrollToTop, handleScroll, isScrollingDownAndOverThreshold };
};
