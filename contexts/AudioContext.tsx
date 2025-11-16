"use client";

import React, { createContext, useContext, useRef, useState, ReactNode } from "react";

interface AudioContextType {
  currentAudioId: string | null;
  setCurrentAudio: (audio: HTMLAudioElement | null, audioId: string | null, onStop?: () => void) => void;
  stopCurrentAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const onStopCallbackRef = useRef<(() => void) | null>(null);
  const [currentAudioId, setCurrentAudioId] = useState<string | null>(null);

  const setCurrentAudio = (audio: HTMLAudioElement | null, audioId: string | null, onStop?: () => void) => {
    // If setting the same audio, don't do anything
    if (audio && currentAudioRef.current === audio && currentAudioId === audioId) {
      return;
    }
    
    // Stop previous audio if exists and it's different
    if (currentAudioRef.current && currentAudioRef.current !== audio && currentAudioId !== audioId) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      if (onStopCallbackRef.current) {
        onStopCallbackRef.current();
      }
    }
    
    currentAudioRef.current = audio;
    onStopCallbackRef.current = onStop || null;
    setCurrentAudioId(audioId);
  };

  const stopCurrentAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      if (onStopCallbackRef.current) {
        onStopCallbackRef.current();
      }
      currentAudioRef.current = null;
      onStopCallbackRef.current = null;
      setCurrentAudioId(null);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentAudioId,
        setCurrentAudio,
        stopCurrentAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

