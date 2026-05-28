import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.ELEVENLABS_API_KEY || '';
const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Default calm voice

export async function synthesizeSpeech(text: string): Promise<string> {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75,
          style: 0.3,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.status}`);
  }

  // Use dynamic import to avoid TS issues with expo-file-system/next
  const { File, Paths } = await import('expo-file-system/next' as string);
  const outputFile = new File(Paths.cache, `tts_output_${Date.now()}.mp3`);

  const blob = await response.blob();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const base64 = (reader.result as string).split(',')[1];
        outputFile.write(base64);
        resolve(outputFile.uri);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
