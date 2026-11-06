import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { useCallback, useEffect, useRef } from "react";
import { AppState } from "react-native";

import { ensurePermission } from "../../services/permissions/permissionService";

export function useCameraPermissionSync() {
  const [cameraPermission, requestCameraPermission, getCameraPermission] =
    useCameraPermissions();
  const [, requestMicPermission, getMicPermission] = useMicrophonePermissions({
    get: false,
  });
  const requestingCamera = useRef(false);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (status) => {
      if (status === "active" && !requestingCamera.current) {
        getCameraPermission().catch((error) =>
          console.warn("Permiso de cámara:", error),
        );
      }
    });
    return () => subscription.remove();
  }, [getCameraPermission]);

  const enableCamera = useCallback(async () => {
    if (requestingCamera.current) return;
    requestingCamera.current = true;
    try {
      await ensurePermission(
        getCameraPermission,
        requestCameraPermission,
        "Permite el acceso a la cámara para abrir el visor.",
      );
    } finally {
      requestingCamera.current = false;
    }
  }, [getCameraPermission, requestCameraPermission]);

  return {
    cameraGranted: cameraPermission?.granted === true,
    enableCamera,
    requestMicPermission,
    getMicPermission,
  };
}
