// lib/aws.ts

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_REGION || "",

  credentials: {
    accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY || "",
  },
  signingRegion: process.env.NEXT_AWS_REGION,
});

export async function getDownloadUrl(objectName: string, bucketName:string) {
  return getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: bucketName,
      Key: objectName,
    }),
    { expiresIn: parseInt(process.env.NEXT_PRESIGNED_URL_EXPIRY_SEC || "3600") }
  );
}

export async function getPresignedUrl({
  key,
  contentType,
  fileSize,
  bucketName,
}: {
  key: string;
  contentType: string;
  bucketName: string;
  fileSize:number;
}) {
  // Only include ContentType, not ContentLength
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
    ContentLength: fileSize, // Add explicit size
    Body: undefined // Force presigned URL to accept any content
  });

  // const url = await getSignedUrl(s3Client, command, {
  //   expiresIn: parseInt(
  //     process.env.NEXT_PRESIGNED_URL_EXPIRY_SEC || "3600",
  //     10
  //   ),
  // });
  const url = await getSignedUrl(s3Client, command, {
    expiresIn: parseInt(
      process.env.NEXT_PRESIGNED_URL_EXPIRY_SEC || "3600",
      10
    ),
    signableHeaders: new Set(['content-type', 'content-length']) // Allow these headers
  });

  return url;
}

export async function getFileUrl({ key, bucketName }: { key: string; bucketName:string }) {
  const url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    }),
    { expiresIn: parseInt(process.env.NEXT_PRESIGNED_URL_EXPIRY_SEC || "3600") }
  );

  return url;
}
