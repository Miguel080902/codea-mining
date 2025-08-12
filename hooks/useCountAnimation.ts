import { useEffect, useState } from 'react';

interface UseCountAnimationProps {
  target: number;
  duration?: number;
  isVisible?: boolean;
}

export const useCountAnimation = ({ 
  target, 
  duration = 2000, 
  isVisible = true 
}: UseCountAnimationProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const start = 0;
    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function para una animación más suave
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);
      
      setCount(current);
      
      if (progress >= 1) {
        clearInterval(timer);
        setCount(target);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [target, duration, isVisible]);

  return count;
};