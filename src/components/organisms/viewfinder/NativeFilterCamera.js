import React from "react";
import { Platform, StyleSheet } from "react-native";
import { SkiaCamera } from "react-native-vision-camera-skia";

import { useNativeCameraLifecycle } from "../../../hooks/camera-filters/useNativeCameraLifecycle";
import { useNativeFilterWorklet } from "../../../hooks/camera-filters/useNativeFilterWorklet";
import { CameraStatusMessage } from "../../molecules/viewfinder-status/CameraStatusMessage";
import { AndroidFrameCamera } from "./AndroidFrameCamera";

const FrameCamera = Platform.OS === "android" ? AndroidFrameCamera : SkiaCamera;
const TARGET_RESOLUTION = { width: 960, height: 720 };
const CAMERA_CONSTRAINTS = [{ fps: 30 }];

function NativeFilterCameraImpl({
  cameraRef,
  facing,
  flash,
  enableTorch,
  mirrorFront,
  activeFilter,
  showParanormalOverlay,
  isActive,
  onReadyChange,
}) {
  const {
    session,
    attempt,
    error,
    outputs,
    reportError,
    handleStarted,
    handleStopped,
    handleRetry,
  } = useNativeCameraLifecycle({
    cameraRef,
    facing,
    flash,
    enableTorch,
    mirrorFront,
    isActive,
    onReadyChange,
  });

  const onFrame = useNativeFilterWorklet({
    activeFilter,
    facing,
    mirrorFront,
    showParanormalOverlay,
    reportError,
  });

  return (
    <>
      <FrameCamera
        ref={session}
        key={attempt}
        style={StyleSheet.absoluteFill}
        device={facing}
        isActive={isActive && !error}
        outputs={outputs}
        constraints={CAMERA_CONSTRAINTS}
        orientationSource="interface"
        pixelFormat="yuv"
        targetResolution={TARGET_RESOLUTION}
        enablePreviewSizedOutputBuffers
        onFrame={onFrame}
        onStarted={handleStarted}
        onStopped={handleStopped}
        onError={reportError}
      />
      {!!error && <CameraStatusMessage message={error} onRetry={handleRetry} />}
    </>
  );
}

export const NativeFilterCamera = React.memo(NativeFilterCameraImpl);
