"use client";

import { useState, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAnalytics } from "@/lib/actions/Dashboard/Analytics";
import { SmartShareImagesMetadata } from "@/@types/smart-share";
import { uploadEventImagesMetadata } from "@/lib/actions/SmartShare/uploadEventImagesMetadata";
import { useAuth } from "@clerk/nextjs";

export interface ImagesMetadata extends Omit<SmartShareImagesMetadata, "id"> {
  uploadUrl: string; // PUT URL
  smart_share_folder_id: string;
}

type FileMeta = {
  name: string;
  size: number;
  type: string;
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

export function useSmartShareS3Uploader(eventName: string, eventId: string) {
  const [progress, setProgress] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [eta, setEta] = useState("…");
  const [isUploading, setIsUploading] = useState(false);
  const startTimeRef = useRef<number>(0);
  const router = useRouter();
  const { getToken } = useAuth();

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;

    // 1) Validate each file
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`Unsupported file type: ${file.name}`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File too large: ${file.name}`);
        return;
      }
    }

    setIsUploading(true);
    setProgress(0);
    setUploadedCount(0);
    setEta("…");
    startTimeRef.current = Date.now();

    try {
      // 2) Fetch analytics to check existing storage usage
      const analyticsRes = await getAnalytics();
      const quota = parseInt(
        String(analyticsRes.data?.total_smart_share_storage ?? "0"),
        10
      );

      // likewise for “used”
      const used = parseInt(
        String(analyticsRes.data?.total_smart_share_storage_used ?? "0"),
        10
      );

      // 3) Compute size of this batch
      const totalSize = files.reduce((sum, f) => sum + f.size, 0);

      // 4) If over quota, abort
      if (used + totalSize > quota) {
        toast.error("Not enough storage available !");
        setIsUploading(false);
        router.refresh();
        return;
      }

      // 5) Prepare for presign request
      const fileMeta: FileMeta[] = files.map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
      }));

      const token = await getToken({ template: "AI_Cull_Share_Eventize" });

      // 6) Obtain both PUT and GET URLs
      const {
        data,
      }: AxiosResponse<{
        presignedImagesMetadata: ImagesMetadata[];
        totalSize: number;
      }> = await axios.post(
        "/api/s3/uploadSmartShareImages",
        { files: fileMeta, eventId, eventName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { presignedImagesMetadata } = data;

      // 7) Perform the uploads
      const loadedMap = Array(files.length).fill(0);
      await Promise.all(
        presignedImagesMetadata.map(({ uploadUrl }, idx) =>
          axios.put(uploadUrl, files[idx], {
            headers: { "Content-Type": files[idx].type },
            onUploadProgress: (evt) => {
              loadedMap[idx] = evt.loaded;
              const loadedAll = loadedMap.reduce((a, b) => a + b, 0);
              const pct = Math.floor((loadedAll / totalSize) * 100);
              setProgress(pct);
              setUploadedCount(
                Math.floor((loadedAll / totalSize) * files.length)
              );

              // update ETA
              const elapsed = Date.now() - startTimeRef.current;
              if (loadedAll > 0) {
                const rate = elapsed / loadedAll;
                const remaining = totalSize - loadedAll;
                const secs = Math.ceil((rate * remaining) / 1000);
                setEta(
                  secs > 60
                    ? `${Math.floor(secs / 60)}m ${secs % 60}s`
                    : `${secs}s`
                );
              }
            },
          })
        )
      );

      setProgress(100);
      setUploadedCount(files.length);
      setEta("0s");
      
      // 8) Send only GET URLs to your backend
      const payload = presignedImagesMetadata.map(
        ({
          name,
          file_type,
          image_download_path,
          image_download_validity,
          smart_share_folder_id,
        }) => ({
          name,
          file_type,
          image_download_path,
          image_download_validity,
          smart_share_folder_id,
        })
      );
      const response = await uploadEventImagesMetadata({
        eventId: eventId,
        combinedSize: totalSize,
        imagesMetadata: payload,
      });
      console.log("response", response);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(`Uploaded ${files.length} image(s) successfully!`);
      }
    } catch (err: unknown) {
      // Start with a default
      let message = "Upload failed";

      // 1) Axios errors with a server‐sent message
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        message = err.response.data.message;
      }
      // 2) Native JS Error objects
      else if (err instanceof Error) {
        message = err.message;
      }

      toast.error(message);

      // If it really is an Axios 401, redirect
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setIsUploading(false);
      router.refresh();
    }
  };

  return {
    isUploading,
    progress,
    uploadedCount,
    eta,
    handleUpload,
  };
}
