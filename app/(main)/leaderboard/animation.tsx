"use client"
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottieAnimation = ({ animationData }:any) => {
  const animationContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      //@ts-ignore
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => anim.destroy(); // Cleanup on unmount
  }, [animationData]);

  return <div ref={animationContainer}></div>;
};

export default LottieAnimation;
