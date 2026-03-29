import { useEffect, useRef, useState } from "react";
import {
  initFaceLandmarker,
  startCamera,
  detectEmotionOnce,
} from "../utils/utils";
import "./Expression.scss";

export default function Expression({ handleGetSong }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    await initFaceLandmarker();
    await startCamera(videoRef.current);
  }

  async function handleDetectClick() {
    setIsLoading(true);
    try {
      const emotion = await detectEmotionOnce(videoRef.current, canvasRef.current);
      
      if (emotion) {
        setDetectedEmotion(emotion);
        // Call handleGetSong with detected emotion
        await handleGetSong({ mood: emotion });
      } else {
        setDetectedEmotion("No Face Detected");
      }
    } catch (error) {
      console.error("Error detecting emotion:", error);
      setDetectedEmotion("Detection Error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="expression-container">
      <div className="video-wrapper">
        <video ref={videoRef} autoPlay playsInline className="video-stream" />
        <canvas ref={canvasRef} className="canvas-overlay" />
      </div>

      {detectedEmotion && (
        <div className="emotion-result">
          <p className={`emotion-text ${detectedEmotion !== 'No Face Detected' && detectedEmotion !== 'Detection Error' ? 'success' : 'error'}`}>
            Detected: <strong>{detectedEmotion}</strong>
          </p>
        </div>
      )}

      <button 
        className="detect-btn" 
        onClick={handleDetectClick}
        disabled={isLoading}
      >
        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        {isLoading ? "Detecting..." : "Detect Emotion"}
      </button>
    </div>
  );
}