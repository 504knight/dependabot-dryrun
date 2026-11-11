import { DateTime } from 'luxon';
import { describe, expect, it } from 'vitest';
import { nextReleaseDate } from './dates';

describe('nextReleaseDate', () => {
  it('returns the same day when it is already Monday', () => {
    const monday = DateTime.fromISO('2026-12-07T15:30:00');
    expect(nextReleaseDate(monday).toISODate()).toBe('2026-12-07');
  });

  it('rolls forward to the following Monday', () => {
    const thursday = DateTime.fromISO('2026-12-10T09:00:00');
    expect(nextReleaseDate(thursday).toISODate()).toBe('2026-12-14');
  });
});
