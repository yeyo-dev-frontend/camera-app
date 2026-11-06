import { useCallback, useRef, useState } from "react";

export function useCameraReadyState() {
  const [cameraReady, setCameraReady] = useState(false);
  const readyRef = useRef(false);

  const onCameraReadyChange = useCallback((ready) => {
    if (readyRef.current === ready) return;
    readyRef.current = ready;
    setCameraReady(ready);
  }, []);

  const waitForCamera = useCallback(async () => {
    const deadline = Date.now() + 5000;
    while (!readyRef.current && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    if (!readyRef.current) throw new Error("La cámara todavía no está lista.");
  }, []);

  return { cameraReady, onCameraReadyChange, waitForCamera };
}
