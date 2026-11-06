import { useCallback, useEffect, useRef, useState } from "react";

import { MODE_SWITCH_DELAY_MS } from "../../constants/theme";

export function useVideoCameraSession(onReadyChange) {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");
  const ready = useRef(false);

  useEffect(() => {
    onReadyChange(false);
    // Vision Camera disposes its Android session asynchronously with unbindAll().
    const mountTimer = setTimeout(() => setMounted(true), MODE_SWITCH_DELAY_MS);
    const watchdog = setTimeout(() => {
      if (!ready.current) {
        onReadyChange(false);
        setError(
          "La cámara de vídeo no respondió. Pulsa Reintentar para abrirla de nuevo.",
        );
      }
    }, 5000);
    return () => {
      clearTimeout(mountTimer);
      clearTimeout(watchdog);
      onReadyChange(false);
    };
  }, [onReadyChange]);

  const handleReady = useCallback(() => {
    ready.current = true;
    onReadyChange(true);
  }, [onReadyChange]);

  const handleError = useCallback(
    (event) => {
      ready.current = false;
      onReadyChange(false);
      console.error("Video camera:", event.message);
      setError("No se pudo abrir la cámara de vídeo. Pulsa Reintentar.");
    },
    [onReadyChange],
  );

  return { mounted, error, handleReady, handleError };
}
