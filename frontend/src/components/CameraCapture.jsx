import { useRef, useState } from "react";

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [error, setError] = useState("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // back camera on phones
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setCameraOn(true);
      setError("");
    } catch (err) {
      setError("Could not open the camera. Please allow camera permission.");
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setCameraOn(false);
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        onCapture(blob);
        stopCamera();
      },
      "image/jpeg",
      0.85
    );
  };

  return (
    <div className="camera-box">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ display: cameraOn ? "block" : "none" }}
      />

      {!cameraOn && <button onClick={startCamera}>Open camera</button>}
      {cameraOn && <button onClick={takePhoto}>Take photo</button>}

      <p>Or upload a photo from your device:</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files[0] && onCapture(e.target.files[0])}
      />

      {error && <p className="error">{error}</p>}
    </div>
  );
}