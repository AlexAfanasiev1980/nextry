'use client'

import React, { useState, useEffect } from "react";

interface ITimer {
   time: number;
   onTimerComplete: () => void;
   textAfterTimeOff: string;
}

export function Timer({ time, onTimerComplete, textAfterTimeOff }: ITimer) {
  const [seconds, setSeconds] = useState(60);
  const [timerCompleted, setTimerCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, time);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      setTimerCompleted(true);
      onTimerComplete();
    }
  }, [seconds, onTimerComplete]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {timerCompleted ? (
        <span>{textAfterTimeOff}</span>
      ) : (
        <span>{formatTime(seconds)}</span>
      )}
    </div>
  );
}