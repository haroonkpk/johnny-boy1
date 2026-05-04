'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div
      className="
        fixed 
        w-5 h-5 
        border-2 border-white 
        rounded-full 
        pointer-events-none 
        z-[9999]
        -translate-x-1/2 -translate-y-1/2
      "
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}