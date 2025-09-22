import { useEffect, useState } from "react";

// Counter props interface
interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  visible: boolean;
}

export default function Counter({ target, duration = 2000, suffix = "", visible }: CounterProps) {
  // State variable for counter's initial value
  const [count, setCount] = useState(0);

  // Counter effect handler
  useEffect(() => {
    if (!visible) {
      setCount(0);
      return;
    }

    const increment = target / (duration / 30);
    const interval = setInterval(() => {
      setCount(prev => {
        const next = prev + increment;
        if (next >= target) {
          clearInterval(interval);
          return target;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [target, duration, visible]);

  return (
    <span>
      {Math.floor(count).toLocaleString()}{suffix}
    </span>
  );
}