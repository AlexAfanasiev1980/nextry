"use client";

import { useEffect, useState } from "react";

interface IPosition {
  count: number;
  currentIndex?: number;
}

export default function usePosition({ count, currentIndex = 0 }: IPosition) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setPosition((100 / count) * currentIndex);
  }, [count, currentIndex]);

  return {
    position,
  };
}
