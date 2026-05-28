import { useState, useCallback } from 'react';
// import { Audio } from 'expo-av'; // Temporarily disabled - SDK 56 compatibility issue
// TODO: Re-enable once expo-av SDK 56 compatibility is fixed

export function useVoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [amplitude, setAmplitude] = useState(0);

  const startRecording = useCallback(async () => {
    console.warn('Voice recording temporarily disabled - expo-av SDK 56 compatibility');
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(async (): Promise<string | null> => {
    setIsRecording(false);
    setAmplitude(0);
    return null;
  }, []);

  return {
    startRecording,
    stopRecording,
    isRecording,
    audioUri,
    amplitude,
  };
}
