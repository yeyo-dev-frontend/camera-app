import { useCallback } from "react";
import { CAMERA_MODES } from "../../constants/theme";
import { hapticsService } from "../../services/haptics/hapticsService";
import {
  ensureGalleryWriteAccess,
  saveMediaToGallery,
} from "../../services/media-library/mediaLibraryService";
import { ensurePermission } from "../../services/permissions/permissionService";
import { deleteTempFileQuietly } from "../../services/skia-photo/skiaDataLoader";
import {
  ensureNightshotAvailable,
  exportNightshot,
} from "../../services/video/nightshotService";
import { saveRecordedVideo } from "../../services/video/saveRecordedVideo";

export function useVideoRecordAction({
  videoMuted,
  videoEffect,
  cameraRef,
  runtimeRef,
  modeRef,
  setMode,
  setIsBusy,
  setIsRecording,
  onCameraReadyChange,
  waitForCamera,
  getMicPermission,
  requestMicPermission,
  showToast,
}) {
  return useCallback(async () => {
    if (!cameraRef.current || runtimeRef.current.isBusy) return;
    if (runtimeRef.current.isRecording) {
      setIsBusy(true);
      hapticsService.lightImpact();
      cameraRef.current.stopRecording();
      return;
    }
    try {
      setIsBusy(true);
      if (videoEffect === "night") {
        try {
          ensureNightshotAvailable();
        } catch (error) {
          showToast(error.message);
          return;
        }
      }
      if (
        !videoMuted &&
        !(await ensurePermission(
          getMicPermission,
          requestMicPermission,
          "Permite el micrófono para grabar video con sonido.",
        ))
      )
        return;
      if (!(await ensureGalleryWriteAccess())) return;
      hapticsService.heavyImpact();
      if (modeRef.current !== CAMERA_MODES.VIDEO) {
        onCameraReadyChange(false);
        setMode(CAMERA_MODES.VIDEO);
        modeRef.current = CAMERA_MODES.VIDEO;
      }
      await waitForCamera();
      setIsRecording(true);
      setIsBusy(false);
      const video = await cameraRef.current.recordAsync();
      setIsBusy(true);
      setIsRecording(false);
      if (video?.uri) {
        if (videoEffect === "night") showToast("APLICANDO NIGHTSHOT AL VÍDEO…");
        const { filterError } = await saveRecordedVideo(
          video.uri,
          videoEffect,
          {
            exportNightshot,
            saveMedia: saveMediaToGallery,
            deleteTemp: deleteTempFileQuietly,
          },
        );
        if (filterError) console.error("Nightshot export:", filterError);
        showToast(
          filterError
            ? "FALLÓ NIGHTSHOT: ORIGINAL GUARDADO SIN FILTRO"
            : "VIDEO GUARDADO EN LA GALERÍA",
        );
      }
    } catch (error) {
      console.error("Error al grabar el video:", error);
      showToast("ERROR AL GRABAR VIDEO");
    } finally {
      setIsRecording(false);
      setIsBusy(false);
    }
  }, [
    videoMuted,
    videoEffect,
    cameraRef,
    runtimeRef,
    modeRef,
    setMode,
    setIsBusy,
    setIsRecording,
    onCameraReadyChange,
    waitForCamera,
    getMicPermission,
    requestMicPermission,
    showToast,
  ]);
}
