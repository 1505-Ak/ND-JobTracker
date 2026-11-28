export function applicationDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function localDateKey(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatApplicationDate(date: Date): string {
  return date.toLocaleDateString(undefined, { timeZone: 'UTC' });
}
