"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import * as faceapi from "face-api.js";
import { motion } from "framer-motion";
import { GetImagesByFaceRecognition } from "@/lib/actions/SmartShare/GetImages";

function FaceRecogmitionPage({eventId}:{eventId:string}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [faceDetected, setFaceDetected] = useState(false);

  // Load model from face-api.js
  const loadModels = async () => {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models/");
      console.log("Model initialized successfully");

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
  const captureImage = async ({eventId}:{eventId:string}) => {
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
          const faceCanvas = document.createElement("canvas");
  
          faceCanvas.width = faceBox.width;
          faceCanvas.height = faceBox.height;
  
          const faceContext = faceCanvas.getContext("2d");
          if (faceContext) {
            faceContext.drawImage(
              canvas,
              faceBox.x,
              faceBox.y - 28,
              faceBox.width,
              faceBox.height,
              0,
              0,
              faceBox.width,
              faceBox.height
            );
  
            const faceImage = faceCanvas.toDataURL("image/png");
  
            // Convert Base64 to Blob
            const blob = await (await fetch(faceImage)).blob();
            const formData = new FormData();
            formData.append("image", blob, "captured-face.png");
  
            try {
              await GetImagesByFaceRecognition({ eventId, faceImage: formData });
              toast.success("Image uploaded successfully!");
            } catch (error) {
              toast.error("Failed to upload image!");
              console.error(error);
            }
          }
        } else {
          toast.error("No face detected for capture!");
        }
      }
    }
  };
  

  // Load models and start video stream on mount
  useEffect(() => {
    startVideo();
    loadModels();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center h-screen space-y-6 text-primary">
      <Label className="mb-4 text-lg font-semibold">Align your face to capture</Label>

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
          onClick={()=>captureImage({eventId:eventId})}
          disabled={!faceDetected}
          className="px-6 py-2 text-lg font-medium"
        >
          Capture Image
        </Button>
      </motion.div>
    </section>
  );
}

export default FaceRecogmitionPage;
