import { CameraView } from "expo-camera";
import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";

import { useVideoCameraSession } from "../../../hooks/camera-video/useVideoCameraSession";
import { CameraStatusMessage } from "../../molecules/viewfinder-status/CameraStatusMessage";

function VideoCameraSession({
  cameraRef,
  facing,
  flash,
  enableTorch,
  mirrorFront,
  muted,
  onReadyChange,
  onRetry,
}) {
  const { mounted, error, handleReady, handleError } =
    useVideoCameraSession(onReadyChange);

  if (error) return <CameraStatusMessage message={error} onRetry={onRetry} />;
  if (!mounted)
    return <CameraStatusMessage message="Abriendo cámara de vídeo…" />;

  return (
    <CameraView
      ref={cameraRef}
      style={StyleSheet.absoluteFill}
      facing={facing}
      mode="video"
      flash={flash}
      mute={muted}
      enableTorch={enableTorch}
      mirror={facing === "front" && mirrorFront}
      onCameraReady={handleReady}
      onMountError={handleError}
    />
  );
}

export function VideoCamera(props) {
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((value) => value + 1), []);
  return <VideoCameraSession key={attempt} {...props} onRetry={retry} />;
}
