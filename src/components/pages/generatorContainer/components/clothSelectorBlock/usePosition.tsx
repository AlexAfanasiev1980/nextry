"use client";

import { useEffect, useState } from "react";

interface IPosition {
  count: number;
  currentIndex: number;
}

export default function usePosition({ count, currentIndex }: IPosition) {
  const [position, setPosition] = useState((100 / count) * currentIndex);

  useEffect(() => {
    setPosition((100 / count) * currentIndex);
  }, [count, currentIndex]);

  return {
    position,
  };
}
