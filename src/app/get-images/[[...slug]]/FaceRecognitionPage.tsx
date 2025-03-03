"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import * as faceapi from "face-api.js";
import { motion } from "framer-motion";
import { GetImagesByFaceRecognition } from "@/lib/actions/SmartShare/GetImages";
import { useRouter } from "next/navigation";
import { useFaceRecognitionStore } from "@/zustand/FaceRecognitionStore";

function FaceRecogmitionPage({ eventId }: { eventId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setImages } = useFaceRecognitionStore();
  const router = useRouter();

  // Helper to stop the video stream
  const stopVideoStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Load model from face-api.js
  const loadModels = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models/");
      console.log("Model initialized successfully");

      // Poll for face detection every second
      setInterval(async () => {
        if (videoRef.current) {
          const detections = await faceapi.detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          );
          setFaceDetected(detections.length > 0);
        }
      }, 1000);
    } catch (err) {
      console.warn(String(err));
      toast.error("Failed to initialize the model");
    }
  };

  // Start video stream
  const startVideo = () => {
    try {
      if (navigator.mediaDevices) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((currentStream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = currentStream;
            }
          });
      }
    } catch (err) {
      console.warn(String(err));
      toast.warning("Please allow camera access to perform face detection");
    }
  };

  // Capture and extract face image
  const captureImage = async ({ eventId }: { eventId: string }) => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");

      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );

        if (detections.length > 0) {
          const faceBox = detections[0].box;

          // Define an expansion factor (e.g., 50% more in width and height)
          const expansionFactor = 0.5;
          const extraWidth = faceBox.width * expansionFactor;
          const extraHeight = faceBox.height * expansionFactor;

          // Calculate new coordinates ensuring we don't exceed canvas boundaries
          const newX = Math.max(0, faceBox.x - extraWidth / 2);
          const newY = Math.max(0, faceBox.y - extraHeight / 1.1);
          const newWidth = Math.min(
            canvas.width - newX,
            faceBox.width + extraWidth
          );
          const newHeight = Math.min(
            canvas.height - newY,
            faceBox.height + extraHeight
          );

          const faceCanvas = document.createElement("canvas");
          faceCanvas.width = newWidth;
          faceCanvas.height = newHeight;
          const faceContext = faceCanvas.getContext("2d");

          if (faceContext) {
            faceContext.drawImage(
              canvas,
              newX,
              newY,
              newWidth,
              newHeight,
              0,
              0,
              newWidth,
              newHeight
            );

            const faceImage = faceCanvas.toDataURL("image/png");
            // setImage(faceImage);

            // Convert Base64 to Blob
            const blob = await (await fetch(faceImage)).blob();
            const formData = new FormData();
            formData.append("image", blob, "captured-face.png");

            try {
              setLoading(true);
              const response = await GetImagesByFaceRecognition({
                eventId,
                faceImage: formData,
              });
              if (response.error) {
                toast.error(response.error);
              } else {
                const data = response.data;
                if (data) {
                  toast.success("Image uploaded successfully!");
                  // Stop the camera stream before navigation
                  stopVideoStream();
                  // Encode the data to pass via the URL

                  // Store data in Zustand
                  setImages(data);
                  // Navigate user to images page
                  router.replace(`/get-images/${eventId}/images`);
                }
              }
            } catch (error) {
              toast.error("Failed to upload image!");
              console.error(error);
            } finally {
              setLoading(false);
            }
          }
        } else {
          toast.error("No face detected for capture!");
        }
      }
    }
  };

  // Load models and start video stream on mount.
  useEffect(() => {
    startVideo();
    loadModels();

    // Cleanup function to stop the video stream when component unmounts
    return () => {
      stopVideoStream();
    };
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-screen space-y-6 text-primary">
      <Label className="mb-4 text-lg font-semibold">
        Align your face to capture
      </Label>

      <motion.div
        className={`relative w-96 h-96 rounded-full overflow-hidden border-8 ${
          faceDetected ? "border-green-500" : "border-gray-400"
        }`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <video
          ref={videoRef}
          crossOrigin="anonymous"
          autoPlay
          className="object-cover w-full h-full"
        />
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Button
          onClick={() => captureImage({ eventId })}
          disabled={!faceDetected || loading}
          className="bg-gradient-to-r from-purple-600 to-teal-400 text-white text-base px-6 py-3 rounded shadow-lg flex items-center gap-2"
        >
          {loading ? "Capturing..." : "Capture Image"}
        </Button>
      </motion.div>
    </section>
  );
}

export default FaceRecogmitionPage;
