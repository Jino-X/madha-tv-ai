import { useState, useEffect } from 'react';
import { getPassage } from '../api/bible';
import { LECTIONARY } from '../constants/lectionary';
import { format } from 'date-fns';

export function useGospelReading() {
  const [passage, setPassage] = useState('');
  const [bookName, setBookName] = useState('');
  const [reference, setReference] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchReading() {
      try {
        const today = format(new Date(), 'MM-dd');
        const reading = LECTIONARY[today] || LECTIONARY['01-01'];

        const result = await getPassage(
          reading.gospel.bookId,
          reading.gospel.chapter,
          reading.gospel.verses
        );

        if (mounted) {
          setPassage(result.text);
          setBookName(result.bookName);
          setReference(result.reference);
        }
      } catch (error) {
        console.error('Failed to fetch gospel reading:', error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchReading();
    return () => { mounted = false; };
  }, []);

  return { passage, bookName, reference, isLoading };
}
