"use client";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { showPredictions } from "@/utils/showPredictions";

const ObjectDetection = ({ email }) => {
  const [isLoading, setIsLoading] = useState(true);
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const detectInterval = useRef(null);

  const showMyVideo = () => {
    if (
      webCamRef.current !== null &&
      webCamRef?.current?.video?.readyState === 4
    ) {
      const myVideoWidth = webCamRef.current.video.videoWidth;
      const myVideoHeight = webCamRef.current.video.videoHeight;

      webCamRef.current.video.width = myVideoWidth;
      webCamRef.current.video.height = myVideoHeight;
    }
  };

  const runCoco = async () => {
    const net = await cocoSSDLoad();
    setIsLoading(false);
    detectInterval.current = setInterval(() => {
      runObjectDetection(net);
    }, 100);
  };

  const runObjectDetection = async (net) => {
    if (
      canvasRef.current &&
      webCamRef.current !== null &&
      webCamRef?.current?.video?.readyState === 4
    ) {
      canvasRef.current.width = webCamRef.current.video.videoWidth;
      canvasRef.current.height = webCamRef.current.video.videoHeight;

      const detectedObjects = await net.detect(webCamRef.current.video, undefined, 0.3);
      const context = canvasRef.current.getContext("2d");
      showPredictions(detectedObjects, context, email, webCamRef);
    }
  };

  useEffect(() => {
    runCoco();
    showMyVideo();
    return () => {
      if (detectInterval.current) clearInterval(detectInterval.current);
    };
  }, []);

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="text-center text-purple-400 text-lg font-semibold">
          AI Model is Loading ...
        </div>
      ) : (
        <div className="relative flex justify-center items-center shadow-purple-800 shadow-md p-2 rounded-md overflow-hidden w-full">
          <Webcam
            ref={webCamRef}
            className="w-full h-auto rounded-md"
            mirrored
            muted
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;
