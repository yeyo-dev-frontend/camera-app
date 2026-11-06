import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useCameraDevice, usePhotoOutput } from "react-native-vision-camera";

export function useNativeCameraLifecycle({
  cameraRef,
  facing,
  flash,
  enableTorch,
  mirrorFront,
  isActive,
  onReadyChange,
}) {
  const device = useCameraDevice(facing);
  const hasFlash = device?.hasFlash ?? false,
    hasTorch = device?.hasTorch ?? false;
  const ready = useRef(false),
    session = useRef(null),
    torchRequested = useRef(false);
  const [started, setStarted] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState("");
  const photoOutput = usePhotoOutput({
    containerFormat: "jpeg",
    quality: 0.92,
  });
  const outputs = useMemo(() => [photoOutput], [photoOutput]);

  const reportError = useCallback(
    (cause) => {
      ready.current = false;
      onReadyChange(false);
      setError("No se pudo abrir la cámara.");
      console.error("Filtered camera:", cause);
    },
    [onReadyChange],
  );
  const handleStarted = useCallback(() => {
    ready.current = true;
    setStarted(true);
    onReadyChange(true);
  }, [onReadyChange]);
  const handleStopped = useCallback(() => {
    ready.current = false;
    torchRequested.current = false;
    setStarted(false);
    onReadyChange(false);
  }, [onReadyChange]);
  const handleRetry = useCallback(() => {
    setStarted(false);
    setError("");
    setAttempt((v) => v + 1);
  }, []);
  useEffect(() => {
    const ctrl = session.current?.controller;
    if (
      !started ||
      !isActive ||
      error ||
      !hasTorch ||
      !ctrl ||
      (!enableTorch && !torchRequested.current)
    )
      return;
    torchRequested.current = enableTorch;
    ctrl
      .setTorchMode(enableTorch ? "on" : "off")
      .catch((c) => console.warn("Linterna:", String(c)));
  }, [started, isActive, error, hasTorch, enableTorch]);
  useImperativeHandle(
    cameraRef,
    () => ({
      async takePictureAsync() {
        if (!ready.current || !isActive)
          throw new Error("La cámara todavía no está lista.");
        const photo = await photoOutput.capturePhotoToFile(
          { flashMode: hasFlash ? flash : "off" },
          {},
        );
        return {
          uri: photo.filePath.startsWith("file://")
            ? photo.filePath
            : `file://${photo.filePath}`,
          flipHorizontal: facing === "front" && !mirrorFront,
        };
      },
    }),
    [photoOutput, flash, hasFlash, facing, mirrorFront, isActive],
  );
  return {
    session,
    attempt,
    error,
    outputs,
    reportError,
    handleStarted,
    handleStopped,
    handleRetry,
  };
}
