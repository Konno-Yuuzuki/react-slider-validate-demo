import { useMemo } from 'react';



const useHollowPosition = (width: number, height: number, sliderLength: number, radius: number) => {
  const position = useMemo(() => {
    const rate = 0.333
    const x = Math.random() * (width - sliderLength - radius - width * rate) + width * rate;
    const y = Math.random() * (height - sliderLength - radius);
    return { x, y };
  }, [width, height, sliderLength])

  return { x: position.x, y: position.y }
}

export default useHollowPosition