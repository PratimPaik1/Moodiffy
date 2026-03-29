import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

let faceLandmarker = null;

// 🔹 Initialize model
export async function initFaceLandmarker() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
  );

  faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
  });
}

// 🔹 Start camera
export async function startCamera(videoElement) {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoElement.srcObject = stream;
}

// 🔹 Emotion logic
function getEmotion(blendshapes) {
  const get = (name) =>
    blendshapes.find((b) => b.categoryName === name)?.score || 0;

  const smile = get("mouthSmileLeft") + get("mouthSmileRight");
  const mouthOpen = get("jawOpen");
  const browRaise = get("browInnerUp");

  if (smile > 0.7) return "happy";
  if (mouthOpen > 0.6 && browRaise > 0.4) return "surprised";
  if (smile < 0.2 && mouthOpen < 0.2) return "sad";

  return "neutral";
}

// 🔹 Detect once
export async function detectEmotionOnce(videoElement, canvasElement) {
  if (!faceLandmarker) return null;

  const ctx = canvasElement.getContext("2d");

  const results = await faceLandmarker.detectForVideo(
    videoElement,
    Date.now()
  );

  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  if (results.faceBlendshapes.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;
    const emotion = getEmotion(blendshapes);
    
    return emotion;
  } else {
    return null;
  }
}