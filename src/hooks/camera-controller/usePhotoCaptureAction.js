import { useCallback } from "react";

import { getFilterById } from "../../constants/filters";
import { CAMERA_MODES, MODE_SWITCH_DELAY_MS } from "../../constants/theme";
import { hapticsService } from "../../services/haptics/hapticsService";
import {
  ensureGalleryWriteAccess,
  saveMediaToGallery,
} from "../../services/media-library/mediaLibraryService";
import { deleteTempFileQuietly } from "../../services/skia-photo/skiaDataLoader";
import { applyDarkFilterToPhoto } from "../../services/skia-photo/skiaFilterService";

export function usePhotoCaptureAction({
  cameraRef,
  runtimeRef,
  modeRef,
  setMode,
  setIsBusy,
  setLastPhoto,
  onCameraReadyChange,
  waitForCamera,
  triggerShutterBlink,
  showToast,
}) {
  return useCallback(async () => {
    const {
      isRecording,
      isBusy,
      activeFilterId,
      filterIntensity,
      showParanormalOverlay,
      lastPhoto,
    } = runtimeRef.current;
    if (!cameraRef.current || isRecording || isBusy) return;
    try {
      setIsBusy(true);
      if (!(await ensureGalleryWriteAccess())) return;
      hapticsService.mediumImpact();
      if (modeRef.current !== CAMERA_MODES.PICTURE) {
        onCameraReadyChange(false);
        setMode(CAMERA_MODES.PICTURE);
        modeRef.current = CAMERA_MODES.PICTURE;
        await new Promise((r) => setTimeout(r, MODE_SWITCH_DELAY_MS));
      }
      await waitForCamera();
      triggerShutterBlink();
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.92 });
      if (photo?.uri) {
        const selected = getFilterById(activeFilterId);
        const processedUri = await applyDarkFilterToPhoto({
          photoUri: photo.uri,
          filterId: activeFilterId,
          intensity: filterIntensity,
          showParanormalOverlay,
          flipHorizontal: photo.flipHorizontal ?? false,
        });
        await saveMediaToGallery(processedUri);
        if (processedUri !== photo.uri) deleteTempFileQuietly(photo.uri);
        if (lastPhoto?.uri && lastPhoto.uri !== processedUri)
          deleteTempFileQuietly(lastPhoto.uri);
        setLastPhoto({
          uri: processedUri,
          filterName:
            activeFilterId === "original"
              ? selected.name
              : `${selected.name} ${Math.round(filterIntensity * 100)}%`,
        });
        showToast(
          activeFilterId === "original"
            ? "FOTO ORIGINAL GUARDADA"
            : `FILTRO ${selected.name} GUARDADO`,
        );
      }
    } catch (error) {
      console.error("Error al tomar la foto:", error);
      showToast("ERROR AL CAPTURAR IMAGEN");
    } finally {
      setIsBusy(false);
    }
  }, [
    cameraRef,
    runtimeRef,
    modeRef,
    setMode,
    setIsBusy,
    setLastPhoto,
    onCameraReadyChange,
    waitForCamera,
    triggerShutterBlink,
    showToast,
  ]);
}
