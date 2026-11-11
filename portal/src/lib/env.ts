import { z } from 'zod';

/** Runtime configuration. Values come from the environment; nothing is committed to the repo. */
export const envSchema = z.object({
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.coerce.number().int().positive().default(3306),
  DATABASE_NAME: z.string().min(1),
  DATABASE_USER: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  UPLOADS_BUCKET: z.string().min(1),
  SUPPORT_EMAIL: z.string().email(),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(source: Record<string, string | undefined> = process.env): Env {
  return envSchema.parse(source);
}
