import { DateTime } from 'luxon';

const MONDAY = 1;

/** The team ships on Mondays. Returns the next Monday on or after `from`. */
export function nextReleaseDate(from: DateTime = DateTime.now()): DateTime {
  const daysUntilMonday = (MONDAY - from.weekday + 7) % 7;
  return from.startOf('day').plus({ days: daysUntilMonday });
}

export function formatReleaseDay(date: DateTime): string {
  return date.toLocaleString(DateTime.DATE_HUGE);
}
