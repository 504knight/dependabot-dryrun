import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import type { Env } from './env';

const s3 = new S3Client({});

export async function saveUpload(env: Env, key: string, body: Uint8Array): Promise<void> {
  await s3.send(new PutObjectCommand({ Bucket: env.UPLOADS_BUCKET, Key: key, Body: body }));
}
