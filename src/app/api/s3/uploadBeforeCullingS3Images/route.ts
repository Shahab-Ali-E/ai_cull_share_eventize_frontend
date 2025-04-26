// app/api/s3/upload-urls/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPresignedUrl, getFileUrl } from "@/lib/aws";   // <-- import getFileUrl
import { auth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";

const MAX_TOTAL_SIZE_BYTES = 2 * 1024 * 1024 * 1024; // 2GB

export async function POST(req: NextRequest) {
  try {
    const { files, workspaceName, workspaceId } = await req.json();
    const { userId } = await auth();

    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ message: "No files provided" }, { status: 400 });
    }

    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      return NextResponse.json({ message: "Total size exceeds 2GB limit" }, { status: 400 });
    }

    // TTL for presigned URLs, in seconds
    const expirySec = Number(process.env.NEXT_PUBLIC_PRESIGNED_URL_EXPIRY_SEC) || 3600;

    const bucket = process.env.NEXT_AWS_BUCKET_SMART_CULL_NAME!;

    const presignedImagesMetadata = await Promise.all(
      files.map(async (file) => {
        // 1) build your key
        const folder = `${userId}/${workspaceName}/${process.env.IMAGES_BEFORE_CULLING_STARTS_Folder}`;
        const fileName = `${uuidv4()}_${file.name}`;
        const key = `${folder}/${fileName}`;

        // 2) generate the PUT URL
        const uploadUrl = await getPresignedUrl({
          key,
          bucketName: bucket,
          contentType: file.type,
          fileSize:file.size
        });

        // 3) generate the GET URL
        const downloadUrl = await getFileUrl({
          key,
          bucketName: bucket,
        });

        // 4) when it expires (for client‐side display)
        const expiryDate = new Date(Date.now() + expirySec * 1000).toISOString();

        return {
          name: fileName,
          file_type: file.type,
          size: file.size,
          key,
          uploadUrl,      // PUT presigned URL
          image_download_path:downloadUrl,    // GET presigned URL 
          image_download_validity: expiryDate,
          culling_folder_id: workspaceId,
        };
      })
    );

    return NextResponse.json({
      presignedImagesMetadata,
      totalSize,
    });
  } catch (err) {
    console.error("Presigned URL error:", err);
    return NextResponse.json({ message: "Failed to generate URLs" }, { status: 500 });
  }
}
