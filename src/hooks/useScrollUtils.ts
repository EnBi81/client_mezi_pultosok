// noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction

import { useRef, useState } from 'react';

export const useScrollUtils = ({ type, thresholdTopScroll }: { type: 'flatlist'; thresholdTopScroll: number }) => {
  const ref = useRef();
  const [isScrollOverThreshold, setIsScrollOverThreshold] = useState(false);

  const scrollToTop = (smooth: boolean = true) => {
    if (type === 'flatlist') {
      ref.current.scrollToOffset({ offset: 0, animated: smooth });
    }
  };

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (currentScrollY > thresholdTopScroll) {
      setIsScrollOverThreshold(true);
    } else if (currentScrollY <= thresholdTopScroll) {
      setIsScrollOverThreshold(false);
    }
  };

  return { ref: ref, scrollToTop, handleScroll, isScrollOverThreshold };
};
