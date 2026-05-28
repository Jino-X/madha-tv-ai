import { useState, useEffect } from 'react';
import { getDailyVerse } from '../api/bible';

export function useDailyVerse() {
  const [verse, setVerse] = useState('');
  const [reference, setReference] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchVerse() {
      try {
        const result = await getDailyVerse();
        if (mounted) {
          setVerse(result.text);
          setReference(result.reference);
        }
      } catch (error) {
        console.error('Failed to fetch daily verse:', error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchVerse();
    return () => { mounted = false; };
  }, []);

  return { verse, reference, isLoading };
}
