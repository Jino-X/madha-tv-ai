import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export function formatMessageTime(date: Date): string {
  return format(new Date(date), 'h:mm a');
}

export function formatEntryDate(date: Date): string {
  const d = new Date(date);
  if (isToday(d)) return `Today, ${format(d, 'h:mm a')}`;
  if (isYesterday(d)) return `Yesterday, ${format(d, 'h:mm a')}`;
  return format(d, 'MMM d, yyyy');
}

export function formatTimeAgo(date: Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}
