export function getDropCapParts(text: string): { firstLetter: string; rest: string } {
  if (!text || text.length === 0) {
    return { firstLetter: '', rest: '' };
  }
  const trimmed = text.trim();
  return {
    firstLetter: trimmed.charAt(0),
    rest: trimmed.slice(1),
  };
}
