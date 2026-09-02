import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import {
  dmciLogoUrl,
  idCardImageUrl,
  thumbnailPhoto1Url,
  thumbnailPhoto2Url,
  thumbnailPhoto3Url,
  thumbnailPhoto4Url,
} from "./assets/figmaAssets";

type CaptureMode = "selfie" | "upload";

type IconProps = { className?: string };

const lucideProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function CameraIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      color="currentColor"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path
        d="M12.6974 3.5H11.303C10.5884 3.5 10.2311 3.5 9.91067 3.612C9.71499 3.68039 9.53113 3.77879 9.36568 3.90367C9.09474 4.10816 8.89655 4.40544 8.50018 5L8.50017 5.00001C8.29717 5.30453 7.99794 5.75337 7.87867 5.87871C7.58314 6.18927 7.19563 6.39666 6.77329 6.47029C6.60284 6.5 6.41985 6.5 6.05387 6.5C5.07379 6.5 4.58376 6.5 4.18307 6.61342C3.18074 6.89716 2.39734 7.68055 2.1136 8.68289C2.00018 9.08357 2.00018 9.57361 2.00018 10.5537V14.5C2.00018 17.3284 2.00018 18.7426 2.87886 19.6213C3.75754 20.5 5.17176 20.5 8.00018 20.5H16.0002C18.8286 20.5 20.2428 20.5 21.1215 19.6213C22.0002 18.7426 22.0002 17.3284 22.0002 14.5V10.5537C22.0002 9.57361 22.0002 9.08357 21.8868 8.68289C21.603 7.68055 20.8196 6.89716 19.8173 6.61342C19.4166 6.5 18.9266 6.5 17.9465 6.5C17.5805 6.5 17.3975 6.5 17.2271 6.47029C16.8047 6.39666 16.4172 6.18927 16.1217 5.87871C16.0024 5.75336 15.7032 5.30451 15.5002 5C15.1038 4.40544 14.9056 4.10816 14.6347 3.90367C14.4692 3.77879 14.2854 3.68039 14.0897 3.612C13.7693 3.5 13.412 3.5 12.6974 3.5Z"
        strokeLinejoin="round"
      />
      <path
        d="M16.0002 13C16.0002 15.2091 14.2093 17 12.0002 17C9.79104 17 8.00018 15.2091 8.00018 13C8.00018 10.7909 9.79104 9 12.0002 9C14.2093 9 16.0002 10.7909 16.0002 13Z"
        strokeLinejoin="round"
      />
      <path d="M19.1252 9.5H19.0002M19.2502 9.5C19.2502 9.63807 19.1383 9.75 19.0002 9.75C18.8621 9.75 18.7502 9.63807 18.7502 9.5C18.7502 9.36193 18.8621 9.25 19.0002 9.25C19.1383 9.25 19.2502 9.36193 19.2502 9.5Z" />
    </svg>
  );
}

function CameraOffIcon({ className }: IconProps) {
  return (
    <svg className={className} {...lucideProps}>
      <line x1="2" x2="22" y1="2" y2="22" />
      <path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" />
      <path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" />
      <path d="M14.121 15.121A3 3 0 1 1 9.88 10.88" />
    </svg>
  );
}

function UploadIcon({ className }: IconProps) {
  return (
    <svg className={className} {...lucideProps}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function TrashIcon({ className }: IconProps) {
  return (
    <svg className={className} {...lucideProps}>
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}

function ExpandIcon({ className }: IconProps) {
  return (
    <svg className={className} {...lucideProps}>
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} {...lucideProps}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function RotateCcwIcon({ className }: IconProps) {
  return (
    <svg className={className} {...lucideProps}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function CircleCheckIcon({ className }: IconProps) {
  return (
    <svg className={className} {...lucideProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CircleAlertIcon({ className }: IconProps) {
  return (
    <svg className={className} {...lucideProps}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

function CheckmarkIcon({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.3327 4L5.99935 11.3333L2.66602 8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 6L9 17L4 12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.75 8.25V6C12.75 3.92893 11.0711 2.25 9 2.25C6.92893 2.25 5.25 3.92893 5.25 6V8.25M6.6 15.75H11.4C12.6601 15.75 13.2902 15.75 13.7715 15.5048C14.1948 15.289 14.539 14.9448 14.7548 14.5215C15 14.0402 15 13.4101 15 12.15V11.85C15 10.5899 15 9.95982 14.7548 9.47852C14.539 9.05516 14.1948 8.71095 13.7715 8.49524C13.2902 8.25 12.6601 8.25 11.4 8.25H6.6C5.33988 8.25 4.70982 8.25 4.22852 8.49524C3.80516 8.71095 3.46095 9.05516 3.24524 9.47852C3 9.95982 3 10.5899 3 11.85V12.15C3 13.4101 3 14.0402 3.24524 14.5215C3.46095 14.9448 3.80516 15.289 4.22852 15.5048C4.70982 15.75 5.33988 15.75 6.6 15.75Z"
        stroke="#9CA3AF"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ThumbnailAttempt {
  id: string;
  photo: string;
  status: "rejected" | "accepted";
}

const THUMBNAIL_ATTEMPTS: ThumbnailAttempt[] = [
  { id: "attempt-1", photo: thumbnailPhoto1Url, status: "rejected" },
  { id: "attempt-2", photo: thumbnailPhoto2Url, status: "rejected" },
  { id: "attempt-3", photo: thumbnailPhoto3Url, status: "rejected" },
  { id: "attempt-4", photo: thumbnailPhoto4Url, status: "accepted" },
];

const TOTAL_STEPS = 8;
const CURRENT_STEP = 3;

declare global {
  interface Window {
    faceapi?: any;
  }
}

const FACE_API_SCRIPT_URL =
  "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js";
const FACE_API_MODEL_URL =
  "https://justadudewhohacks.github.io/face-api.js/models";

let faceApiReadyPromise: Promise<void> | null = null;

function loadFaceApi(): Promise<void> {
  if (faceApiReadyPromise) return faceApiReadyPromise;
  faceApiReadyPromise = new Promise((resolve, reject) => {
    const afterScript = () => {
      const faceapi = window.faceapi;
      if (!faceapi) {
        reject(new Error("face-api.js did not load"));
        return;
      }
      faceapi.nets.tinyFaceDetector
        .loadFromUri(FACE_API_MODEL_URL)
        .then(resolve)
        .catch(reject);
    };
    if (window.faceapi) {
      afterScript();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${FACE_API_SCRIPT_URL}"]`,
    );
    if (existing) {
      existing.addEventListener("load", afterScript);
      existing.addEventListener("error", () =>
        reject(new Error("face-api.js failed to load")),
      );
      return;
    }
    const script = document.createElement("script");
    script.src = FACE_API_SCRIPT_URL;
    script.async = true;
    script.onload = afterScript;
    script.onerror = () => reject(new Error("face-api.js failed to load"));
    document.head.appendChild(script);
  });
  return faceApiReadyPromise;
}

function detectCardLikelyHeld(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement | null,
): boolean {
  if (!canvas || video.videoWidth === 0 || video.videoHeight === 0)
    return false;
  const w = 96;
  const h = 54;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  } as CanvasRenderingContext2DSettings);
  if (!ctx) return false;
  ctx.drawImage(video, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  const startY = Math.floor(h * 0.35);
  let edgeSum = 0;
  let sampleCount = 0;
  const lumAt = (x: number, y: number) => {
    const i = (y * w + x) * 4;
    return 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  };
  for (let y = startY; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const lum = lumAt(x, y);
      edgeSum +=
        Math.abs(lum - lumAt(x + 1, y)) + Math.abs(lum - lumAt(x, y + 1));
      sampleCount++;
    }
  }
  const avgEdge = sampleCount > 0 ? edgeSum / sampleCount : 0;
  return avgEdge > 18;
}

export default function CaptureSelfieTrack() {
  const [captureMode, setCaptureMode] = useState<CaptureMode>("selfie");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [idHeld, setIdHeld] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectionCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  useEffect(() => {
    if (captureMode !== "selfie" || capturedImage) {
      stopStream();
      return;
    }

    let cancelled = false;
    setCameraError(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(
        "This browser can't access the camera. Try uploading a photo instead.",
      );
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" }, audio: false })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCameraError(
            "Camera access was blocked. Allow camera permission in your browser, then try again.",
          );
        }
      });

    return () => {
      cancelled = true;
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captureMode, capturedImage, retryToken]);

  useEffect(() => {
    if (captureMode !== "selfie" || capturedImage || cameraError) {
      setFaceDetected(false);
      setIdHeld(false);
      return;
    }

    let cancelled = false;
    setFaceDetected(false);
    setIdHeld(false);

    let intervalId: number | undefined;

    loadFaceApi()
      .then(() => {
        if (cancelled) return;
        intervalId = window.setInterval(async () => {
          const video = videoRef.current;
          if (!video || video.readyState < 2) return;

          try {
            const faceapi = window.faceapi;
            const result = await faceapi.detectSingleFace(
              video,
              new faceapi.TinyFaceDetectorOptions({
                inputSize: 224,
                scoreThreshold: 0.5,
              }),
            );
            if (!cancelled) setFaceDetected(!!result);
          } catch {
            // transient decode/timing errors are fine to ignore
          }

          if (!cancelled) {
            setIdHeld(detectCardLikelyHeld(video, detectionCanvasRef.current));
          }
        }, 500);
      })
      .catch(() => {
        // If the CDN can't be reached, fall back to leaving both flags false
      });

    return () => {
      cancelled = true;
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [captureMode, capturedImage, cameraError, retryToken]);

  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isExpanded]);

  const handleModeChange = (mode: CaptureMode) => {
    setCaptureMode(mode);
    setCapturedImage(null);
    setCameraError(null);
    setIsExpanded(false);
  };

  useEffect(() => {
    const canCapture =
      captureMode === "selfie" && !capturedImage && !cameraError;
    if (!canCapture) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.code === "Space" && !event.repeat) {
        event.preventDefault();
        handleCaptureRef.current();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [captureMode, capturedImage, cameraError]);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.videoWidth === 0) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL("image/png"));
    setIsExpanded(false);
  };
  const handleCaptureRef = useRef(handleCapture);
  handleCaptureRef.current = handleCapture;

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleDelete = () => {
    setCapturedImage(null);
    setIsExpanded(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCapturedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const showLiveVideoCompact =
    captureMode === "selfie" && !capturedImage && !cameraError && !isExpanded;
  const showLiveVideoExpanded =
    captureMode === "selfie" && !capturedImage && !cameraError && isExpanded;
  const steps = [
    { id: 1, name: "Buyer & Property", status: "completed" as const },
    { id: 2, name: "Representative Details", status: "completed" as const },
    { id: 3, name: "Identity Verification", status: "current" as const },
    { id: 4, name: "Live Selfie", status: "pending" as const },
    { id: 5, name: "Terms & Conditions", status: "pending" as const },
    { id: 6, name: "Data Privacy", status: "pending" as const },
    { id: 7, name: "Consent & Acceptance", status: "pending" as const },
    { id: 8, name: "Review & Submit", status: "pending" as const },
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 font-sans overflow-hidden">
      <header className="bg-white border-b border-gray-200 flex justify-center px-16">
        <div className="w-full max-w-[1280px] h-[72px] flex items-center justify-between px-8">
          <div className="flex items-center">
            <img
              className="h-8 w-auto"
              src={dmciLogoUrl}
              alt="DMCI Homes Sales"
            />
          </div>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex flex-col md:flex-row justify-center items-start gap-4 md:px-4 md:py-3">
        <div className="md:hidden w-full bg-white border-b border-gray-200 px-4 py-2.5 mb-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-900">
              {CURRENT_STEP}/{TOTAL_STEPS} steps
            </span>
          </div>
          <div className="flex gap-1 w-full">
            {Array.from({ length: TOTAL_STEPS }).map((_, idx) => (
              <div
                key={idx}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  idx < CURRENT_STEP ? "bg-brand-400" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        <aside className="hidden md:flex items-center flex-shrink-0 min-h-0 w-[240px]">
          <div className="bg-gray-100 border border-gray-200 rounded-xl px-5 py-8 flex flex-col gap-1 w-full self-start">
            <div className="px-3 mb-1">
              <p className="text-xs font-medium text-gray-400 m-0">
                Step {CURRENT_STEP} of {TOTAL_STEPS}
              </p>
            </div>
            <div className="flex flex-col gap-0">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col self-start">
                  <div className="flex items-center gap-3 px-1 py-1">
                    <div
                      className={`size-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.status === "completed"
                          ? "bg-brand-400"
                          : step.status === "current"
                            ? "border-2 border-brand-400 bg-white"
                            : "border-2 border-gray-300 bg-white"
                      }`}
                      style={
                        step.status === "current"
                          ? { boxShadow: "0 0 0 4px rgba(13, 77, 224, 0.15)" }
                          : {}
                      }
                    >
                      {step.status === "completed" && (
                        <CheckmarkIcon className="h-4 w-4 text-white" />
                      )}
                      {step.status === "current" && (
                        <div
                          className="rounded-full bg-brand-400"
                          style={{ width: "8px", height: "8px" }}
                        />
                      )}
                    </div>
                    <p
                      className={`text-sm leading-normal m-0 whitespace-nowrap ${
                        step.status === "completed"
                          ? "font-normal text-gray-900"
                          : step.status === "current"
                            ? "font-semibold text-brand-500"
                            : "font-medium text-gray-500"
                      }`}
                      style={{ width: "162px" }}
                    >
                      {step.name}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex h-6 items-center px-0.5 py-0 w-full">
                      <div className="flex h-full items-center justify-center w-6">
                        <div
                          className={`w-px h-full rounded ${
                            step.status === "completed"
                              ? "bg-brand-400"
                              : "bg-gray-300"
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="w-full md:w-[1024px] min-h-0 flex justify-center px-3 overflow-y-auto pb-24 bg-gray-50">
          <section className="w-full h-fit max-h-full bg-white rounded-[16px] shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 md:px-6 py-3 md:py-5 flex flex-col items-center text-center flex-shrink-0">
              <h1 className="m-0 pb-1.5 md:pb-3 text-lg md:text-2xl leading-6 md:leading-8 font-bold text-[#07389d]">
                Capture Live Selfie with ID
              </h1>
              <p className="m-0 max-w-[628px] text-xs md:text-base leading-5 md:leading-6 font-normal text-gray-600">
                Take a live selfie holding your ID. Make sure your face and ID
                are clear.
              </p>
            </div>

            <div
              className="px-3 md:px-5 flex flex-col gap-2 min-h-0"
              style={{ paddingTop: "6px", paddingBottom: "10px" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-6 md:gap-12 min-h-0">
                <div className="flex flex-col gap-3">
                  <div className="md:flex gap-0 p-1 bg-gray-100 rounded-[12px] w-full md:w-fit hidden">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={captureMode === "selfie"}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-3.5 py-3 md:py-1.5 rounded-lg border-none ${captureMode === "selfie" ? "bg-white text-[#052b78] shadow-[0_1px_2px_-1px_rgba(10,12.67,18,0.1),0_1px_3px_rgba(10,12.67,18,0.1)]" : "bg-transparent text-gray-700 hover:bg-blue-50"} text-sm font-semibold leading-5 cursor-pointer transition-all duration-200`}
                      onClick={() => handleModeChange("selfie")}
                    >
                      <CameraIcon className="h-5 w-5 flex-shrink-0" />
                      <span>Take Selfie</span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={captureMode === "upload"}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-3.5 py-3 md:py-1.5 rounded-lg border-none ${captureMode === "upload" ? "bg-white text-[#052b78] shadow-[0_1px_2px_-1px_rgba(10,12.67,18,0.1),0_1px_3px_rgba(10,12.67,18,0.1)]" : "bg-transparent text-gray-700 hover:bg-blue-50"} text-sm font-semibold leading-5 cursor-pointer transition-all duration-200`}
                      onClick={() => handleModeChange("upload")}
                    >
                      <UploadIcon className="h-5 w-5 flex-shrink-0" />
                      <span>Upload Photo</span>
                    </button>
                  </div>

                  <div className="md:hidden flex gap-0 p-1 bg-gray-100 rounded-[12px] w-full">
                    <button
                      type="button"
                      onClick={() => handleModeChange("selfie")}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-none ${captureMode === "selfie" ? "bg-white text-[#052b78] shadow-[0_1px_2px_-1px_rgba(10,12.67,18,0.1),0_1px_3px_rgba(10,12.67,18,0.1)]" : "bg-transparent text-gray-700 hover:bg-blue-50"} text-sm font-semibold leading-5 cursor-pointer transition-all duration-200`}
                    >
                      <CameraIcon className="h-5 w-5 flex-shrink-0" />
                      <span>Take Selfie</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleModeChange("upload")}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-none ${captureMode === "upload" ? "bg-white text-[#052b78] shadow-[0_1px_2px_-1px_rgba(10,12.67,18,0.1),0_1px_3px_rgba(10,12.67,18,0.1)]" : "bg-transparent text-gray-700 hover:bg-blue-50"} text-sm font-semibold leading-5 cursor-pointer transition-all duration-200`}
                    >
                      <UploadIcon className="h-5 w-5 flex-shrink-0" />
                      <span>Upload Photo</span>
                    </button>
                  </div>

                  <div
                    className="relative rounded-[16px] w-full aspect-video md:aspect-video overflow-hidden border-2 border-[#0a4dd7]"
                    style={{
                      borderStyle:
                        captureMode === "upload" ? "dashed" : "solid",
                      boxShadow:
                        showLiveVideoCompact && !showLiveVideoExpanded
                          ? "0 0 12px rgba(10, 77, 224, 0.4)"
                          : "none",
                      minHeight: "200px",
                    }}
                  >
                    {capturedImage ? (
                      <img
                        className="w-full h-full object-cover block"
                        src={capturedImage}
                        alt="Captured selfie holding ID"
                      />
                    ) : showLiveVideoCompact ? (
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover block bg-black"
                        autoPlay
                        playsInline
                        muted
                      />
                    ) : showLiveVideoExpanded ? (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-100 text-center text-xs text-gray-600">
                        <ExpandIcon className="h-5 w-5" />
                        Viewing full screen
                      </div>
                    ) : captureMode === "selfie" && cameraError ? (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-xs leading-4 text-yellow-900">
                        <CameraOffIcon className="h-6 w-6" />
                        <span>{cameraError}</span>
                        <button
                          type="button"
                          onClick={() => setRetryToken((n) => n + 1)}
                          className="mt-0.5 h-7 cursor-pointer rounded-full border border-yellow-500 bg-white px-3 text-[11px] font-semibold text-yellow-900"
                        >
                          Try again
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleUploadClick}
                        className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 md:gap-4 border-none p-4 md:p-8 text-center transition-all duration-300 hover:bg-gray-100/80"
                        style={{
                          background:
                            "linear-gradient(135deg, #f0f4ff 0%, #f5f9ff 100%)",
                        }}
                      >
                        <div className="flex h-12 md:h-16 w-12 md:w-16 items-center justify-center rounded-full bg-brand-400/15 transition-all duration-300 group-hover:bg-brand-400/25">
                          <UploadIcon className="h-6 md:h-8 w-6 md:w-8 text-brand-400" />
                        </div>
                        <div className="flex flex-col gap-0.5 md:gap-1">
                          <p className="text-sm md:text-sm font-semibold text-gray-900">
                            Upload your selfie
                          </p>
                          <span className="text-[11px] md:text-xs text-gray-600 leading-4">
                            Click to upload a photo holding your ID
                          </span>
                        </div>
                        <div className="hidden md:block text-xs font-medium text-brand-400">
                          or drag and drop
                        </div>
                      </button>
                    )}

                    {capturedImage ? (
                      <button
                        type="button"
                        onClick={handleRetake}
                        className="group absolute bottom-2.5 left-1/2 flex h-[30px] -translate-x-1/2 cursor-pointer items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 text-xs font-semibold text-gray-700 shadow-[0_2px_6px_rgba(10,13,18,0.15)] transition-all duration-150 hover:border-blue-600 hover:text-blue-600 hover:shadow-[0_4px_10px_rgba(10,13,18,0.2)] active:scale-95"
                      >
                        <RotateCcwIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-180" />
                        Retake
                      </button>
                    ) : showLiveVideoCompact ? (
                      <button
                        type="button"
                        aria-label="Capture selfie (Ctrl + Space)"
                        title="Capture selfie (Ctrl + Space)"
                        onClick={handleCapture}
                        className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center rounded-full bg-brand-400 shadow-lg hover:shadow-xl cursor-pointer border-none text-white transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        <CameraIcon className="h-8 w-8" />
                      </button>
                    ) : null}

                    {(capturedImage || showLiveVideoCompact) && (
                      <button
                        type="button"
                        aria-label={
                          isExpanded
                            ? "Collapse preview"
                            : "Expand preview to full screen"
                        }
                        title="Full screen"
                        onClick={() => setIsExpanded((v) => !v)}
                        className="absolute bottom-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 transition-all duration-150 hover:border-blue-600 hover:text-blue-600 active:scale-90"
                      >
                        <ExpandIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="hidden md:flex min-h-8 items-center justify-between gap-2 mt-1">
                    {capturedImage && (
                      <button
                        type="button"
                        aria-label="Delete captured photo"
                        title="Delete photo"
                        onClick={handleDelete}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-error-500/40 bg-white text-error-500 transition-all duration-150 hover:bg-red-600 hover:text-white active:scale-90"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    )}
                    {showLiveVideoCompact || showLiveVideoExpanded ? (
                      <div className="flex flex-wrap items-center justify-between gap-2 w-full">
                        {showLiveVideoCompact && (
                          <div className="flex items-center gap-2">
                            <span
                              className={
                                "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs transition-colors duration-300 " +
                                (faceDetected
                                  ? "border-success-500/40 bg-success-25"
                                  : "border-warning-500/40 bg-warning-100")
                              }
                            >
                              <span className="font-medium text-gray-700">
                                Face:
                              </span>
                              <span
                                className={
                                  "flex items-center gap-1 font-semibold " +
                                  (faceDetected
                                    ? "text-success-500"
                                    : "text-warning-800")
                                }
                              >
                                {faceDetected ? (
                                  <CircleCheckIcon className="h-3.5 w-3.5 text-success-500" />
                                ) : (
                                  <CircleAlertIcon className="h-3.5 w-3.5 animate-pulse text-warning-500" />
                                )}
                                {faceDetected ? "Detected" : "Not Detected"}
                              </span>
                            </span>
                            <span
                              className={
                                "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs transition-colors duration-300 " +
                                (idHeld
                                  ? "border-success-500/40 bg-success-25"
                                  : "border-warning-500/40 bg-warning-100")
                              }
                            >
                              <span className="font-medium text-gray-700">
                                ID:
                              </span>
                              <span
                                className={
                                  "flex items-center gap-1 font-semibold " +
                                  (idHeld
                                    ? "text-success-500"
                                    : "text-warning-800")
                                }
                              >
                                {idHeld ? (
                                  <CircleCheckIcon className="h-3.5 w-3.5 text-success-500" />
                                ) : (
                                  <CircleAlertIcon className="h-3.5 w-3.5 animate-pulse text-warning-500" />
                                )}
                                {idHeld ? "Held" : "Not Held"}
                              </span>
                            </span>
                          </div>
                        )}
                        <span className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400">
                          <span className="flex items-center gap-0.5">
                            <kbd className="rounded border border-gray-200 bg-gray-50 px-2 py-1 font-mono text-[11px] font-semibold leading-none text-gray-500">
                              Ctrl
                            </kbd>
                            <span className="text-gray-300">+</span>
                            <kbd className="rounded border border-gray-200 bg-gray-50 px-2 py-1 font-mono text-[11px] font-semibold leading-none text-gray-500">
                              Space
                            </kbd>
                          </span>
                          <span className="text-gray-400">to capture</span>
                        </span>
                      </div>
                    ) : (
                      <span />
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <canvas ref={detectionCanvasRef} className="hidden" />

                  <div className="flex flex-col gap-2 flex-shrink-0 mb-1 md:order-last">
                    <p className="m-0 mt-2 md:mt-5 text-[11px] md:text-xs leading-4 md:leading-5 font-medium text-gray-700">
                      Before you capture, compare against these examples
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 w-full">
                      {THUMBNAIL_ATTEMPTS.map((attempt) => (
                        <div
                          key={attempt.id}
                          className="flex flex-col items-center gap-0.5 md:gap-2"
                        >
                          <div
                            className={`relative w-full overflow-hidden bg-white min-w-0 outline outline-[1.4px] -outline-offset-[1.4px] rounded-lg p-1 ${
                              attempt.status === "accepted"
                                ? "outline-[#079455]"
                                : "outline-[#f02b2b]"
                            }`}
                            style={{ aspectRatio: "16 / 10" }}
                          >
                            <img
                              className="rounded-md w-full h-full object-cover block"
                              src={attempt.photo}
                              alt={
                                attempt.status === "accepted"
                                  ? "Accepted selfie with ID attempt"
                                  : "Rejected selfie with ID attempt"
                              }
                            />
                            {attempt.status === "accepted" ? (
                              <span
                                className={`absolute top-1 right-1 w-3 h-3 rounded-full flex items-center justify-center overflow-hidden outline outline-0.75 outline-white bg-[#079455]`}
                              >
                                <CheckIcon />
                              </span>
                            ) : (
                              <span
                                className={`absolute top-1 right-1 w-3 h-3 rounded-full flex items-center justify-center overflow-hidden outline outline-0.75 outline-white bg-[#f02b2b]`}
                              >
                                <XIcon />
                              </span>
                            )}
                          </div>
                          <span
                            className={`text-[10px] md:text-xs font-medium text-center ${
                              attempt.status === "accepted"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {attempt.id === "attempt-1"
                              ? "Too far"
                              : attempt.id === "attempt-2"
                                ? "Sunglasses on"
                                : attempt.id === "attempt-3"
                                  ? "Face turned"
                                  : "Good example"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="hidden bg-yellow-50 border-l-[3px] border-yellow-500 px-3 py-1 text-yellow-900 text-xs leading-4 flex-shrink-0">
                    <strong>Important: </strong>
                    Ensure that the face on your ID matches the face in your
                    live selfie.
                  </div>
                </div>

                <div className="hidden md:flex flex-col">
                  <div className="bg-white border border-gray-300 rounded-[12px] p-6 flex flex-col gap-5">
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-4">
                        <p className="m-0 text-sm leading-5 font-semibold text-gray-500">
                          Your uploaded ID
                        </p>
                        <div
                          className="w-full rounded-lg overflow-hidden"
                          style={{ aspectRatio: "303/194" }}
                        >
                          <img
                            className="w-full h-full object-cover block"
                            src={idCardImageUrl}
                            alt="Uploaded government issued ID"
                          />
                        </div>
                        <div className="flex gap-3 items-start">
                          <div className="w-[18px] h-[18px] flex-shrink-0 flex items-center justify-center">
                            <LockIcon />
                          </div>
                          <p className="m-0 text-xs leading-4 font-normal text-gray-400">
                            Uploaded earlier and locked for this session. It is
                            used only to check against your live selfie.
                          </p>
                        </div>
                      </div>
                      <div className="h-px bg-gray-300 m-0"></div>
                      <div className="flex justify-between items-center gap-10">
                        <p className="m-0 text-sm leading-5 font-normal text-gray-500">
                          Government-issued ID
                        </p>
                        <div className="flex items-center gap-1.5">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 text-green-600"
                          >
                            <path
                              d="M13.3327 4L5.99935 11.3333L2.66602 8"
                              stroke="#059669"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-xs leading-4 font-semibold text-green-600">
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white shadow-[-2px_-2px_8px_rgba(10,13,18,0.08)] flex items-center justify-center p-0 flex-wrap gap-0 flex-shrink-0 h-auto">
        <div className="w-full max-w-[1280px] flex flex-col md:flex-row md:items-center md:justify-between py-3 md:py-3 gap-2 md:gap-3 px-4 md:px-0">
          <Button variant="secondary" size="sm" className="w-full md:w-24">
            Previous
          </Button>
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
            <Button
              variant="tertiary"
              size="sm"
              className="flex-1 md:flex-none"
            >
              Save as draft
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="flex-1 md:flex-none md:w-24"
            >
              Next
            </Button>
          </div>
        </div>
      </footer>

      {isExpanded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/85 p-6">
          <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-xl bg-black border-2 border-white">
            {capturedImage ? (
              <img
                className="h-full w-full object-cover"
                src={capturedImage}
                alt="Captured selfie holding ID"
              />
            ) : showLiveVideoExpanded ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                autoPlay
                playsInline
                muted
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-white/70">
                No live preview
              </div>
            )}
          </div>

          <div className="flex w-full max-w-5xl items-center justify-between gap-3">
            {showLiveVideoExpanded ? (
              <span className="flex items-center gap-1 text-xs font-medium text-white/80">
                <kbd className="rounded border border-white/40 bg-white/15 px-1.5 py-1 font-sans text-[10px] font-semibold leading-none shadow-[0_2px_0_rgba(255,255,255,0.3)]">
                  Ctrl
                </kbd>
                +
                <kbd className="rounded border border-white/40 bg-white/15 px-1.5 py-1 font-sans text-[10px] font-semibold leading-none shadow-[0_2px_0_rgba(255,255,255,0.3)]">
                  Space
                </kbd>
                to capture
              </span>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-3">
              {capturedImage ? (
                <>
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="group flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 text-sm font-semibold text-white transition-all duration-150 hover:bg-white/20 active:scale-95"
                  >
                    <RotateCcwIcon className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-180" />
                    Retake
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="flex h-10 cursor-pointer items-center gap-1.5 rounded-full bg-red-600/90 px-4 text-sm font-semibold text-white transition-all duration-150 hover:bg-red-600 active:scale-95"
                  >
                    <TrashIcon className="h-4 w-4" />
                    Delete
                  </button>
                </>
              ) : showLiveVideoExpanded ? (
                <button
                  type="button"
                  aria-label="Capture selfie (Ctrl + Space)"
                  title="Capture selfie (Ctrl + Space)"
                  onClick={handleCapture}
                  className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-brand-400 shadow-lg hover:shadow-xl text-white transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <CameraIcon className="h-6 w-6" />
                </button>
              ) : null}

              <button
                type="button"
                aria-label="Close full screen"
                title="Close full screen"
                onClick={() => setIsExpanded(false)}
                className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none bg-white/15 text-white transition-all duration-150 hover:rotate-90 hover:bg-white/25 active:scale-90"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
