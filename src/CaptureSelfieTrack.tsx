import { useEffect, useRef, useState } from "react";
import "./CaptureSelfieTrack.css";
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
    <svg className={className} {...lucideProps}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
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

const FACE_API_SCRIPT_URL = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js";
const FACE_API_MODEL_URL = "https://justadudewhohacks.github.io/face-api.js/models";

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
      faceapi.nets.tinyFaceDetector.loadFromUri(FACE_API_MODEL_URL).then(resolve).catch(reject);
    };
    if (window.faceapi) {
      afterScript();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${FACE_API_SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener("load", afterScript);
      existing.addEventListener("error", () => reject(new Error("face-api.js failed to load")));
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

function detectCardLikelyHeld(video: HTMLVideoElement, canvas: HTMLCanvasElement | null): boolean {
  if (!canvas || video.videoWidth === 0 || video.videoHeight === 0) return false;
  const w = 96;
  const h = 54;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true } as CanvasRenderingContext2DSettings);
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
      edgeSum += Math.abs(lum - lumAt(x + 1, y)) + Math.abs(lum - lumAt(x, y + 1));
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
      setCameraError("This browser can't access the camera. Try uploading a photo instead.");
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
          setCameraError("Camera access was blocked. Allow camera permission in your browser, then try again.");
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
              new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
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
    const canCapture = captureMode === "selfie" && !capturedImage && !cameraError;
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

  const showLiveVideoCompact = captureMode === "selfie" && !capturedImage && !cameraError && !isExpanded;
  const showLiveVideoExpanded = captureMode === "selfie" && !capturedImage && !cameraError && isExpanded;
  const detectionBadges = (
    <div className="flex flex-wrap justify-center gap-2">
      <span
        className={
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors duration-300 " +
          (faceDetected ? "border-success-500/40 bg-success-25" : "border-warning-500/40 bg-warning-100")
        }
      >
        <span className="font-medium text-gray-700">Face:</span>
        <span className={"flex items-center gap-1 font-semibold " + (faceDetected ? "text-success-500" : "text-warning-800")}>
          {faceDetected ? <CircleCheckIcon className="h-3.5 w-3.5 text-success-500" /> : <CircleAlertIcon className="h-3.5 w-3.5 animate-pulse text-warning-500" />}
          {faceDetected ? "Detected" : "Not Detected"}
        </span>
      </span>
      <span
        className={
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors duration-300 " +
          (idHeld ? "border-success-500/40 bg-success-25" : "border-warning-500/40 bg-warning-100")
        }
      >
        <span className="font-medium text-gray-700">ID Card:</span>
        <span className={"flex items-center gap-1 font-semibold " + (idHeld ? "text-success-500" : "text-warning-800")}>
          {idHeld ? <CircleCheckIcon className="h-3.5 w-3.5 text-success-500" /> : <CircleAlertIcon className="h-3.5 w-3.5 animate-pulse text-warning-500" />}
          {idHeld ? "Held" : "Not Held"}
        </span>
      </span>
    </div>
  );

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
    <div className="cs-page">
      <header className="cs-header">
        <div className="cs-header__inner">
          <div className="cs-logo">
            <img className="cs-logo__image" src={dmciLogoUrl} alt="DMCI Homes Sales" />
          </div>
        </div>
      </header>

      <div className="cs-layout-with-stepper">
        <aside className="cs-stepper-wrapper">
          <div className="cs-stepper">
            <div className="cs-stepper__header">
              <p className="cs-stepper__step-label">Step {CURRENT_STEP} of {TOTAL_STEPS}</p>
            </div>
            <div className="cs-stepper__list">
              {steps.map((step, index) => (
                <div key={step.id} className="cs-stepper__item">
                  <div className="cs-stepper__step-row">
                    <div className={`cs-stepper__circle cs-stepper__circle--${step.status}`}>
                      {step.status === "completed" && <CheckmarkIcon className="h-4 w-4" />}
                      {step.status === "current" && <div className="rounded-full bg-blue-600" style={{ width: '8.57px', height: '8.57px' }} />}
                    </div>
                    <p className={`cs-stepper__name cs-stepper__name--${step.status}`}>{step.name}</p>
                  </div>
                  {index < steps.length - 1 && <div className={`cs-stepper__connector cs-stepper__connector--${steps[index + 1].status}`} />}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="cs-main pb-24">
          <section className="cs-card">
          <div className="cs-card__heading">
            <h1 className="cs-card__title">Capture Live Selfie with ID</h1>
            <p className="cs-card__subtitle">
              Take a live selfie holding your ID. Make sure your face and ID are clear.
            </p>
          </div>

          <div className="cs-card__body">
            <div className="cs-columns">
              <div className="cs-col-left">
                <div className="cs-tabs" role="tablist" aria-label="Selfie input method">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={captureMode === "selfie"}
                    className={`cs-tab ${captureMode === "selfie" ? "cs-tab--active" : ""}`}
                    onClick={() => handleModeChange("selfie")}
                  >
                    <CameraIcon className="h-5 w-5 flex-shrink-0" />
                    <span>Take Selfie</span>
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={captureMode === "upload"}
                    className={`cs-tab ${captureMode === "upload" ? "cs-tab--active" : ""}`}
                    onClick={() => handleModeChange("upload")}
                  >
                    <UploadIcon className="h-5 w-5 flex-shrink-0" />
                    <span>Upload Photo</span>
                  </button>
                </div>

                <div className="cs-preview-box">
                  {capturedImage ? (
                    <img className="cs-preview-box__img" src={capturedImage} alt="Captured selfie holding ID" />
                  ) : showLiveVideoCompact ? (
                    <video ref={videoRef} className="cs-preview-box__video" autoPlay playsInline muted />
                  ) : showLiveVideoExpanded ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-100 text-center text-xs text-gray-600">
                      <ExpandIcon className="h-5 w-5" />
                      Viewing full screen
                    </div>
                  ) : captureMode === "selfie" && cameraError ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-xs leading-4 text-warning-800">
                      <CameraOffIcon className="h-6 w-6" />
                      <span>{cameraError}</span>
                      <button
                        type="button"
                        onClick={() => setRetryToken((n) => n + 1)}
                        className="mt-0.5 h-7 cursor-pointer rounded-full border border-warning-500 bg-white px-3 text-[11px] font-semibold text-warning-800"
                      >
                        Try again
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleUploadClick}
                      className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 border-none bg-transparent p-4 text-center font-sans text-xs leading-4 text-primary-500"
                    >
                      <UploadIcon className="h-6 w-6" />
                      <span>Click to upload a photo of yourself holding your ID</span>
                    </button>
                  )}

                  {capturedImage ? (
                    <button
                      type="button"
                      onClick={handleRetake}
                      className="group absolute bottom-2.5 left-1/2 flex h-[30px] -translate-x-1/2 cursor-pointer items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 text-xs font-semibold text-gray-700 shadow-[0_2px_6px_rgba(10,13,18,0.15)] transition-all duration-150 hover:border-primary-500 hover:text-primary-500 hover:shadow-[0_4px_10px_rgba(10,13,18,0.2)] active:scale-95"
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
                      className="cs-capture-button"
                    >
                      <CameraIcon className="h-5 w-5" />
                    </button>
                  ) : null}
                </div>

                <div className="flex min-h-8 items-center justify-between gap-2">
                  {showLiveVideoCompact || showLiveVideoExpanded ? (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-gray-600">
                      <kbd className="rounded border border-gray-300 bg-white px-1.5 py-1 font-sans text-[10px] font-semibold leading-none text-gray-700 shadow-[0_2px_0_#d1d5db]">Ctrl</kbd>
                      +
                      <kbd className="rounded border border-gray-300 bg-white px-1.5 py-1 font-sans text-[10px] font-semibold leading-none text-gray-700 shadow-[0_2px_0_#d1d5db]">Space</kbd>
                      to capture
                    </span>
                  ) : (
                    <span />
                  )}
                  <div className="flex items-center gap-2">
                    {(capturedImage || showLiveVideoCompact) && (
                      <button
                        type="button"
                        aria-label={isExpanded ? "Collapse preview" : "Expand preview to full screen"}
                        title="Full screen"
                        onClick={() => setIsExpanded((v) => !v)}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 transition-all duration-150 hover:border-primary-500 hover:text-primary-500 active:scale-90"
                      >
                        <ExpandIcon className="h-4 w-4" />
                      </button>
                    )}
                    {capturedImage && (
                      <button
                        type="button"
                        aria-label="Delete captured photo"
                        title="Delete photo"
                        onClick={handleDelete}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-error-500/40 bg-white text-error-500 transition-all duration-150 hover:bg-error-500 hover:text-white active:scale-90"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <canvas ref={canvasRef} className="hidden" />
                <canvas ref={detectionCanvasRef} className="hidden" />

                {detectionBadges}

                <div className="cs-examples-section">
                  <p className="cs-examples-title">Before you capture, compare against these examples</p>
                  <div className="cs-thumbnails">
                    {THUMBNAIL_ATTEMPTS.map((attempt) => (
                      <div key={attempt.id} className="flex flex-col items-center gap-2">
                        <div
                          className={
                            attempt.status === "accepted"
                              ? "cs-thumbnail cs-thumbnail--accepted"
                              : "cs-thumbnail cs-thumbnail--rejected"
                          }
                        >
                          <img
                            className="cs-thumbnail__img"
                            src={attempt.photo}
                            alt={
                              attempt.status === "accepted"
                                ? "Accepted selfie with ID attempt"
                                : "Rejected selfie with ID attempt"
                            }
                          />
                          {attempt.status === "accepted" ? (
                            <span className="cs-thumbnail__badge cs-thumbnail__badge--accepted">
                              <CheckIcon />
                            </span>
                          ) : (
                            <span className="cs-thumbnail__badge cs-thumbnail__badge--reject">
                              <XIcon />
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            attempt.status === "accepted" ? "text-green-600" : "text-red-600"
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

                <div className="cs-notice">
                  <strong>Important: </strong>
                  Ensure that the face on your ID matches the face in your live selfie.
                </div>
              </div>

              <div className="cs-col-right">
                <div className="cs-id-panel">
                  <div className="cs-id-panel__content">
                    <div className="cs-id-panel__section">
                      <p className="cs-id-panel__title">Your uploaded ID</p>
                      <div className="cs-id-panel__image-wrap">
                        <img className="cs-id-panel__img" src={idCardImageUrl} alt="Uploaded government issued ID" />
                      </div>
                      <div className="cs-id-panel__note">
                        <div className="cs-id-panel__note-icon">
                          <LockIcon />
                        </div>
                        <p className="cs-id-panel__note-text">Uploaded earlier and locked for this session. It is used only to check against your live selfie.</p>
                      </div>
                    </div>
                    <div className="cs-id-panel__divider"></div>
                    <div className="cs-id-panel__status">
                      <p className="cs-id-panel__status-label">Government-issued ID</p>
                      <div className="cs-id-panel__verified">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="cs-id-panel__verified-icon">
                          <path d="M13.3327 4L5.99935 11.3333L2.66602 8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="cs-id-panel__verified-text">Verified</span>
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

        <footer className="cs-footer">
          <div>
            <button
              type="button"
              className="h-[34px] cursor-pointer rounded-lg border border-gray-300 bg-white px-3.5 text-[13px] font-semibold text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <div className="cs-footer-right">
              <button type="button" className="cursor-pointer border-none bg-transparent p-0 text-[13px] font-semibold text-primary-700 hover:underline">
                Save as draft
              </button>
              <button
                type="button"
                className="h-[34px] cursor-pointer rounded-lg border-none bg-primary-600 px-3.5 text-[13px] font-semibold text-white shadow-[0_1px_2px_rgba(10,13,18,0.05)] hover:bg-primary-700"
              >
                Next
              </button>
            </div>
          </div>
        </footer>

      {isExpanded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/85 p-6">
          <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-xl bg-black">
            {capturedImage ? (
              <img className="h-full w-full object-cover" src={capturedImage} alt="Captured selfie holding ID" />
            ) : showLiveVideoExpanded ? (
              <video ref={videoRef} className="h-full w-full object-cover" autoPlay playsInline muted />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-white/70">No live preview</div>
            )}
          </div>

          <div className="flex w-full max-w-5xl items-center justify-between gap-3">
            {showLiveVideoExpanded ? (
              <span className="flex items-center gap-1 text-xs font-medium text-white/80">
                <kbd className="rounded border border-white/40 bg-white/15 px-1.5 py-1 font-sans text-[10px] font-semibold leading-none shadow-[0_2px_0_rgba(255,255,255,0.3)]">Ctrl</kbd>
                +
                <kbd className="rounded border border-white/40 bg-white/15 px-1.5 py-1 font-sans text-[10px] font-semibold leading-none shadow-[0_2px_0_rgba(255,255,255,0.3)]">Space</kbd>
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
                    className="flex h-10 cursor-pointer items-center gap-1.5 rounded-full bg-error-500/90 px-4 text-sm font-semibold text-white transition-all duration-150 hover:bg-error-500 active:scale-95"
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
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full outline outline-[1.25px] outline-offset-[-1.25px] outline-white bg-[#0a4dd7] text-white transition-all duration-150 hover:scale-110 active:scale-90"
                >
                  <CameraIcon className="h-5 w-5" />
                </button>
              ) : null}

              <button
                type="button"
                aria-label="Close full screen"
                title="Close full screen"
                onClick={() => setIsExpanded(false)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-white/15 text-white transition-all duration-150 hover:rotate-90 hover:bg-white/25 active:scale-90"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {detectionBadges}
        </div>
      )}
    </div>
  );
}
