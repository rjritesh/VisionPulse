"use client";
import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import { showPredictions } from "@/utils/showPredictions";

const ObjectDetection = ({ email }) => {
  const [loading, setLoading] = useState(true);
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const detectInterval = useRef(null);

  const showMyVideo = () => {
    if (
      webCamRef.current !== null &&
      webCamRef.current.video?.readyState === 4
    ) {
      const myVideoWidth = webCamRef.current.video.videoWidth;
      const myVideoHeight = webCamRef.current.video.videoHeight;

      webCamRef.current.video.width = myVideoWidth;
      webCamRef.current.video.height = myVideoHeight;
    }
  };

  const runCoco = async () => {
    await tf.setBackend("webgl");  // or "cpu" if webgl not supported
  await tf.ready();   
    const net = await cocoSSDLoad();
    setLoading(false); // fixed here
    detectInterval.current = setInterval(() => {
      runObjectDetection(net);
    }, 100);
  };

  const runObjectDetection = async (net) => {
    if (
      canvasRef.current &&
      webCamRef.current !== null &&
      webCamRef.current.video?.readyState === 4
    ) {
      canvasRef.current.width = webCamRef.current.video.videoWidth;
      canvasRef.current.height = webCamRef.current.video.videoHeight;

      const detectedObjects = await net.detect(
        webCamRef.current.video,
        undefined,
        0.3
      );
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
    <div className="flex justify-center items-center py-12 px-4 bg-gray-900 min-h-screen">
      <div className="relative w-full max-w-5xl h-[600px] md:h-[650px] rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-600 bg-gray-800 flex justify-center items-center">
        {loading ? (
          <p className="text-white text-2xl md:text-3xl animate-pulse">
            Loading Camera & AI Model...
          </p>
        ) : (
          <Webcam
            ref={webCamRef}
            className="w-full h-full object-cover rounded-3xl"
            mirrored
            muted
            audio={false}
          />
        )}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default ObjectDetection;
