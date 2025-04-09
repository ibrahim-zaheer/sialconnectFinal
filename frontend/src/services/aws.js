import { S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.VITE_REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.VITE_RREACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VITE_RREACT_APP_AWS_SECRET_ACCESS_KEY
  }
});

export { s3Client, getSignedUrl, PutObjectCommand, GetObjectCommand };