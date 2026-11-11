import { describe, expect, it } from 'vitest';
import { loadEnv } from './env';

const valid = {
  DATABASE_HOST: 'localhost',
  DATABASE_NAME: 'portal',
  DATABASE_USER: 'portal',
  DATABASE_PASSWORD: 'local-only',
  UPLOADS_BUCKET: 'example-uploads',
  SUPPORT_EMAIL: 'support@example.com',
};

describe('loadEnv', () => {
  it('applies defaults', () => {
    expect(loadEnv(valid).DATABASE_PORT).toBe(3306);
  });

  it('rejects a malformed support email', () => {
    expect(() => loadEnv({ ...valid, SUPPORT_EMAIL: 'not-an-email' })).toThrow();
  });
});
